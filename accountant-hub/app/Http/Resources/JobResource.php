<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class JobResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'client_name' => $this->client_name,
            'short_description' => $this->short_description,
            'budget_min' => (float) $this->budget_min,
            'budget_max' => (float) $this->budget_max,
            'deadline' => $this->deadline->format('Y-m-d'),
            'category' => [
                'id' => $this->category->id,
                'name' => $this->category->name,
            ],
            'bids_count' => (int) $this->bids_count,
            'posted_at' => $this->posted_at->diffForHumans(),
            'status' => $this->status,
        ];
    }
}
