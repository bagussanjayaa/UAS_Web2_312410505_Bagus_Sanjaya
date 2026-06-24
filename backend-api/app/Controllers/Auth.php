<?php

namespace App\Controllers;

use App\Models\UserModel;
use CodeIgniter\RESTful\ResourceController;

class Auth extends ResourceController
{
    public function login()
    {
        $model = new UserModel();

        $data = $this->request->getPost();

        if(empty($data))
        {
            $data = $this->request->getJSON(true);
        }

        $user = $model
            ->where('username',$data['username'])
            ->first();

        if(!$user)
        {
            return $this->failUnauthorized('Username salah');
        }

        if(
            !password_verify(
                $data['password'],
                $user['password']
            )
        )
        {
            return $this->failUnauthorized('Password salah');
        }

        $token = bin2hex(random_bytes(32));

        $model->update(
            $user['id'],
            ['token'=>$token]
        );

        return $this->respond([
            'status'=>true,
            'id'=>$user['id'],
            'token'=>$token,
            'role'=>$user['role'],
            'nama'=>$user['nama']
        ]);
    }
}