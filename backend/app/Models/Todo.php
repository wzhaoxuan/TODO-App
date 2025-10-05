<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;


class Todo extends Model
{
    use HasFactory;

    protected $fillable = ['title', 'description', 'is_completed'];

    protected $attributes = [
        'description' => '',
        'is_completed' => false,
    ];

    /**
     * Normalize description when it's set so the application never stores null.
     * This runs for mass assignment (e.g. Todo::create($data)) and direct sets.
     */
    public function setDescriptionAttribute($value)
    {
        // Convert null to empty string and cast to string for safety
        $this->attributes['description'] = $value === null ? '' : (string) $value;
    }

    /**
     * Ensure a get never returns null (defensive convenience).
     */
    public function getDescriptionAttribute($value)
    {
        return $value === null ? '' : $value;
    }
}
