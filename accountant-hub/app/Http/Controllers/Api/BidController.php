<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreBidRequest;
use App\Http\Resources\BidResource;
use App\Services\BidService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class BidController extends Controller
{
    public function __construct(
        private BidService $bidService
    ) {}

    public function store(StoreBidRequest $request, int $jobId): JsonResponse
    {
        $bid = $this->bidService->submit(
            $jobId,
            $request->user()->id,
            $request->validated()
        );

        return response()->json([
            'success' => true,
            'message' => 'Bid submitted successfully.',
            'data' => new BidResource($bid),
        ], 201);
    }

    public function myBids(Request $request): JsonResponse
    {
        $bids = $this->bidService->getUserBids($request->user()->id);

        return response()->json([
            'success' => true,
            'message' => 'Your bids retrieved.',
            'data' => BidResource::collection($bids),
            'meta' => [
                'current_page' => $bids->currentPage(),
                'last_page' => $bids->lastPage(),
                'per_page' => $bids->perPage(),
                'total' => $bids->total(),
            ],
        ]);
    }
}
