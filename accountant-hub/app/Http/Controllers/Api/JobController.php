<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\JobDetailResource;
use App\Http\Resources\JobResource;
use App\Models\Bid;
use App\Models\Job;
use App\Services\JobService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class JobController extends Controller
{
    public function __construct(
        private JobService $jobService
    ) {}

    public function index(Request $request): JsonResponse
    {
        $filters = $request->only(['search', 'category_id', 'budget_min', 'budget_max', 'sort', 'status']);
        $jobs = $this->jobService->paginate($filters);

        return response()->json([
            'success' => true,
            'message' => 'Jobs retrieved.',
            'data' => JobResource::collection($jobs),
            'meta' => [
                'current_page' => $jobs->currentPage(),
                'last_page' => $jobs->lastPage(),
                'per_page' => $jobs->perPage(),
                'total' => $jobs->total(),
            ],
        ]);
    }

    public function show(Request $request, int $id): JsonResponse
    {
        $job = $this->jobService->findById($id);

        if (!$job) {
            return response()->json([
                'success' => false,
                'message' => 'Job not found.',
            ], 404);
        }

        $user = $request->user('sanctum');

        return response()->json([
            'success' => true,
            'message' => 'Job details retrieved.',
            'data' => new JobDetailResource($job, $user),
        ]);
    }
}
