<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\SomeProtectedController;
use App\Http\Controllers\UserController;

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    // Ide kerülhetnek a további védett végpontok
});

Route::middleware(['auth.check'])->group(function () {
    Route::get('/dashboard', [SomeProtectedController::class, 'index']);
    Route::get('/users', [UserController::class, 'index']); // Felhasználók listázása
    Route::put('/users/{id}', [UserController::class, 'update']); // Felhasználói adatok módosítása
    Route::post('/auth/refresh', [AuthController::class, 'refresh']);

    // Más védett útvonalak...
});

Route::middleware(['auth.check', 'admin.check'])->group(function () {
    Route::get('/admin/users', [UserController::class, 'index']); // Csak adminok érhetik el
});
