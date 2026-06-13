<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\JobResource;
use App\Services\JobCategoryService;
use Illuminate\Http\JsonResponse;

class JobCategoryController extends Controller
{
    public function __construct(
        private JobCategoryService $categoryService
    ) {}

    public function index(): JsonResponse
    {
        $categories = $this->categoryService->getAll();

        return response()->json([
            'success' => true,
            'message' => 'Categories retrieved.',
            'data' => $categories->map(fn ($c) => [
                'id' => $c->id,
                'name' => $c->name,
                'slug' => $c->slug,
            ]),
        ]);
    }
}
