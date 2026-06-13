<?php

namespace App\Services;

use App\Models\Job;
use App\Repositories\JobRepositoryInterface;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

class JobService
{
    public function __construct(
        private JobRepositoryInterface $jobRepository
    ) {}

    public function paginate(array $filters): LengthAwarePaginator
    {
        return $this->jobRepository->paginateWithFilters($filters);
    }

    public function findById(int $id): ?Job
    {
        return $this->jobRepository->findById($id);
    }
}
