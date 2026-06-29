<?php

namespace App\Console\Commands;

use App\Models\ThesisCard;
use App\Models\ValueChain;
use App\Models\ValueChainLayer;
use App\Models\ValueChainLayerEntry;
use Illuminate\Console\Command;
use Symfony\Component\Yaml\Yaml;

class ImportInvestingResearch extends Command
{
    protected $signature = 'import:investing';
    protected $description = 'Import thesis cards and value chains from the investing project';

    public function handle(): int
    {
        $investingPath = '/Users/hugoantonrigholt/Claude/Projects/Investing';

        $this->info('Starting import from investing project...');

        // Import thesis cards from companies
        $this->importThesisCards($investingPath);

        // Import value chains from sectors
        $this->importValueChains($investingPath);

        $this->info('Import complete!');
        return 0;
    }

    private function importThesisCards(string $investingPath): void
    {
        $companiesPath = "{$investingPath}/companies";
        $researchPath = "{$companiesPath}/research";

        if (!is_dir($companiesPath)) {
            $this->warn("Companies directory not found: {$companiesPath}");
            return;
        }

        $files = glob("{$companiesPath}/*.md");
        $this->info("Found " . count($files) . " company files");

        $imported = 0;
        $skipped = 0;

        foreach ($files as $file) {
            $basename = basename($file);

            // Skip template files
            if (strpos($basename, '_') === 0) {
                $skipped++;
                continue;
            }

            [$frontmatter, $content] = $this->extractFrontmatterAndContent($file);
            if (!$frontmatter || empty($frontmatter['id'])) {
                $this->line("  ⊘ {$basename} — no frontmatter");
                $skipped++;
                continue;
            }

            // Load full research content from research directory
            $ticker = $frontmatter['id'];
            $researchFile = "{$researchPath}/{$ticker}.md";
            $fullContent = '';
            if (file_exists($researchFile)) {
                $fullContent = file_get_contents($researchFile);
            }

            $status = $frontmatter['status'] ?? 'WATCH';
            $validStatuses = ['HELD', 'WATCH', 'NONE'];
            if (!in_array($status, $validStatuses)) {
                $status = 'WATCH';
            }

            $stance = $frontmatter['stance'] ?? null;
            $validStances = ['LONG', 'HOLD', 'BUILD', 'TRIM', 'EXIT', 'WATCH', 'AVOID', 'RESEARCH'];
            if ($stance && !in_array($stance, $validStances)) {
                $stance = null;
            }

            $thesisState = $frontmatter['thesis_state'] ?? 'INTACT';
            $validThesisStates = ['INTACT', 'STRESSED', 'BROKEN'];
            if (!in_array($thesisState, $validThesisStates)) {
                $thesisState = 'INTACT';
            }

            $trendState = $frontmatter['trend_state'] ?? null;
            $validTrendStates = ['UPTREND', 'EXTENDED', 'BREAKING', 'BROKEN'];
            if ($trendState && !in_array($trendState, $validTrendStates)) {
                $trendState = null;
            }

            $data = [
                'ticker' => $frontmatter['id'] ?? '',
                'company_name' => $frontmatter['name'] ?? '',
                'sector_id' => $this->resolveSectorId($frontmatter['theme'] ?? null),
                'theme' => $frontmatter['theme'] ?? null,
                'status' => $status,
                'stance' => $stance,
                'thesis_state' => $thesisState,
                'trend_state' => $trendState,
                'conviction' => $frontmatter['conviction'] ?? 3,
                'quality' => $frontmatter['quality'] ?? 5,
                'tier' => $frontmatter['tier'] ?? null,
                'edge' => $frontmatter['edge'] ?? '',
                'watch' => $frontmatter['watch'] ?? null,
                'entry' => $frontmatter['entry'] ?? null,
                'catalyst' => $frontmatter['catalyst'] ?? null,
                'upside' => $frontmatter['upside'] ?? null,
                'last_updated' => $frontmatter['last_updated'] ?? null,
                'content' => $fullContent ?: $content,
            ];

            ThesisCard::updateOrCreate(
                ['ticker' => $data['ticker']],
                $data
            );

            $this->line("  ✓ {$basename}");
            $imported++;
        }

        $this->info("Imported {$imported} thesis cards, skipped {$skipped}");
    }

