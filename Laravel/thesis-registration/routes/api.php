<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\SomeProtectedController;

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    // Ide kerülhetnek a további védett végpontok
});

Route::middleware(['auth.check'])->group(function () {
    Route::get('/dashboard', [SomeProtectedController::class, 'index']);
    // Más védett útvonalak...
});
