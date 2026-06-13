<?php

namespace App\Http\Resources;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class JobDetailResource extends JsonResource
{
    private ?User $authUser;

    public function __construct($resource, ?User $authUser = null)
    {
        parent::__construct($resource);
        $this->authUser = $authUser;
    }

    public function toArray(Request $request): array
    {
        $userBid = null;
        $hasApplied = false;

        if ($this->authUser) {
            $userBid = $this->bids->firstWhere('user_id', $this->authUser->id);
            $hasApplied = $userBid !== null;
        }

        return [
            'id' => $this->id,
            'title' => $this->title,
            'client_name' => $this->client_name,
            'description' => $this->description,
            'short_description' => $this->short_description,
            'budget_min' => (float) $this->budget_min,
            'budget_max' => (float) $this->budget_max,
            'deadline' => $this->deadline->format('Y-m-d'),
            'required_skills' => $this->required_skills,
            'delivery_time' => $this->delivery_time,
            'category' => [
                'id' => $this->category->id,
                'name' => $this->category->name,
            ],
            'bids_count' => (int) $this->bids_count,
            'attachments' => $this->attachments,
            'posted_at' => $this->posted_at->diffForHumans(),
            'status' => $this->status,
            'has_applied' => $hasApplied,
            'user_bid' => $userBid ? new BidResource($userBid) : null,
        ];
    }
}
