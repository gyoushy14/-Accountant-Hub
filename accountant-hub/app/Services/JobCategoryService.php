<?php

namespace App\Services;

use App\Repositories\JobCategoryRepositoryInterface;
use Illuminate\Database\Eloquent\Collection;

class JobCategoryService
{
    public function __construct(
        private JobCategoryRepositoryInterface $categoryRepository
    ) {}

    public function getAll(): Collection
    {
        return $this->categoryRepository->all();
    }
}
