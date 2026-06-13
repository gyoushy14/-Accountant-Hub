<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\SuccessStory;
use Illuminate\Http\JsonResponse;

class SuccessStoryController extends Controller
{
    public function index(): JsonResponse
    {
        $stories = SuccessStory::where('is_active', true)
            ->orderBy('created_at', 'desc')
            ->get()
            ->map(fn ($s) => [
                'id' => $s->id,
                'client_name' => $s->client_name,
                'company' => $s->company,
                'quote' => $s->quote,
                'rating' => $s->rating,
                'avatar_url' => $s->avatar_url,
            ]);

        return response()->json([
            'success' => true,
            'message' => 'Success stories retrieved.',
            'data' => $stories,
        ]);
    }
}
