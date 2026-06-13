<?php

namespace App\Repositories;

use App\Models\Bid;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

interface BidRepositoryInterface
{
    public function create(array $data): Bid;
    public function findByJobAndUser(int $jobId, int $userId): ?Bid;
    public function paginateByUser(int $userId): LengthAwarePaginator;
}
