<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CaisCourse extends Model
{
    use HasFactory;

    protected $fillable = [
        'slug',
        'title',
        'category',
        'icon',
        'hours',
        'badge_color',
        'description',
        'topics',
        'opportunities',
        'active',
        'order',
    ];

    protected $casts = [
        'topics' => 'array',
        'active' => 'boolean',
        'order' => 'integer',
    ];
}
