<?php

namespace App\Controllers;

use App\Models\BukuModel;
use CodeIgniter\RESTful\ResourceController;

class Buku extends ResourceController
{
    protected $modelName = BukuModel::class;
    protected $format = 'json';

    public function index()
    {
        $db = \Config\Database::connect();

        $data = $db->table('buku')
            ->select('
                buku.*,
                genre.nama_genre
            ')
            ->join(
                'genre',
                'genre.id = buku.genre_id',
                'left'
            )
            ->get()
            ->getResultArray();

        foreach($data as &$item)
        {
            $item['cover_url'] =
                base_url('uploads/'.$item['cover']);
        }

        return $this->respond($data);
    }

    public function show($id = null)
    {
        $buku = $this->model
            ->select('buku.*, genre.nama_genre')
            ->join('genre', 'genre.id = buku.genre_id')
            ->where('buku.id', $id)
            ->first();

        if(!$buku)
        {
            return $this->failNotFound();
        }

        $buku['cover_url'] =
            base_url('uploads/'.$buku['cover']);

        return $this->respond($buku);
    }

    public function create()
    {
        $cover = $this->request->getFile('cover');

        $namaCover = 'default.jpg';

        if($cover && $cover->isValid())
        {
            $namaCover = $cover->getRandomName();

            $cover->move(
                ROOTPATH.'public/uploads',
                $namaCover
            );
        }

        $this->model->insert([
            'judul' => $this->request->getPost('judul'),
            'penulis' => $this->request->getPost('penulis'),
            'penerbit' => $this->request->getPost('penerbit'),
            'deskripsi' => $this->request->getPost('deskripsi'),
            'stok' => $this->request->getPost('stok'),
            'genre_id' => $this->request->getPost('genre_id'),
            'cover' => $namaCover
        ]);

        return $this->respond([
            'message' => 'Buku berhasil ditambah'
        ]);
    }

    public function update($id = null)
    {
        $buku = $this->model->find($id);

        if(!$buku)
        {
            return $this->failNotFound();
        }

        $data = [
            'judul'     => $this->request->getPost('judul'),
            'penulis'   => $this->request->getPost('penulis'),
            'penerbit'  => $this->request->getPost('penerbit'),
            'deskripsi' => $this->request->getPost('deskripsi'),
            'stok'      => $this->request->getPost('stok'),
            'genre_id'  => $this->request->getPost('genre_id')
        ];

        $cover = $this->request->getFile('cover');

        if($cover && $cover->isValid())
        {
            $namaCover = $cover->getRandomName();

            $cover->move(
                ROOTPATH.'public/uploads',
                $namaCover
            );

            $data['cover'] = $namaCover;
        }

        $this->model->update(
            $id,
            $data
        );

        return $this->respond([
            'message' => 'Buku berhasil diupdate'
        ]);
    }

    public function delete($id = null)
    {
        $this->model->delete($id);

        return $this->respond([
            'message' => 'Buku berhasil dihapus'
        ]);
    }
}