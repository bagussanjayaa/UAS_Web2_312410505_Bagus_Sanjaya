<?php

namespace App\Models;

use CodeIgniter\Model;

class BukuModel extends Model
{
    protected $table = 'buku';

    protected $primaryKey = 'id';

    protected $allowedFields = [
        'judul',
        'penulis',
        'penerbit',
        'cover',
        'deskripsi',
        'stok',
        'genre_id'
    ];

    protected $returnType = 'array';
}