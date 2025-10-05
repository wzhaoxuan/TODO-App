<?php

namespace App\Providers;

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\TodoController;

// Define a route to get all todos
Route::get('/todos', [TodoController::class, 'index']);
Route::post('/todos', [TodoController::class, 'store']);
Route::put('/todos/{id}', [TodoController::class, 'update']);
Route::delete('/todos/{id}', [TodoController::class, 'destroy']);
Route::delete('/todos', [TodoController::class, 'destroyAll']);