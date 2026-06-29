<?php

use App\Http\Controllers\CommentController;
use App\Http\Controllers\CompanyController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\SectorController;
use App\Http\Controllers\Teams\TeamInvitationController;
use App\Http\Controllers\ThemeController;
use App\Http\Controllers\ThesisCardController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ValueChainController;
use App\Http\Controllers\ValueChainLayerController;
use App\Http\Controllers\ValueChainLayerEntryController;
use App\Http\Middleware\EnsureTeamMembership;
use Illuminate\Support\Facades\Route;

Route::inertia('/', 'welcome')->name('home');

Route::middleware(['auth'])->group(function () {
    Route::get('feed', [PostController::class, 'index'])->name('posts.index');
    Route::get('posts/create', [PostController::class, 'create'])->name('posts.create');
    Route::post('posts', [PostController::class, 'store'])->name('posts.store');
    Route::get('posts/{post:slug}', [PostController::class, 'show'])->name('posts.show');
    Route::get('posts/{post:slug}/edit', [PostController::class, 'edit'])->name('posts.edit');
    Route::patch('posts/{post:slug}', [PostController::class, 'update'])->name('posts.update');
    Route::delete('posts/{post:slug}', [PostController::class, 'destroy'])->name('posts.destroy');

    Route::get('sectors/{sector:slug}', [SectorController::class, 'show'])->name('sectors.show');
    Route::get('themes/{theme:slug}', [ThemeController::class, 'show'])->name('themes.show');
    Route::get('company/{id}', [CompanyController::class, 'show'])->name('company.show');
    Route::get('users/{user}', [UserController::class, 'show'])->name('users.show');

    Route::post('posts/{post:slug}/comments', [CommentController::class, 'store'])->name('comments.store');
    Route::delete('posts/{post:slug}/comments/{comment}', [CommentController::class, 'destroy'])->name('comments.destroy');

    Route::get('thesis-cards', [ThesisCardController::class, 'index'])->name('thesis-cards.index');
    Route::get('value-chains', [ValueChainController::class, 'index'])->name('value-chains.index');
    Route::get('value-chains/{valueChain}', [ValueChainController::class, 'show'])->name('value-chains.show');
});

Route::middleware(['auth', 'admin'])->group(function () {
    Route::post('thesis-cards', [ThesisCardController::class, 'store'])->name('thesis-cards.store');
    Route::patch('thesis-cards/{card}', [ThesisCardController::class, 'update'])->name('thesis-cards.update');
    Route::delete('thesis-cards/{card}', [ThesisCardController::class, 'destroy'])->name('thesis-cards.destroy');

    Route::post('value-chains', [ValueChainController::class, 'store'])->name('value-chains.store');
    Route::patch('value-chains/{valueChain}', [ValueChainController::class, 'update'])->name('value-chains.update');
    Route::delete('value-chains/{valueChain}', [ValueChainController::class, 'destroy'])->name('value-chains.destroy');

    Route::post('value-chains/{valueChain}/layers', [ValueChainLayerController::class, 'store'])->name('layers.store');
    Route::patch('value-chains/{valueChain}/layers/{layer}', [ValueChainLayerController::class, 'update'])->name('layers.update');
    Route::delete('value-chains/{valueChain}/layers/{layer}', [ValueChainLayerController::class, 'destroy'])->name('layers.destroy');

    Route::post('value-chains/{valueChain}/layers/{layer}/entries', [ValueChainLayerEntryController::class, 'store'])->name('entries.store');
    Route::patch('value-chains/{valueChain}/layers/{layer}/entries/{entry}', [ValueChainLayerEntryController::class, 'update'])->name('entries.update');
    Route::delete('value-chains/{valueChain}/layers/{layer}/entries/{entry}', [ValueChainLayerEntryController::class, 'destroy'])->name('entries.destroy');
});

Route::prefix('{current_team}')
    ->middleware(['auth', 'verified', EnsureTeamMembership::class])
    ->group(function () {
        Route::get('dashboard', DashboardController::class)->name('dashboard');
    });

Route::middleware(['auth'])->group(function () {
    Route::get('invitations/{invitation}/accept', [TeamInvitationController::class, 'accept'])->name('invitations.accept');
    Route::delete('invitations/{invitation}', [TeamInvitationController::class, 'decline'])->name('invitations.decline');
});

require __DIR__.'/settings.php';
