<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class TodoStoreTest extends TestCase
{
    use RefreshDatabase; // Ensure a fresh database for each test

    /**
     * Test creating a new todo item.
     */
    public function test_can_create_todo(): void
    {
        $data = [
            'title' => 'New Todo Item',
            'is_completed' => false,
        ];

        $response = $this->postJson('api/todos', $data);

        $response->assertStatus(201)
                 ->assertJsonFragment($data);

        $this->assertDatabaseHas('todos', $data);
    }

    /**
     * Test validation error when required fields are missing.
     */
    public function test_missing_title_on_create_todo(): void
    {
        $data = [
            'description' => 'Not title todo', // Description is required
            'is_completed' => false, 
        ];

        $response = $this->postJson('api/todos', $data);

        $response->assertStatus(422)
                 ->assertJsonValidationErrors(['title']);
    }

    /**
     * Test validation error when 'completed' field is not a boolean.
     */
    public function test_invalid_completed_value(): void
    {
        $data = [
            'title' => 'Todo with invalid is_completed',
            'is_completed' => 'not-a-boolean', // Invalid value
        ];

        $response = $this->postJson('api/todos', $data);

        $response->assertStatus(422)
                 ->assertJsonValidationErrors(['is_completed']);
    }

    /**
     * Test creating a todo item without the 'completed' field defaults to false.
     */
    public function test_default_completed_value(): void
    {
        $data = [
            'title' => 'Todo without is_completed field',
        ];

        $response = $this->postJson('api/todos', $data);
        $response->assertStatus(201)
                 ->assertJsonFragment([
                     'title' => 'Todo without is_completed field',
                     'is_completed' => false, // Default value
                 ]);

        $this->assertDatabaseHas('todos', [
            'title' => 'Todo without is_completed field',
            'is_completed' => false,
        ]);
    }
}
