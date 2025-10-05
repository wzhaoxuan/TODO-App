<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use App\Models\Todo;

class TodoIndexTest extends TestCase
{
    use RefreshDatabase;
    
    /**
     * Test listing all todo items.
     */
    public function test_can_list_todos(): void
    {
        Todo::factory()->count(5)->create();

        $response = $this->getJson('todos');

        $response->assertStatus(200)
                 ->assertJsonCount(5);
    }
}
