<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use App\Models\Todo;

class TodoUpdateTest extends TestCase
{
    use RefreshDatabase; // Ensure a fresh database for each test

    /**
     * Test updating a new todo item.
     */
    public function test_can_update_todo(): void
    {
        $todo = Todo::factory()->create([
            'title' => 'Initial Title',
            'is_completed' => false,
        ]);

        $updateData = [
            'title' => 'Updated Title',
            'description' => 'Add description',
            'is_completed' => true,
        ];

        $response = $this->putJson("api/todos/{$todo->id}", $updateData);

        $response->assertStatus(200)
                 ->assertJsonFragment($updateData);

        $this->assertDatabaseHas('todos', $updateData);
    }

    /**
     * Test validation error when required fields are missing during update.
     */
    public function test_missing_title_on_update_todo(): void
    {
        $todo = Todo::factory()->create([
            'title' => 'Initial Title',
            'is_completed' => false,
        ]);

        $updateData = [
            'description' => 'No title provided',
            'is_completed' => true,
        ];

        $response = $this->putJson("api/todos/{$todo->id}", $updateData);

        $response->assertStatus(422)
                 ->assertJsonValidationErrors(['title']);
    }


    /**
     * Test updating description to empty string.
     */
    public function test_empty_description_on_update_todo(): void
    {
        $todo = Todo::factory()->create([
            'title' => 'Initial Title',
            'description' => 'Initial Description',
            'is_completed' => false,
        ]);

        $updateData = [
            'title' => 'Updated Title',
            'description' => '', 
            'is_completed' => false,
        ];

        $response = $this->putJson("api/todos/{$todo->id}", $updateData);

        $response->assertStatus(200)
                 ->assertJsonFragment($updateData);

        $this->assertDatabaseHas('todos', $updateData);
    }

    /**
     * Test validation error when 'completed' field is not a boolean during update.
     */
    public function test_invalid_completed_value_on_update(): void
    {
        $todo = Todo::factory()->create([
            'title' => 'Initial Title',
            'is_completed' => false,
        ]);

        $updateData = [
            'title' => 'Updated Title',
            'is_completed' => 'not-a-boolean', // Invalid value
        ];

        $response = $this->putJson("api/todos/{$todo->id}", $updateData);

        $response->assertStatus(422)
                 ->assertJsonValidationErrors(['is_completed']);
    }

    /**
     * Test updating a non-existent todo item.
     */
    public function test_update_non_existent_todo(): void
    {
        $updateData = [
            'title' => 'Updated Title',
            'is_completed' => true,
        ];

        $response = $this->putJson("api/todos/999", $updateData); 

        $response->assertStatus(404);
    }
}
