<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Career;
use Illuminate\Http\JsonResponse;

class CareerController extends Controller
{
    public function index(): JsonResponse
    {
        $careers = Career::where('is_active', true)
            ->orderBy('created_at', 'desc')
            ->get()
            ->map(fn ($c) => [
                'id' => $c->id,
                'title' => $c->title,
                'department' => $c->department,
                'location' => $c->location,
                'type' => $c->type,
                'description' => $c->description,
            ]);

        return response()->json([
            'success' => true,
            'message' => 'Careers retrieved.',
            'data' => $careers,
        ]);
    }
}
