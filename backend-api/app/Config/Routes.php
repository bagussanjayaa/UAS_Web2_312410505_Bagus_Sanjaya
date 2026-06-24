<?php

use CodeIgniter\Router\RouteCollection;

/** @var RouteCollection $routes */
$routes->get('/', 'Home::index');
$routes->get('/test','Test::index');

$routes->options('(:any)', static function () {
    return response();
});

$routes->post('login','Auth::login');
$routes->get('genre',
    'Genre::index',
    ['filter'=>'auth']
);

$routes->post(
    'genre',
    'Genre::create',
    ['filter'=>'auth']
);

$routes->post(
    'genre/(:num)',
    'Genre::update/$1',
    ['filter'=>'auth']
);

$routes->delete(
    'genre/(:num)',
    'Genre::delete/$1',
    ['filter'=>'auth']
);

$routes->get('buku', 'Buku::index');
$routes->get('buku/(:num)', 'Buku::show/$1');

$routes->post(
    'buku',
    'Buku::create',
    ['filter'=>'auth']
);

$routes->delete(
    'buku/(:num)',
    'Buku::delete/$1',
    ['filter'=>'auth']
);

$routes->get(
    'anggota',
    'Anggota::index',
    ['filter'=>'auth']
);

$routes->post(
    'anggota',
    'Anggota::create',
    ['filter'=>'auth']
);

$routes->delete(
    'anggota/(:num)',
    'Anggota::delete/$1',
    ['filter'=>'auth']
);

$routes->get(
    'dashboard',
    'Dashboard::index',
    ['filter'=>'auth']
);

$routes->get(
    'peminjaman',
    'Peminjaman::index',
    ['filter'=>'auth']
);

$routes->post(
    'peminjaman',
    'Peminjaman::create',
    ['filter'=>'auth']
);

$routes->delete(
    'peminjaman/(:num)',
    'Peminjaman::delete/$1',
    ['filter'=>'auth']
);

$routes->get(
'peminjaman/user/(:num)',
'Peminjaman::user/$1',
['filter'=>'auth']
);

$routes->post(
    'buku/(:num)',
    'Buku::update/$1',
    ['filter'=>'auth']
);

$routes->post(
    'anggota/(:num)',
    'Anggota::update/$1',
    ['filter'=>'auth']
);

$routes->get(
    'user',
    'User::index',
    ['filter'=>'auth']
);

$routes->post(
    'user',
    'User::create',
    ['filter'=>'auth']
);

$routes->post(
    'user/(:num)',
    'User::update/$1',
    ['filter'=>'auth']
);

$routes->delete(
    'user/(:num)',
    'User::delete/$1',
    ['filter'=>'auth']
);

$routes->post(
    'peminjaman/kembali/(:num)',
    'Peminjaman::kembalikan/$1',
    ['filter'=>'auth']
);