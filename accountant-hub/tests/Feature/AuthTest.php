<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class AuthTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();
        User::create([
            'name' => 'Test Accountant',
            'email' => 'test@test.com',
            'password' => bcrypt('password'),
        ]);
    }

    public function test_user_can_register()
    {
        $response = $this->postJson('/api/v1/auth/register', [
            'name' => 'New User',
            'email' => 'new@test.com',
            'password' => 'password',
            'password_confirmation' => 'password',
        ]);

        $response->assertStatus(201)
            ->assertJson([
                'success' => true,
                'message' => 'Account created successfully.',
            ])
            ->assertJsonStructure([
                'success', 'message', 'data' => ['user' => ['id', 'name', 'email'], 'token']
            ]);
    }

    public function test_user_can_login()
    {
        $response = $this->postJson('/api/v1/auth/login', [
            'email' => 'test@test.com',
            'password' => 'password',
        ]);

        $response->assertStatus(200)
            ->assertJson([
                'success' => true,
                'message' => 'Logged in successfully.',
            ])
            ->assertJsonStructure([
                'success', 'message', 'data' => ['user' => ['id', 'name', 'email'], 'token']
            ]);
    }

    public function test_login_with_invalid_credentials_fails()
    {
        $response = $this->postJson('/api/v1/auth/login', [
            'email' => 'test@test.com',
            'password' => 'wrong-password',
        ]);

        $response->assertStatus(422)
            ->assertJson([
                'success' => false,
                'message' => 'Validation failed.',
            ]);
    }

    public function test_authenticated_user_can_access_me()
    {
        $user = User::first();
        $token = $user->createToken('test-token')->plainTextToken;

        $response = $this->withHeader('Authorization', "Bearer $token")
            ->getJson('/api/v1/auth/me');

        $response->assertStatus(200)
            ->assertJson([
                'success' => true,
                'data' => ['id' => $user->id, 'name' => $user->name, 'email' => $user->email],
            ]);
    }

    public function test_unauthenticated_user_cannot_access_me()
    {
        $response = $this->getJson('/api/v1/auth/me');

        $response->assertStatus(401)
            ->assertJson([
                'success' => false,
                'message' => 'Unauthenticated.',
            ]);
    }
}
