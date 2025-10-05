<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use App\Models\Todo;

class TodoDestroyTest extends TestCase
{
    use RefreshDatabase; // Ensure a fresh database for each test

    /**
     * Test deleting a todo item.
     */
    public function test_can_delete_todo(): void
    {
        $todo = Todo::factory()->create();

        $response = $this->deleteJson("api/todos/{$todo->id}");

        $response->assertStatus(204); // No content

        $this->assertDatabaseMissing('todos', ['id' => $todo->id]);
    }

    /**
     * Test deleting a non-existent todo item.
     */
    public function test_delete_non_existent_todo(): void
    {
        $response = $this->deleteJson('api/todos/999'); 

        $response->assertStatus(404); // Not found
    }
}
