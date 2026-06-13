<?php

namespace App\Repositories\Eloquent;

use App\Models\JobCategory;
use App\Repositories\JobCategoryRepositoryInterface;
use Illuminate\Database\Eloquent\Collection;

class JobCategoryRepository implements JobCategoryRepositoryInterface
{
    public function all(): Collection
    {
        return JobCategory::all();
    }
}
