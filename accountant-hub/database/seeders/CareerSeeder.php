<?php

namespace Database\Seeders;

use App\Models\Career;
use Illuminate\Database\Seeder;

class CareerSeeder extends Seeder
{
    public function run(): void
    {
        $careers = [
            [
                'title' => 'Senior Full-Stack Developer',
                'department' => 'Engineering',
                'location' => 'San Francisco, CA',
                'type' => 'Full-time',
                'description' => 'We are looking for an experienced full-stack developer to help build and scale our marketplace platform. You will work with React, Node.js, and cloud infrastructure to deliver features that serve thousands of accountants and businesses.',
            ],
            [
                'title' => 'Customer Success Manager',
                'department' => 'Operations',
                'location' => 'Remote',
                'type' => 'Full-time',
                'description' => 'Join our customer success team to help accountants and businesses get the most out of AccountantHUB. You will onboard new users, resolve issues, and gather feedback to improve the platform.',
            ],
            [
                'title' => 'Marketing Intern',
                'department' => 'Marketing',
                'location' => 'New York, NY',
                'type' => 'Internship',
                'description' => 'Help us grow the AccountantHUB community through content marketing, social media, and outreach campaigns. Ideal for students or recent graduates interested in marketplace and fintech marketing.',
            ],
        ];

        foreach ($careers as $data) {
            Career::create($data);
        }
    }
}
