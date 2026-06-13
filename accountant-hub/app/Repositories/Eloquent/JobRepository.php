<?php

namespace App\Repositories\Eloquent;

use App\Models\Job;
use App\Repositories\JobRepositoryInterface;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

class JobRepository implements JobRepositoryInterface
{
    public function paginateWithFilters(array $filters): LengthAwarePaginator
    {
        $query = Job::with('category');

        if (!empty($filters['search'])) {
            $query->where('title', 'like', '%' . $filters['search'] . '%');
        }

        if (!empty($filters['category_id'])) {
            $query->where('job_category_id', $filters['category_id']);
        }

        if (!empty($filters['budget_min'])) {
            $query->where('budget_min', '>=', $filters['budget_min']);
        }

        if (!empty($filters['budget_max'])) {
            $query->where('budget_max', '<=', $filters['budget_max']);
        }

        if (!empty($filters['status'])) {
            $query->where('status', $filters['status']);
        }

        $sort = $filters['sort'] ?? 'newest';
        if ($sort === 'highest_budget') {
            $query->orderBy('budget_max', 'desc');
        } else {
            $query->orderBy('posted_at', 'desc');
        }

        return $query->paginate(12);
    }

    public function findById(int $id): ?Job
    {
        return Job::with('category', 'bids')->withCount('bids')->find($id);
    }
}
