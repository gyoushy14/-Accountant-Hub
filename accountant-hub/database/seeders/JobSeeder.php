<?php

namespace Database\Seeders;

use App\Models\Job;
use Carbon\Carbon;
use Illuminate\Database\Seeder;

class JobSeeder extends Seeder
{
    public function run(): void
    {
        $jobs = [
            [
                'title' => 'Monthly Bookkeeping for E-commerce Store',
                'client_name' => 'Shopify Solutions Inc.',
                'description' => 'We need a detail-oriented accountant to handle monthly bookkeeping for our growing e-commerce business. Tasks include recording transactions, reconciling bank statements, managing accounts payable/receivable, and preparing financial summaries. Experience with QuickBooks Online and Shopify integration is a plus.',
                'short_description' => 'Handle monthly bookkeeping for a fast-growing e-commerce business.',
                'budget_min' => 800,
                'budget_max' => 1500,
                'deadline' => '2026-07-15',
                'required_skills' => ['QuickBooks', 'Bank Reconciliation', 'Accounts Payable', 'Excel'],
                'delivery_time' => 'Monthly recurring',
                'status' => 'open',
                'job_category_id' => 1,
            ],
            [
                'title' => 'Annual Tax Return Preparation - LLC',
                'client_name' => 'BrightPath Consulting LLC',
                'description' => 'Seeking an experienced tax accountant to prepare and file our annual federal and state tax returns. We are a multi-member LLC operating in 3 states. Must be familiar with LLC taxation, schedule K-1 preparation, and state apportionment rules.',
                'short_description' => 'Prepare and file annual tax returns for a multi-member LLC.',
                'budget_min' => 2000,
                'budget_max' => 4000,
                'deadline' => '2026-08-30',
                'required_skills' => ['Tax Preparation', 'LLC Taxation', 'Schedule K-1', 'Multi-state Tax'],
                'delivery_time' => '4 weeks',
                'status' => 'open',
                'job_category_id' => 2,
            ],
            [
                'title' => 'Internal Audit for Non-Profit Organization',
                'client_name' => 'Hope Foundation',
                'description' => 'We require a certified auditor to conduct an internal audit for our non-profit organization. The audit will cover financial controls, grant fund management, donor reporting accuracy, and compliance with GAAP and IRS 501(c)(3) regulations.',
                'short_description' => 'Conduct internal audit covering financial controls and compliance.',
                'budget_min' => 3000,
                'budget_max' => 5500,
                'deadline' => '2026-09-01',
                'required_skills' => ['Internal Audit', 'GAAP', 'Non-profit Accounting', 'Compliance'],
                'delivery_time' => '3 weeks',
                'status' => 'open',
                'job_category_id' => 3,
            ],
            [
                'title' => 'Financial Model for SaaS Startup',
                'client_name' => 'CloudMetrics Inc.',
                'description' => 'Looking for a financial analyst to build a comprehensive 3-year financial model for our SaaS startup. Must include revenue forecasting (MRR/ARR), churn analysis, unit economics, cash flow projections, and scenario analysis. Experience with SaaS metrics required.',
                'short_description' => 'Build a 3-year financial model for a SaaS startup.',
                'budget_min' => 2500,
                'budget_max' => 5000,
                'deadline' => '2026-07-30',
                'required_skills' => ['Financial Modeling', 'SaaS Metrics', 'Excel', 'Forecasting'],
                'delivery_time' => '2 weeks',
                'status' => 'open',
                'job_category_id' => 4,
            ],
            [
                'title' => 'Payroll Processing for 50 Employees',
                'client_name' => 'Midtown Retail Group',
                'description' => 'We need a reliable accountant to manage bi-weekly payroll for our 50 employees across 2 locations. Responsibilities include payroll calculation, tax withholding, direct deposit processing, and quarterly payroll tax filings. Experience with Gusto and ADP preferred.',
                'short_description' => 'Manage bi-weekly payroll processing for 50 employees.',
                'budget_min' => 1200,
                'budget_max' => 2000,
                'deadline' => '2026-07-01',
                'required_skills' => ['Payroll', 'Gusto', 'ADP', 'Payroll Tax'],
                'delivery_time' => 'Ongoing',
                'status' => 'open',
                'job_category_id' => 5,
            ],
            [
                'title' => 'QuickBooks Cleanup & Reconciliation',
                'client_name' => 'GreenLeaf Landscaping',
                'description' => 'Our books are a mess and we need an expert to clean up 6 months of QuickBooks entries, reconcile all bank and credit card accounts, and set up proper chart of accounts. Must have strong QuickBooks Online experience.',
                'short_description' => 'Clean up and reconcile 6 months of QuickBooks entries.',
                'budget_min' => 1500,
                'budget_max' => 2500,
                'deadline' => '2026-06-30',
                'required_skills' => ['QuickBooks', 'Bank Reconciliation', 'Chart of Accounts', 'Accounting'],
                'delivery_time' => '1 week',
                'status' => 'closed',
                'job_category_id' => 1,
            ],
            [
                'title' => 'Corporate Tax Planning & Strategy',
                'client_name' => 'TechVentures Corp',
                'description' => 'Seeking a tax strategist to help us minimize our corporate tax burden for the upcoming fiscal year. We are a C-corp with revenues of $5M. Need analysis of R&D tax credits, depreciation strategies, and entity structure optimization.',
                'short_description' => 'Develop tax minimization strategy for a C-corp.',
                'budget_min' => 3500,
                'budget_max' => 6000,
                'deadline' => '2026-08-15',
                'required_skills' => ['Tax Strategy', 'Corporate Tax', 'R&D Credits', 'Entity Structuring'],
                'delivery_time' => '3 weeks',
                'status' => 'open',
                'job_category_id' => 2,
            ],
            [
                'title' => 'Financial Statement Audit - Mid-Size Firm',
                'client_name' => 'Sterling Partners LP',
                'description' => 'We require a full financial statement audit for the fiscal year ending Dec 31, 2025. The engagement includes balance sheet, income statement, cash flow review, and internal control assessment. Must be a CPA with previous audit experience.',
                'short_description' => 'Full financial statement audit for a mid-size firm.',
                'budget_min' => 8000,
                'budget_max' => 12000,
                'deadline' => '2026-10-01',
                'required_skills' => ['Financial Audit', 'CPA', 'GAAP', 'Internal Controls'],
                'delivery_time' => '6 weeks',
                'status' => 'open',
                'job_category_id' => 3,
            ],
            [
                'title' => 'Investment Portfolio Analysis & Reporting',
                'client_name' => 'Heritage Wealth Management',
                'description' => 'Looking for a financial analyst to prepare quarterly performance reports for our client investment portfolios. Must be able to calculate IRR, time-weighted returns, Sharpe ratios, and provide meaningful commentary on portfolio performance.',
                'short_description' => 'Prepare quarterly investment portfolio performance reports.',
                'budget_min' => 1800,
                'budget_max' => 3000,
                'deadline' => '2026-07-15',
                'required_skills' => ['Portfolio Analysis', 'Excel', 'Performance Reporting', 'Investment Accounting'],
                'delivery_time' => 'Quarterly',
                'status' => 'open',
                'job_category_id' => 4,
            ],
            [
                'title' => 'Sales Tax Filing for E-Commerce Business',
                'client_name' => 'Artisan Goods Market',
                'description' => 'Need assistance with multi-state sales tax compliance for our online marketplace. We sell across 20 states and need help with registration, calculation, filing, and remittance. Knowledge of economic nexus laws and TaxJar experience required.',
                'short_description' => 'Manage multi-state sales tax compliance and filing.',
                'budget_min' => 1000,
                'budget_max' => 2200,
                'deadline' => '2026-07-10',
                'required_skills' => ['Sales Tax', 'Multi-state Tax', 'TaxJar', 'Compliance'],
                'delivery_time' => 'Monthly',
                'status' => 'closed',
                'job_category_id' => 2,
            ],
            [
                'title' => 'Accounts Receivable Aging Analysis',
                'client_name' => 'Precision Manufacturing Co.',
                'description' => 'We need an accountant to perform a thorough AR aging analysis, identify collection risks, and recommend improvements to our credit and collections process. Should deliver a detailed report with action items.',
                'short_description' => 'Analyze AR aging and recommend collection improvements.',
                'budget_min' => 600,
                'budget_max' => 1200,
                'deadline' => '2026-06-25',
                'required_skills' => ['Accounts Receivable', 'Excel', 'Financial Analysis', 'Reporting'],
                'delivery_time' => '5 days',
                'status' => 'closed',
                'job_category_id' => 1,
            ],
            [
                'title' => 'Cash Flow Forecasting & Budgeting',
                'client_name' => 'Urban Development Group',
                'description' => 'Seeking an experienced accountant to develop a 12-month cash flow forecast and annual budget for our real estate development firm. Must incorporate project timelines, financing costs, and seasonal variations. Scenario modeling required.',
                'short_description' => 'Develop 12-month cash flow forecast and annual budget.',
                'budget_min' => 2000,
                'budget_max' => 3500,
                'deadline' => '2026-08-01',
                'required_skills' => ['Cash Flow', 'Budgeting', 'Financial Modeling', 'Real Estate'],
                'delivery_time' => '2 weeks',
                'status' => 'open',
                'job_category_id' => 4,
            ],
        ];

        $postedAt = Carbon::now()->subDays(30);

        foreach ($jobs as $index => $jobData) {
            $jobData['posted_at'] = $postedAt->copy()->addDays($index * 2);
            Job::create($jobData);
        }
    }
}
