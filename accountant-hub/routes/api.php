<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\BidController;
use App\Http\Controllers\Api\JobCategoryController;
use App\Http\Controllers\Api\JobController;
use Illuminate\Support\Facades\Route;

Route::prefix('v1')->middleware('throttle:api')->group(function () {

    // Auth routes (public)
    Route::prefix('auth')->group(function () {
        Route::post('register', [AuthController::class, 'register']);
        Route::post('login', [AuthController::class, 'login']);
        Route::post('logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');
        Route::get('me', [AuthController::class, 'me'])->middleware('auth:sanctum');
    });

    // Job Categories (public)
    Route::get('categories', [JobCategoryController::class, 'index']);

    // Jobs (public read)
    Route::get('jobs', [JobController::class, 'index']);
    Route::get('jobs/{id}', [JobController::class, 'show']);

    // Bids (auth required)
    Route::middleware('auth:sanctum')->group(function () {
        Route::post('jobs/{id}/bids', [BidController::class, 'store']);
        Route::get('my-bids', [BidController::class, 'myBids']);
    });
});
