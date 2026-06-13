<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        User::create([
            'name' => 'Accountant One',
            'email' => 'accountant1@test.com',
            'password' => bcrypt('password'),
        ]);

        User::create([
            'name' => 'Accountant Two',
            'email' => 'accountant2@test.com',
            'password' => bcrypt('password'),
        ]);
    }
}
