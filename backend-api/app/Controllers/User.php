<?php

namespace App\Controllers;

use App\Models\UserModel;
use CodeIgniter\RESTful\ResourceController;

class User extends ResourceController
{
    protected $modelName = UserModel::class;
    protected $format = 'json';

    public function index()
    {
        return $this->respond(
            $this->model->findAll()
        );
    }

    public function create()
    {
        $this->model->insert([
            'nama'      => $this->request->getPost('nama'),
            'username'  => $this->request->getPost('username'),
            'password'  => password_hash(
                $this->request->getPost('password'),
                PASSWORD_DEFAULT
            ),
            'role'      => $this->request->getPost('role')
        ]);

        return $this->respond([
            'message' => 'User berhasil ditambah'
        ]);
    }

    public function update($id = null)
    {
        $data = [
            'nama' => $this->request->getPost('nama'),
            'username' => $this->request->getPost('username'),
            'role' => $this->request->getPost('role')
        ];

        if($this->request->getPost('password'))
        {
            $data['password'] =
                password_hash(
                    $this->request->getPost('password'),
                    PASSWORD_DEFAULT
                );
        }

        $this->model->update(
            $id,
            $data
        );

        return $this->respond([
            'message'=>'User berhasil diupdate'
        ]);
    }

    public function delete($id = null)
    {
        $this->model->delete($id);

        return $this->respond([
            'message'=>'User berhasil dihapus'
        ]);
    }
}