<?php

namespace Database\Seeders;

use App\Models\Accountant;
use Illuminate\Database\Seeder;

class AccountantSeeder extends Seeder
{
    public function run(): void
    {
        $accountants = [
            ['name' => 'Sarah Chen', 'title' => 'CPA, Tax Specialist', 'bio' => 'Over 12 years of experience in tax preparation and corporate accounting for small to mid-size businesses.', 'rating' => 4.9],
            ['name' => 'Marcus Johnson', 'title' => 'Financial Auditor', 'bio' => 'Certified Internal Auditor with expertise in financial statement audits, internal controls, and compliance for non-profits and corporations.', 'rating' => 4.8],
            ['name' => 'Aisha Patel', 'title' => 'Bookkeeping Expert', 'bio' => 'QuickBooks ProAdvisor with 8 years of experience helping e-commerce and service businesses maintain clean books.', 'rating' => 4.9],
            ['name' => 'David Kim', 'title' => 'CFO Consultant', 'bio' => 'Former Fortune 500 finance executive now helping startups and SaaS companies with financial modeling, forecasting, and fundraising.', 'rating' => 4.7],
            ['name' => 'Emily Torres', 'title' => 'Payroll & Compliance Manager', 'bio' => 'Specializing in multi-state payroll processing, tax compliance, and HRIS implementations for companies with 10-500 employees.', 'rating' => 4.8],
            ['name' => 'James Okafor', 'title' => 'Management Accountant', 'bio' => 'Chartered Global Management Accountant with deep experience in cost analysis, budgeting, and financial strategy for manufacturing firms.', 'rating' => 4.6],
        ];

        foreach ($accountants as $data) {
            Accountant::create($data);
        }
    }
}
