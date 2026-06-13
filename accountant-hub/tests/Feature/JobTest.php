<?php

namespace Tests\Feature;

use App\Models\Job;
use App\Models\JobCategory;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class JobTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();

        $category = JobCategory::create(['name' => 'Bookkeeping', 'slug' => 'bookkeeping']);

        Job::create([
            'title' => 'Test Job Title',
            'client_name' => 'Test Client',
            'description' => 'This is a test job description for testing purposes.',
            'short_description' => 'Test job short description.',
            'budget_min' => 1000,
            'budget_max' => 2000,
            'deadline' => '2026-12-31',
            'required_skills' => ['PHP', 'Laravel'],
            'delivery_time' => '2 weeks',
            'status' => 'open',
            'job_category_id' => $category->id,
            'posted_at' => now(),
        ]);
    }

    public function test_can_list_jobs()
    {
        $response = $this->getJson('/api/v1/jobs');

        $response->assertStatus(200)
            ->assertJson([
                'success' => true,
                'message' => 'Jobs retrieved.',
            ])
            ->assertJsonStructure([
                'success', 'message', 'data', 'meta' => ['current_page', 'last_page', 'per_page', 'total']
            ]);
    }

    public function test_can_search_jobs_by_title()
    {
        $response = $this->getJson('/api/v1/jobs?search=Test+Job');

        $response->assertStatus(200);
        $this->assertCount(1, $response->json('data'));
    }

    public function test_can_filter_jobs_by_category()
    {
        $response = $this->getJson('/api/v1/jobs?category_id=1');

        $response->assertStatus(200)
            ->assertJsonPath('data.0.category.id', 1);
    }

    public function test_can_sort_jobs_by_highest_budget()
    {
        $response = $this->getJson('/api/v1/jobs?sort=highest_budget');

        $response->assertStatus(200);
    }

    public function test_can_view_job_detail()
    {
        $response = $this->getJson('/api/v1/jobs/1');

        $response->assertStatus(200)
            ->assertJson([
                'success' => true,
                'message' => 'Job details retrieved.',
            ])
            ->assertJsonStructure([
                'success', 'message', 'data' => [
                    'id', 'title', 'client_name', 'description', 'short_description',
                    'budget_min', 'budget_max', 'deadline', 'required_skills',
                    'delivery_time', 'category', 'bids_count', 'status'
                ]
            ]);
    }

    public function test_returns_404_for_nonexistent_job()
    {
        $response = $this->getJson('/api/v1/jobs/999');

        $response->assertStatus(404)
            ->assertJson([
                'success' => false,
                'message' => 'Job not found.',
            ]);
    }
}
