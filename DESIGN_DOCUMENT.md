# Nexus — Design Document

**Version:** 0.2  
**Date:** 2026-06-29  
**Status:** Draft

**MVP Focus:** Use Laravel/Filament built-ins only. Skip custom features (invite codes, draft autosave, image optimization, etc.). First version will be small (handful of members, dozens of articles). Scale features only after launch.

---

## 1. Product Vision

Nexus is a private investment research publication — a Substack where every article can be tagged to a company and/or sector. Those tags build automatic aggregation pages, so readers can click from an article → company page → sector page and browse everything related.

It is not a forum. It is not a stock screener. It is a knowledge base you can navigate.

**The core loop:**
1. Member writes an article (long-form, rich text)
2. Article is optionally tagged to a ticker and/or sector
3. Readers click through: article → company page (all articles on that ticker) → sector page (all articles in that sector, plus a pinned sector overview)

Everything except the article body is behind login. Comments always require login.

---

## 2. Tech Stack

| Layer | Choice |
|---|---|
| Backend | Laravel 11 |
| Admin panel | Filament 3 |
| Rich text editor | Tiptap (`awcodes/filament-tiptap-editor`) |
| Auth | Laravel Breeze (email + password only) |
| Frontend | Inertia + React |
| CSS | Tailwind CSS |
| Database | PostgreSQL |
| File storage | Laravel local disk (S3-compatible later) |
| Deployment | Hetzner VPS + Laravel Forge |
| Local dev | Laravel Herd |

---

## 3. Access Model

Admin-only user creation via Filament. No public signup.

- Admin creates users directly in Filament with email + password
- Breeze handles standard password reset
- Two roles: `member` and `admin`
- Suspended users (`is_active = false`) cannot login or post, but their content remains visible

**Content visibility:**
- Feed / homepage: login required
- Article body: per-article setting — `public` (anyone with the link) or `members_only` (login required)
- Comments: always login required
- Company pages, sector pages: login required

---

## 4. Data Model

### users
```
id, name, email, password, role (member|admin),
bio (text), avatar, is_active (bool),
email_verified_at, created_at, updated_at
```

### posts
```
id, user_id,
title, slug,
body (longText — HTML from Tiptap),
ticker (nullable),        -- e.g. "NVDA" — user-provided, no validation
sector_id (nullable),     -- FK → sectors
visibility (public|members_only),
published_at (nullable),  -- null = draft
created_at, updated_at
```

### sectors
```
id, slug, name,
overview_post_id (nullable FK → posts),  -- pinned overview article
created_at, updated_at
```

Sectors are seeded by admin and not user-editable.

### comments
```
id, post_id, user_id,
body (text),
created_at, updated_at
```

---

## 5. Pages & Navigation

```
/                          → feed (login required) — all published posts, reverse-chron
/posts/{slug}              → single article
/posts/create              → new article editor
/posts/{slug}/edit         → edit your own article
/companies/{ticker}        → all articles tagged to that ticker
/sectors/{slug}            → pinned overview + all articles tagged to that sector
/users/{name}              → author profile: bio + all their published posts
/admin/...                 → Filament admin panel
```

Company pages and sector pages are generated automatically from tags — no manual curation needed. If no article is tagged to a ticker yet, that URL 404s.

---

## 6. Features — V1

### Feed
- All published posts, reverse-chronological
- Filter by sector (dropdown)
- Filter by ticker (text input)
- No algorithmic ranking — chronological only

### Article editor
- Tiptap rich text: headings, bold/italic, blockquotes, tables, code blocks, images, links
- Optional fields: ticker (text input), sector (dropdown of seeded sectors)
- Visibility toggle: public / members only
- Save as draft or publish (no autosave)
- Edit/publish/unpublish your own drafts

### Company pages
- Header: ticker symbol
- List of all articles tagged to that ticker, reverse-chron, with author + date
- Links to sector pages the company appears in (derived from article tags)

### Sector pages
- Pinned overview article at the top (set by admin — can be any post)
- All articles tagged to that sector below, reverse-chron
- Links to all tickers that have been written about in this sector

### Author profiles
- Name, bio, avatar
- All their published articles

### Comments
- Flat comments on articles (no nested replies for MVP)
- Plain text only — no rich text in comments
- Author can delete their own comment, admin can delete any
- No edit after posting

### Admin panel (Filament)
- User management: create, edit, suspend (is_active toggle), reset password
- Sector management: create/edit sectors, set pinned overview article
- Post moderation: unpublish or delete any post
- Comment moderation: delete any comment

---

## 7. Importing Existing Research

One-time artisan command seeding the existing markdown files into Nexus under Hugo's user account.

```
php artisan import:research
```

- Reads `companies/*.md` → creates posts tagged with the ticker, `user_id = hugo`
- Reads `sectors/*.md` → seeds sectors table + creates pinned overview posts
- Converts markdown body to HTML via `league/commonmark`
- Sets all imported posts to `published_at = file mtime`, `visibility = members_only`

---

## 8. Out of Scope — V1

- Price data, charts, market data feeds
- Portfolio tracking
- Email notifications / digests (beyond auth emails)
- Public feed or public homepage
- Mobile app
- RSS
- OAuth / social login
- Voting, karma, or any ranking system
- User-proposed sectors

---

## 9. Build Phases

**Phase 1 — Foundation**
Laravel install, Breeze auth, Filament setup, database migrations, user profiles, sector seeding.

**Phase 2 — Writing**
Post model & CRUD, Tiptap editor in Livewire form, draft/publish toggle, visibility setting, edit your own posts.

**Phase 3 — Discovery**
Feed listing, company pages (by ticker), sector pages with pinned overview, author profile pages.

**Phase 4 — Comments**
Comment model, creation & deletion via Livewire, moderation in Filament.

**Phase 5 — Launch**
Import existing research via artisan command, deploy to Hetzner via Forge, manually create first members in Filament.
