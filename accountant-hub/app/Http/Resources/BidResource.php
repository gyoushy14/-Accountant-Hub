<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class BidResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        $data = [
            'id' => $this->id,
            'proposed_price' => (float) $this->proposed_price,
            'estimated_delivery_time' => $this->estimated_delivery_time,
            'cover_letter' => $this->cover_letter,
            'experience_summary' => $this->experience_summary,
            'created_at' => $this->created_at->toISOString(),
        ];

        if ($this->relationLoaded('job')) {
            $data['job'] = [
                'id' => $this->job->id,
                'title' => $this->job->title,
                'status' => $this->job->status,
                'client_name' => $this->job->client_name,
            ];
        }

        if ($this->relationLoaded('user')) {
            $data['user'] = [
                'id' => $this->user->id,
                'name' => $this->user->name,
            ];
        }

        return $data;
    }
}
