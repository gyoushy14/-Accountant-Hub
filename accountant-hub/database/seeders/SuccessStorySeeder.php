<?php

namespace Database\Seeders;

use App\Models\SuccessStory;
use Illuminate\Database\Seeder;

class SuccessStorySeeder extends Seeder
{
    public function run(): void
    {
        $stories = [
            [
                'client_name' => 'Robert Mitchell',
                'company' => 'Mitchell & Sons Construction',
                'quote' => 'AccountantHUB connected us with a phenomenal bookkeeper who transformed our messy finances into a well-organized system. We saved over $15k in the first quarter alone by identifying billing errors and duplicate payments.',
                'rating' => 5,
            ],
            [
                'client_name' => 'Jennifer Walsh',
                'company' => 'Walsh Marketing Agency',
                'quote' => 'I was drowning in tax paperwork until I found Sarah on AccountantHUB. She filed our multi-state returns flawlessly and saved us thousands in potential penalties. The platform made finding the perfect accountant incredibly easy.',
                'rating' => 5,
            ],
            [
                'client_name' => 'Thomas Rivera',
                'company' => 'Rivera Tech Solutions',
                'quote' => 'As a startup founder, I needed a CFO consultant to help with our Series A fundraising. The financial model built by David Kim was instrumental in securing our $2M investment round. Highly recommended!',
                'rating' => 5,
            ],
            [
                'client_name' => 'Priya Sharma',
                'company' => 'Sharma Wellness Group',
                'quote' => 'Hiring a payroll specialist through AccountantHUB was the best decision we made this year. Our payroll processing time decreased by 80%, and employee satisfaction with payroll accuracy has never been higher.',
                'rating' => 4,
            ],
        ];

        foreach ($stories as $data) {
            SuccessStory::create($data);
        }
    }
}
