<?php

namespace App\Services;

use App\Models\Bid;
use App\Models\Job;
use App\Repositories\BidRepositoryInterface;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Symfony\Component\HttpKernel\Exception\ConflictHttpException;
use Symfony\Component\HttpKernel\Exception\HttpException;

class BidService
{
    public function __construct(
        private BidRepositoryInterface $bidRepository
    ) {}

    public function submit(int $jobId, int $userId, array $data): Bid
    {
        $job = Job::findOrFail($jobId);

        if ($job->status === 'closed') {
            throw new HttpException(409, 'This job is closed for bidding.');
        }

        $existing = $this->bidRepository->findByJobAndUser($jobId, $userId);
        if ($existing) {
            throw new ConflictHttpException('You have already submitted a bid for this job.');
        }

        $data['job_id'] = $jobId;
        $data['user_id'] = $userId;

        return $this->bidRepository->create($data);
    }

    public function getUserBids(int $userId): LengthAwarePaginator
    {
        return $this->bidRepository->paginateByUser($userId);
    }
}
