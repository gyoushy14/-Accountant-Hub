<?php

namespace Database\Seeders;

use App\Models\JobCategory;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class JobCategorySeeder extends Seeder
{
    public function run(): void
    {
        $categories = ['Bookkeeping', 'Tax Preparation', 'Auditing', 'Financial Analysis', 'Payroll Management'];

        foreach ($categories as $name) {
            JobCategory::create([
                'name' => $name,
                'slug' => Str::slug($name),
            ]);
        }
    }
}
