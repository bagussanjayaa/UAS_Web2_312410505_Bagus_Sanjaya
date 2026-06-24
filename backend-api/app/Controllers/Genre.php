<?php

namespace App\Controllers;

use App\Models\GenreModel;
use CodeIgniter\RESTful\ResourceController;

class Genre extends ResourceController
{
    protected $modelName = GenreModel::class;
    protected $format = 'json';

    public function index()
    {
        return $this->respond(
            $this->model->findAll()
        );
    }

    public function create()
    {
        $data = $this->request->getPost();

        if(empty($data))
        {
            $data = $this->request->getJSON(true);
        }

        $this->model->insert([
            'nama_genre' => $data['nama_genre']
        ]);

        return $this->respond([
            'status' => true,
            'message' => 'Genre berhasil ditambahkan'
        ]);
    }

    public function update($id = null)
    {
        $data = $this->request->getJSON(true);

        $this->model->update($id,[
            'nama_genre'=>$data['nama_genre']
        ]);

        return $this->respond([
            'status'=>true,
            'message'=>'Genre berhasil diupdate'
        ]);
    }

    public function delete($id = null)
    {
        $this->model->delete($id);

        return $this->respond([
            'status'=>true,
            'message'=>'Genre berhasil dihapus'
        ]);
    }
}