    private function importValueChains(string $investingPath): void
    {
        $sectorsPath = "{$investingPath}/sectors";

        if (!is_dir($sectorsPath)) {
            $this->warn("Sectors directory not found: {$sectorsPath}");
            return;
        }

        $files = glob("{$sectorsPath}/*.md");
        $this->info("Found " . count($files) . " sector files");

        $imported = 0;
        $skipped = 0;

        foreach ($files as $file) {
            $basename = basename($file);

            // Skip schema and template files
            if (strpos($basename, '_') === 0) {
                $skipped++;
                continue;
            }

            [$frontmatter, $content] = $this->extractFrontmatterAndContent($file);
            if (!$frontmatter || empty($frontmatter['id'])) {
                $this->line("  ⊘ {$basename} — no frontmatter");
                $skipped++;
                continue;
            }

            $chainStance = $frontmatter['stance'] ?? 'NEUTRAL';
            $validChainStances = ['OVERWEIGHT', 'HOLD', 'NEUTRAL', 'UNDERWEIGHT'];
            if (!in_array($chainStance, $validChainStances)) {
                // Map SELECTIVE OVERWEIGHT to OVERWEIGHT
                if ($chainStance === 'SELECTIVE OVERWEIGHT') {
                    $chainStance = 'OVERWEIGHT';
                } else {
                    $chainStance = 'NEUTRAL';
                }
            }

            $connects = null;
            if (!empty($frontmatter['connects'])) {
                // connects is an array in YAML, but database expects JSON string
                $connects = is_array($frontmatter['connects'])
                    ? json_encode($frontmatter['connects'])
                    : $frontmatter['connects'];
            }

            $chainData = [
                'name' => $frontmatter['name'] ?? $frontmatter['id'],
                'sector_id' => null,
                'stance' => $chainStance,
                'thesis' => $frontmatter['thesis'] ?? '',
                'binding_constraint' => $frontmatter['binding_constraint'] ?? null,
                'chain_group' => $frontmatter['group'] ?? null,
                'region' => $frontmatter['region'] ?? null,
                'alpha' => $frontmatter['alpha'] ?? 0,
                'connects' => $connects,
                'last_updated' => $frontmatter['last_updated'] ?? null,
            ];

            $chain = ValueChain::updateOrCreate(
                ['name' => $chainData['name']],
                $chainData
            );

            // Import layers and entries
            if (!empty($frontmatter['chain']) && is_array($frontmatter['chain'])) {
                $this->importLayers($chain, $frontmatter['chain']);
            }

            $this->line("  ✓ {$basename}");
            $imported++;
        }

        $this->info("Imported {$imported} value chains, skipped {$skipped}");
    }

    private function importLayers(ValueChain $chain, array $layers): void
    {
        foreach ($layers as $layerIndex => $layerData) {
            $layer = $chain->layers()->updateOrCreate(
                ['title' => $layerData['layer'] ?? "Layer {$layerIndex}"],
                [
                    'title' => $layerData['layer'] ?? "Layer {$layerIndex}",
                    'note' => $layerData['note'] ?? null,
                    'gap' => $layerData['gap'] ?? null,
                    'order' => $layerIndex,
                ]
            );

            // Import entries (names)
            if (!empty($layerData['names']) && is_array($layerData['names'])) {
                $this->importEntries($layer, $layerData['names']);
            }
        }
    }

    private function importEntries(ValueChainLayer $layer, array $entries): void
    {
        $validChokepoint = ['monopoly', 'sole-source', 'oligopoly', 'dominant', 'contender', 'commodity'];

        foreach ($entries as $entryIndex => $entryData) {
            $chokepoint = $entryData['chokepoint'] ?? 'contender';
            if (!in_array($chokepoint, $validChokepoint)) {
                $chokepoint = 'contender';
            }

            $layer->entries()->updateOrCreate(
                ['ticker' => $entryData['id'] ?? ''],
                [
                    'ticker' => $entryData['id'] ?? '',
                    'role' => $entryData['role'] ?? '',
                    'chokepoint' => $chokepoint,
                    'region' => $entryData['region'] ?? null,
                    'tech' => $entryData['tech'] ?? null,
                    'order' => $entryIndex,
                ]
            );
        }
    }

    private function extractFrontmatter(string $file): ?array
    {
        $content = file_get_contents($file);
        if (!$content || strpos($content, '---') !== 0) {
            return null;
        }

        $parts = explode('---', $content, 3);
        if (count($parts) < 3) {
            return null;
        }

        $yaml = trim($parts[1]);
        try {
            $result = Yaml::parse($yaml);
            return is_array($result) ? $result : [];
        } catch (\Exception $e) {
            // Log error but don't fail; continue with next file
            // YAML parse errors are non-fatal (e.g., special characters, multiline escaping)
            return null;
        }
    }

    private function extractFrontmatterAndContent(string $file): array
    {
        $fileContent = file_get_contents($file);
        if (!$fileContent || strpos($fileContent, '---') !== 0) {
            return [null, null];
        }

        $parts = explode('---', $fileContent, 3);
        if (count($parts) < 3) {
            return [null, null];
        }

        $yaml = trim($parts[1]);
        $content = isset($parts[2]) ? trim($parts[2]) : '';

        try {
            $result = Yaml::parse($yaml);
            $frontmatter = is_array($result) ? $result : [];
            return [$frontmatter, $content];
        } catch (\Exception $e) {
            return [null, null];
        }
    }

    private function resolveSectorId(?string $theme): ?int
    {
        if (!$theme) {
            return null;
        }

        // Try to find sector by slug matching the theme
        $sector = \App\Models\Sector::where('slug', $theme)
            ->orWhere('name', 'like', "%{$theme}%")
            ->first();

        return $sector?->id;
    }
}
