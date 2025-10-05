<?php

namespace Tests\Unit;

use App\Models\Todo;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class TodoModelTest extends TestCase
{
    use RefreshDatabase;

    /**
     * Test that creating a Todo with null description converts it to an empty string.
     */
    public function test_converts_null_description_to_empty_string_on_create(): void
    {
        $todo = Todo::create([
            'title' => 'Test Todo',
            'description' => null,
        ]);

        $this->assertSame('', $todo->description);
        $this->assertDatabaseHas('todos', [
            'id' => $todo->id,
            'description' => '',
        ]);
    }

    /**
     * Test that updating a Todo with null description converts it to an empty string.
     */

    public function test_converts_null_description_to_empty_string_on_update(): void
    {
        $todo = Todo::create([
            'title' => 'Test Todo',
            'description' => 'Initial Description',
        ]);

        $todo->update(['description' => null]);

        $this->assertSame('', $todo->description);
        $this->assertDatabaseHas('todos', [
            'id' => $todo->id,
            'description' => '',
        ]);
    }
}