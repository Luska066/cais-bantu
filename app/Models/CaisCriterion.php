<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CaisCriterion extends Model
{
    use HasFactory;

    protected $table = 'cais_criteria';

    protected $fillable = [
        'title',
        'description',
        'icon',
        'badge',
        'active',
        'order',
    ];

    protected $casts = [
        'active' => 'boolean',
        'order' => 'integer',
    ];
}
