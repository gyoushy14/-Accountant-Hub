<?php

namespace App\Repositories;

use Illuminate\Database\Eloquent\Collection;

interface JobCategoryRepositoryInterface
{
    public function all(): Collection;
}
