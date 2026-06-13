<?php

namespace Database\Seeders;

use App\Models\Bid;
use Illuminate\Database\Seeder;

class BidSeeder extends Seeder
{
    public function run(): void
    {
        Bid::create([
            'job_id' => 1,
            'user_id' => 2,
            'proposed_price' => 1100,
            'estimated_delivery_time' => 'Monthly recurring',
            'cover_letter' => 'I have 5 years of experience managing bookkeeping for e-commerce businesses using QuickBooks. I am confident I can deliver accurate and timely financial records for your company.',
            'experience_summary' => '5 years of bookkeeping experience with Shopify and WooCommerce stores. Proficient in QuickBooks, Xero, and bank reconciliation.',
        ]);

        Bid::create([
            'job_id' => 2,
            'user_id' => 2,
            'proposed_price' => 3200,
            'estimated_delivery_time' => '3 weeks',
            'cover_letter' => 'As a CPA with extensive experience in multi-state LLC taxation, I can prepare your returns accurately and ensure compliance with all regulations.',
            'experience_summary' => 'Certified CPA with 8 years of tax preparation experience. Specialized in multi-member LLCs and partnership taxation.',
        ]);

        Bid::create([
            'job_id' => 4,
            'user_id' => 2,
            'proposed_price' => 3800,
            'estimated_delivery_time' => '2 weeks',
            'cover_letter' => 'I have built over 20 financial models for SaaS startups. I understand the key metrics and can deliver a robust, dynamic model for your business.',
            'experience_summary' => 'Financial analyst with 6 years of SaaS modeling experience. Expert in MRR/ARR forecasting, churn analysis, and unit economics.',
        ]);
    }
}
