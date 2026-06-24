<?php

namespace App\Controllers;

use App\Models\AnggotaModel;
use CodeIgniter\RESTful\ResourceController;

class Anggota extends ResourceController
{
    protected $modelName = AnggotaModel::class;
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
            'nama'=>$data['nama'],
            'email'=>$data['email'],
            'telepon'=>$data['telepon']
        ]);

        return $this->respond([
            'status'=>true,
            'message'=>'Anggota berhasil ditambah'
        ]);
    }

    public function update($id = null)
    {
        $this->model->update($id,[
            'nama'     => $this->request->getVar('nama'),
            'email'    => $this->request->getVar('email'),
            'telepon'  => $this->request->getVar('telepon')
        ]);

        return $this->respond([
            'message'=>'Data berhasil diupdate'
        ]);
    }

    public function delete($id=null)
    {
        $this->model->delete($id);

        return $this->respond([
            'status'=>true,
            'message'=>'Anggota berhasil dihapus'
        ]);
    }
}