<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use App\Models\Todo;

class TodoShowTest extends TestCase
{
    use RefreshDatabase; // Ensure a fresh database for each test
    public function test_can_show_todo(): void
    {

        $todo = Todo::factory()->create();

        $response = $this->getJson('/api/todos/' . $todo->id);

        $response->assertOk()
                ->assertJson($todo->toArray());
    }

    public function test_show_non_existent_todo(): void
    {
        $response = $this->getJson('/api/todos/999');

        $response->assertStatus(404); // Not found
    }
}
