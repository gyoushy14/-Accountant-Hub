<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Job extends Model
{
    protected $fillable = [
        'title',
        'client_name',
        'description',
        'short_description',
        'budget_min',
        'budget_max',
        'deadline',
        'required_skills',
        'delivery_time',
        'status',
        'job_category_id',
        'attachments',
        'posted_at',
    ];

    protected function casts(): array
    {
        return [
            'required_skills' => 'array',
            'attachments' => 'array',
            'budget_min' => 'decimal:2',
            'budget_max' => 'decimal:2',
            'deadline' => 'date',
            'posted_at' => 'datetime',
        ];
    }

    public function category()
    {
        return $this->belongsTo(JobCategory::class, 'job_category_id');
    }

    public function bids()
    {
        return $this->hasMany(Bid::class);
    }

    public function userBid()
    {
        return $this->hasOne(Bid::class)->where('user_id', auth()->id());
    }
}
