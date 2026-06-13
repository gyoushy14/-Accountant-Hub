<?php

namespace App\Repositories\Eloquent;

use App\Models\Bid;
use App\Repositories\BidRepositoryInterface;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

class BidRepository implements BidRepositoryInterface
{
    public function create(array $data): Bid
    {
        return Bid::create($data);
    }

    public function findByJobAndUser(int $jobId, int $userId): ?Bid
    {
        return Bid::where('job_id', $jobId)->where('user_id', $userId)->first();
    }

    public function paginateByUser(int $userId): LengthAwarePaginator
    {
        return Bid::with('job:id,title,status,client_name')
            ->where('user_id', $userId)
            ->orderBy('created_at', 'desc')
            ->paginate(12);
    }
}
