<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use App\Models\Todo;
use Tests\TestCase;

class TodoDestroyAllTest extends TestCase
{
     use RefreshDatabase; // Ensure a fresh database for each test

    /**
     * Test deleting all todo items.
     */
    public function test_can_delete_all_todos(): void
    {
        Todo::factory()->count(5)->create();

        $response = $this->deleteJson('api/todos');

        $response->assertStatus(204); // No content

        $this->assertDatabaseCount('todos', 0);
    }
}
