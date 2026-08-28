<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CaisTeamMember extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'role',
        'description',
        'photo',
        'order',
        'active',
    ];

    protected $casts = [
        'active' => 'boolean',
        'order' => 'integer',
    ];

    protected $appends = [
        'photo_url',
    ];

    public function getPhotoUrlAttribute(): ?string
    {
        if (!$this->photo) {
            return null;
        }

        if (str_starts_with($this->photo, 'http') || str_starts_with($this->photo, '/')) {
            return $this->photo;
        }

        return \Illuminate\Support\Facades\Storage::url($this->photo);
    }
}
