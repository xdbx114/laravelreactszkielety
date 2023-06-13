<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\User;
use App\Models\Wpis;

class Comment extends Model
{
    use HasFactory;

    protected $fillable = ['content', 'user_id', 'wpis_id'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function wpis()
    {
        return $this->belongsTo(Wpis::class);
    }
}
