<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Bid extends Model
{
    protected $fillable = [
        'job_id',
        'user_id',
        'proposed_price',
        'estimated_delivery_time',
        'cover_letter',
        'experience_summary',
    ];

    protected function casts(): array
    {
        return [
            'proposed_price' => 'decimal:2',
        ];
    }

    public function job()
    {
        return $this->belongsTo(Job::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
