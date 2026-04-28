<?php

use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;
use Laravel\Fortify\Features;

Route::inertia('/', 'welcome', [
    'canRegister' => Features::enabled(Features::registration()),
])->name('home');

Route::middleware(['auth'])->group(function () {
    Route::inertia('dashboard', 'dashboard')->name('dashboard');
});

Route::middleware(['auth', 'checkRole:admin'])->group(function () {
    Route::get('/users', [UserController::class, 'index'])->name('users.index');
    Route::get('/users/create', [UserController::class, 'create'])->name('users.create');
    Route::post('/users', [UserController::class, 'store'])->name('users.store');
    Route::get('/users/{user:id}', [UserController::class, 'show'])->name('users.show');
    Route::get('/users/{user:id}/edit', [UserController::class, 'edit'])->name('users.edit');
    Route::put('/users/{user:id}/', [UserController::class, 'update'])->name('users.update');
    Route::delete('/users/{user:id}/', [UserController::class, 'destroy'])->name('users.destroy');
    // Route::resource('users', UserController::class);
    Route::get('/users/{user:id}/edit/password', [UserController::class, 'editPassword'])->name('users.edit.password');
    Route::put('/users/{user:id}/edit/password', [UserController::class, 'updatePassword'])->name('users.update.password');
});

require __DIR__ . '/settings.php';
