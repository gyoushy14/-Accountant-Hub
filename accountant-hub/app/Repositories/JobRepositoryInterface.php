<?php

namespace App\Repositories;

use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use App\Models\Job;

interface JobRepositoryInterface
{
    public function paginateWithFilters(array $filters): LengthAwarePaginator;
    public function findById(int $id): ?Job;
}
