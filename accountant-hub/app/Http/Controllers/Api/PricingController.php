<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;

class PricingController extends Controller
{
    public function index(): JsonResponse
    {
        $tiers = [
            [
                'name' => 'Free',
                'price' => 0,
                'currency' => 'USD',
                'interval' => 'month',
                'description' => 'Perfect for getting started',
                'features' => [
                    'Browse up to 50 jobs per month',
                    'Submit up to 3 bids per month',
                    'Basic profile visibility',
                    'Email support',
                ],
                'cta' => 'Get Started',
                'highlighted' => false,
            ],
            [
                'name' => 'Pro',
                'price' => 29,
                'currency' => 'USD',
                'interval' => 'month',
                'description' => 'For serious freelancers',
                'features' => [
                    'Unlimited job browsing',
                    'Unlimited bid submissions',
                    'Priority profile placement',
                    'Advanced analytics dashboard',
                    'Priority email & chat support',
                    'Verified badge',
                ],
                'cta' => 'Upgrade to Pro',
                'highlighted' => true,
            ],
            [
                'name' => 'Enterprise',
                'price' => 99,
                'currency' => 'USD',
                'interval' => 'month',
                'description' => 'For agencies and teams',
                'features' => [
                    'Everything in Pro',
                    'Team accounts (up to 5 seats)',
                    'API access',
                    'Custom integrations',
                    'Dedicated account manager',
                    'White-labeled proposals',
                    'SLA guarantee',
                ],
                'cta' => 'Contact Sales',
                'highlighted' => false,
            ],
        ];

        return response()->json([
            'success' => true,
            'message' => 'Pricing tiers retrieved.',
            'data' => $tiers,
        ]);
    }
}
