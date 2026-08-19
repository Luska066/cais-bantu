<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CaisNews extends Model
{
    use HasFactory;

    protected $table = 'cais_news';

    protected $fillable = [
        'slug',
        'title',
        'category',
        'date_label',
        'description',
        'content',
        'published',
    ];

    protected $casts = [
        'published' => 'boolean',
    ];
}
