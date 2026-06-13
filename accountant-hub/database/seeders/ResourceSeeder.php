<?php

namespace Database\Seeders;

use App\Models\Resource;
use Carbon\Carbon;
use Illuminate\Database\Seeder;

class ResourceSeeder extends Seeder
{
    public function run(): void
    {
        $resources = [
            [
                'title' => '10 Tax Deductions Every Small Business Owner Should Know',
                'category' => 'Tax Tips',
                'excerpt' => 'Discover the most commonly overlooked tax deductions that could save your business thousands this year. From home office expenses to vehicle deductions, we cover it all.',
                'content' => 'Full article content here...',
                'author' => 'Sarah Chen',
                'published_at' => Carbon::now()->subDays(2),
            ],
            [
                'title' => 'How to Choose the Right Accounting Software for Your Business',
                'category' => 'Tools & Software',
                'excerpt' => 'A comprehensive comparison of QuickBooks, Xero, FreshBooks, and Wave to help you find the perfect fit for your business size and industry.',
                'content' => 'Full article content here...',
                'author' => 'Marcus Johnson',
                'published_at' => Carbon::now()->subDays(7),
            ],
            [
                'title' => 'The Ultimate Guide to Financial Statement Analysis',
                'category' => 'Financial Analysis',
                'excerpt' => 'Learn how to read and analyze balance sheets, income statements, and cash flow statements to make better business decisions.',
                'content' => 'Full article content here...',
                'author' => 'Aisha Patel',
                'published_at' => Carbon::now()->subDays(14),
            ],
            [
                'title' => 'Preparing for a Successful Audit: A Step-by-Step Checklist',
                'category' => 'Auditing',
                'excerpt' => 'Don\'t let an audit catch you off guard. Follow this comprehensive checklist to ensure your financial records are audit-ready at all times.',
                'content' => 'Full article content here...',
                'author' => 'David Kim',
                'published_at' => Carbon::now()->subDays(21),
            ],
        ];

        foreach ($resources as $data) {
            Resource::create($data);
        }
    }
}
