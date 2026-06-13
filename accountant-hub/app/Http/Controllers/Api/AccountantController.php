<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Accountant;
use Illuminate\Http\JsonResponse;

class AccountantController extends Controller
{
    public function top(): JsonResponse
    {
        $accountants = Accountant::where('is_active', true)
            ->orderBy('rating', 'desc')
            ->take(10)
            ->get()
            ->map(fn ($a) => [
                'id' => $a->id,
                'name' => $a->name,
                'title' => $a->title,
                'bio' => $a->bio,
                'rating' => (float) $a->rating,
                'avatar_url' => $a->avatar_url,
            ]);

        return response()->json([
            'success' => true,
            'message' => 'Top accountants retrieved.',
            'data' => $accountants,
        ]);
    }
}
