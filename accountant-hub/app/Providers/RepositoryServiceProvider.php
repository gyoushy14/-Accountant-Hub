<?php

namespace App\Providers;

use App\Repositories\BidRepositoryInterface;
use App\Repositories\Eloquent\BidRepository;
use App\Repositories\Eloquent\JobCategoryRepository;
use App\Repositories\Eloquent\JobRepository;
use App\Repositories\JobCategoryRepositoryInterface;
use App\Repositories\JobRepositoryInterface;
use Illuminate\Support\ServiceProvider;

class RepositoryServiceProvider extends ServiceProvider
{
    public function register(): void
    {
        $this->app->bind(JobCategoryRepositoryInterface::class, JobCategoryRepository::class);
        $this->app->bind(JobRepositoryInterface::class, JobRepository::class);
        $this->app->bind(BidRepositoryInterface::class, BidRepository::class);
    }

    public function boot(): void
    {
        //
    }
}
