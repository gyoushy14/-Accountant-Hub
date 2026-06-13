<?php

use App\Http\Controllers\Api\AccountantController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\BidController;
use App\Http\Controllers\Api\CareerController;
use App\Http\Controllers\Api\ContactController;
use App\Http\Controllers\Api\JobCategoryController;
use App\Http\Controllers\Api\JobController;
use App\Http\Controllers\Api\PricingController;
use App\Http\Controllers\Api\ResourceController;
use App\Http\Controllers\Api\SuccessStoryController;
use Illuminate\Support\Facades\Route;

Route::prefix('v1')->middleware('throttle:api')->group(function () {

    // Auth routes (public)
    Route::prefix('auth')->group(function () {
        Route::post('register', [AuthController::class, 'register']);
        Route::post('login', [AuthController::class, 'login']);
        Route::post('logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');
        Route::get('me', [AuthController::class, 'me'])->middleware('auth:sanctum');
    });

    // Public content routes
    Route::get('categories', [JobCategoryController::class, 'index']);
    Route::get('pricing', [PricingController::class, 'index']);
    Route::get('accountants/top', [AccountantController::class, 'top']);
    Route::get('success-stories', [SuccessStoryController::class, 'index']);
    Route::get('resources', [ResourceController::class, 'index']);
    Route::get('careers', [CareerController::class, 'index']);
    Route::post('contact', [ContactController::class, 'store']);

    // Jobs (public read)
    Route::get('jobs', [JobController::class, 'index']);
    Route::get('jobs/{id}', [JobController::class, 'show']);

    // Bids (auth required)
    Route::middleware('auth:sanctum')->group(function () {
        Route::post('jobs/{id}/bids', [BidController::class, 'store']);
        Route::get('my-bids', [BidController::class, 'myBids']);
    });
});
