<?php

namespace App\Controllers;

use CodeIgniter\RESTful\ResourceController;

class Dashboard extends ResourceController
{
    public function index()
    {
        $db = \Config\Database::connect();

        $data = [

            'total_buku' =>
                $db->table('buku')->countAllResults(),

            'total_anggota' =>
                $db->table('anggota')->countAllResults(),

            'total_users' =>
                $db->table('users')->countAllResults(),

            'total_peminjaman' =>
                $db->table('peminjaman')->countAllResults()

        ];

        return $this->respond($data);
    }
}