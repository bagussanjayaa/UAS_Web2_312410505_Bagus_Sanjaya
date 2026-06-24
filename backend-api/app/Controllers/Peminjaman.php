<?php

namespace App\Controllers;

use App\Models\PeminjamanModel;
use App\Models\BukuModel;
use CodeIgniter\RESTful\ResourceController;

class Peminjaman extends ResourceController
{
    protected $modelName = PeminjamanModel::class;
    protected $format = 'json';

    public function index()
    {
        $db = \Config\Database::connect();

        $data = $db->table('peminjaman')
        ->select('
            peminjaman.*,
            users.nama,
            users.username,
            buku.judul
        ')
        ->join(
            'users',
            'users.id = peminjaman.user_id',
            'left'
        )
        ->join(
            'buku',
            'buku.id = peminjaman.buku_id',
            'left'
        )
        ->orderBy('peminjaman.id','DESC')
        ->get()
        ->getResultArray();

        return $this->respond($data);
    }

    public function create()
    {
        $data = $this->request->getJSON(true);

        $bukuModel = new BukuModel();

        $buku = $bukuModel->find(
            $data['buku_id']
        );

        if(!$buku)
        {
            return $this->fail(
                'Buku tidak ditemukan'
            );
        }

        if($buku['stok'] <= 0)
        {
            return $this->fail(
                'Stok buku habis'
            );
        }

        $this->model->insert([
            'user_id' => $data['user_id'],
            'buku_id' => $data['buku_id'],
            'tanggal_pinjam' => date('Y-m-d'),
            'status' => 'Dipinjam'
        ]);

        $bukuModel->update(
            $data['buku_id'],
            [
                'stok' => $buku['stok'] - 1
            ]
        );

        return $this->respond([
            'message' => 'Berhasil meminjam buku'
        ]);
    }

    public function kembalikan($id)
    {
        $pinjam =
        $this->model->find($id);

        if(!$pinjam)
        {
            return $this->failNotFound();
        }

        $this->model->update(
            $id,
            [
                'status' => 'Dikembalikan',
                'tanggal_kembali' => date('Y-m-d')
            ]
        );

        $bukuModel = new BukuModel();

        $buku =
        $bukuModel->find(
            $pinjam['buku_id']
        );

        $bukuModel->update(
            $pinjam['buku_id'],
            [
                'stok' => $buku['stok'] + 1
            ]
        );

        return $this->respond([
            'message' =>
            'Buku berhasil dikembalikan'
        ]);
    }

    public function user($id)
    {
        $db = \Config\Database::connect();

        $data = $db->table('peminjaman')
        ->select('
            peminjaman.*,
            buku.judul,
            buku.cover
        ')
        ->join(
            'buku',
            'buku.id = peminjaman.buku_id'
        )
        ->where(
            'peminjaman.user_id',
            $id
        )
        ->get()
        ->getResultArray();

        return $this->respond($data);
    }
}