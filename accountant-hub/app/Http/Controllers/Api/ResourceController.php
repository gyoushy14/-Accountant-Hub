<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Resource;
use Illuminate\Http\JsonResponse;

class ResourceController extends Controller
{
    public function index(): JsonResponse
    {
        $resources = Resource::whereNotNull('published_at')
            ->where('published_at', '<=', now())
            ->orderBy('published_at', 'desc')
            ->get()
            ->map(fn ($r) => [
                'id' => $r->id,
                'title' => $r->title,
                'category' => $r->category,
                'excerpt' => $r->excerpt,
                'author' => $r->author,
                'image_url' => $r->image_url,
                'published_at' => $r->published_at->diffForHumans(),
            ]);

        return response()->json([
            'success' => true,
            'message' => 'Resources retrieved.',
            'data' => $resources,
        ]);
    }
}
