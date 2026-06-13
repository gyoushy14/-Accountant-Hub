<?php

namespace Tests\Feature;

use App\Models\Bid;
use App\Models\Job;
use App\Models\JobCategory;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class BidTest extends TestCase
{
    use RefreshDatabase;

    private User $user;
    private Job $job;

    protected function setUp(): void
    {
        parent::setUp();

        $this->user = User::create([
            'name' => 'Test Accountant',
            'email' => 'test@test.com',
            'password' => bcrypt('password'),
        ]);

        $category = JobCategory::create(['name' => 'Bookkeeping', 'slug' => 'bookkeeping']);

        $this->job = Job::create([
            'title' => 'Test Job',
            'client_name' => 'Test Client',
            'description' => 'A test job description that is long enough to pass validation.',
            'short_description' => 'Test job.',
            'budget_min' => 1000,
            'budget_max' => 2000,
            'deadline' => '2026-12-31',
            'required_skills' => ['PHP'],
            'delivery_time' => '2 weeks',
            'status' => 'open',
            'job_category_id' => $category->id,
            'posted_at' => now(),
        ]);
    }

    public function test_authenticated_user_can_submit_bid()
    {
        $token = $this->user->createToken('test-token')->plainTextToken;

        $response = $this->withHeader('Authorization', "Bearer $token")
            ->postJson("/api/v1/jobs/{$this->job->id}/bids", [
                'proposed_price' => 1500,
                'estimated_delivery_time' => '2 weeks',
                'cover_letter' => 'I have extensive experience in accounting and can deliver high quality work on time.',
                'experience_summary' => 'Over 5 years of professional accounting experience.',
            ]);

        $response->assertStatus(201)
            ->assertJson([
                'success' => true,
                'message' => 'Bid submitted successfully.',
            ])
            ->assertJsonStructure([
                'success', 'message', 'data' => [
                    'id', 'proposed_price', 'estimated_delivery_time',
                    'cover_letter', 'experience_summary', 'created_at'
                ]
            ]);
    }

    public function test_duplicate_bid_is_rejected()
    {
        Bid::create([
            'job_id' => $this->job->id,
            'user_id' => $this->user->id,
            'proposed_price' => 1000,
            'estimated_delivery_time' => '1 week',
            'cover_letter' => 'I have extensive experience in accounting and can deliver high quality work.',
            'experience_summary' => '5 years of professional accounting experience.',
        ]);

        $token = $this->user->createToken('test-token')->plainTextToken;

        $response = $this->withHeader('Authorization', "Bearer $token")
            ->postJson("/api/v1/jobs/{$this->job->id}/bids", [
                'proposed_price' => 1500,
                'estimated_delivery_time' => '2 weeks',
                'cover_letter' => 'I have extensive experience in accounting and can deliver high quality work on time.',
                'experience_summary' => 'Over 5 years of professional accounting experience.',
            ]);

        $response->assertStatus(409)
            ->assertJson([
                'success' => false,
                'message' => 'You have already submitted a bid for this job.',
            ]);
    }

    public function test_unauthenticated_user_cannot_submit_bid()
    {
        $response = $this->postJson("/api/v1/jobs/{$this->job->id}/bids", [
            'proposed_price' => 1500,
            'estimated_delivery_time' => '2 weeks',
            'cover_letter' => 'I have extensive experience in accounting and can deliver high quality work on time.',
            'experience_summary' => 'Over 5 years of professional accounting experience.',
        ]);

        $response->assertStatus(401)
            ->assertJson([
                'success' => false,
                'message' => 'Unauthenticated.',
            ]);
    }

    public function test_bid_on_closed_job_is_rejected()
    {
        $this->job->update(['status' => 'closed']);

        $token = $this->user->createToken('test-token')->plainTextToken;

        $response = $this->withHeader('Authorization', "Bearer $token")
            ->postJson("/api/v1/jobs/{$this->job->id}/bids", [
                'proposed_price' => 1500,
                'estimated_delivery_time' => '2 weeks',
                'cover_letter' => 'I have extensive experience in accounting and can deliver high quality work on time.',
                'experience_summary' => 'Over 5 years of professional accounting experience.',
            ]);

        $response->assertStatus(409)
            ->assertJson([
                'success' => false,
                'message' => 'This job is closed for bidding.',
            ]);
    }

    public function test_user_can_view_their_bids()
    {
        Bid::create([
            'job_id' => $this->job->id,
            'user_id' => $this->user->id,
            'proposed_price' => 1000,
            'estimated_delivery_time' => '1 week',
            'cover_letter' => 'I have extensive experience in accounting and can deliver high quality work.',
            'experience_summary' => '5 years of professional accounting experience.',
        ]);

        $token = $this->user->createToken('test-token')->plainTextToken;

        $response = $this->withHeader('Authorization', "Bearer $token")
            ->getJson('/api/v1/my-bids');

        $response->assertStatus(200)
            ->assertJson([
                'success' => true,
                'message' => 'Your bids retrieved.',
            ])
            ->assertJsonStructure([
                'success', 'message', 'data', 'meta'
            ]);

        $this->assertCount(1, $response->json('data'));
    }
}
