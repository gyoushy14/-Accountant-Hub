<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Accountant extends Model
{
    protected $fillable = ['name', 'title', 'bio', 'rating', 'avatar_url', 'is_active'];

    protected function casts(): array
    {
        return [
            'rating' => 'decimal:2',
            'is_active' => 'boolean',
        ];
    }
}
