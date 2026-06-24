# UAS_Web2_312410505_BagusSanjaya

## **E-Library: Sistem Informasi Perpustakaan Berbasis Web dengan Role Admin dan Anggota**

### Deskripsi Singkat

E-Library merupakan aplikasi sistem informasi perpustakaan berbasis web yang digunakan untuk mengelola data buku, genre, anggota, user, serta proses peminjaman buku secara digital.

Aplikasi ini dibuat dengan konsep **client-server** menggunakan **Backend CodeIgniter 4 REST API** dan **Frontend Vue.js dengan TailwindCSS**. Sistem memiliki dua jenis pengguna yaitu:

1. **Admin**

   * Mengelola data buku (CRUD)
   * Mengelola genre buku (CRUD)
   * Mengelola data anggota (CRUD)
   * Mengelola user dan hak akses
   * Mengelola transaksi peminjaman dan pengembalian buku
   * Melihat statistik sistem melalui dashboard admin

2. **Anggota**

   * Melihat koleksi buku
   * Mencari buku berdasarkan judul dan genre
   * Melihat detail buku
   * Melakukan peminjaman buku
   * Melihat riwayat peminjaman

---

# Desain Database

Database yang digunakan adalah **MySQL** dengan perancangan tabel melalui **phpMyAdmin Designer**.

Relasi antar tabel terdiri dari:

### Tabel User

Menyimpan data akun pengguna sistem.

Atribut:

* id
* nama
* username
* password
* role

### Tabel Anggota

Menyimpan data anggota perpustakaan.

Atribut:

* id
* nama
* email
* telepon

### Tabel Genre

Menyimpan kategori atau jenis buku.

Atribut:

* id
* nama_genre

### Tabel Buku

Menyimpan informasi koleksi buku.

Atribut:

* id
* judul
* penulis
* penerbit
* deskripsi
* stok
* cover
* genre_id

Relasi:

```
Genre
 |
 | 1:N
 |
Buku
 |
 | 1:N
 |
Peminjaman
 |
 | N:1
 |
User
```

### Tabel Peminjaman

Menyimpan transaksi peminjaman buku.

Atribut:

* id
* user_id
* buku_id
* tanggal_pinjam
* tanggal_kembali
* status

Screenshot:
**(Lampirkan screenshot phpMyAdmin Designer yang menunjukkan relasi tabel)**

---

# Pengujian API

Pengujian API dilakukan menggunakan **Postman**.

Sistem menggunakan proteksi token untuk membatasi akses endpoint tertentu.

Contoh pengujian:

Request:

```
GET localhost:8080/dashboard
```

Tanpa mengirim token:

Response:

```
401 Unauthorized
```

Hal ini menunjukkan bahwa endpoint dashboard admin hanya dapat diakses oleh user yang sudah melakukan login dan memiliki token autentikasi.

Screenshot:
**(Lampirkan screenshot Postman ketika muncul error 401 akibat token tidak dikirim)**

---

# Tampilan Antarmuka Aplikasi

Aplikasi menggunakan framework **TailwindCSS** untuk membuat tampilan modern dan responsive.

## 1. Halaman Login

Fitur:

* Input username
* Input password
* Validasi login
* Redirect berdasarkan role user

Screenshot:
**(Lampirkan halaman login)**

---

## 2. Dashboard Admin

Dashboard admin menampilkan:

* Total buku
* Total anggota
* Total user
* Total peminjaman

Selain itu terdapat menu:

* Kelola Buku
* Kelola Genre
* Kelola Anggota
* Kelola User
* Kelola Peminjaman

Screenshot:
**(Lampirkan dashboard admin)**

---

## 3. Form Modal Tambah/Edit Data

Sistem menggunakan modal form untuk proses input dan perubahan data.

Contoh:

### Tambah Buku

Input:

* Judul
* Penulis
* Penerbit
* Genre
* Stok
* Deskripsi
* Cover

### Edit Data

Admin dapat memperbarui data tanpa berpindah halaman.

Screenshot:
**(Lampirkan modal tambah/edit)**

---

## 4. Visualisasi Data Menggunakan TailwindCSS

Data ditampilkan dalam bentuk tabel dengan fitur:

* Search
* Pagination
* CRUD
* Tombol aksi edit dan hapus

Contoh:

Tabel Buku:

| ID |    Cover    | Judul  | Penulis | Penerbit | Genre  | Stok |    Aksi     |
| -- |  ---------- | ------ | ------- | -------- | ------ | ---- | ----------- |
| 1  | naruto.jpg  | Naruto | Masashi | Shueisha | Action |  10  | Edit / Hapus|

Screenshot:
**(Lampirkan tampilan tabel dengan TailwindCSS)**

---

# Petunjuk Instalasi

## A. Menjalankan Backend (CodeIgniter 4)

1. Clone/download project backend

2. Masuk ke folder backend:

```
cd backend-api
```

3. Install dependency:

```
composer install
```

4. Buat database MySQL:

```
elibrary
```

5. Import file database melalui phpMyAdmin.

6. Atur koneksi database pada:

```
.env
```

Contoh:

```
database.default.hostname = localhost
database.default.database = elibrary
database.default.username = root
database.default.password =
```

7. Jalankan server:

```
php spark serve
```

Backend berjalan pada:

```
http://localhost:8080
```

---

## B. Menjalankan Frontend (Vue.js)

1. Masuk folder frontend:

```
cd frontend-vue
```

2. Install package:

```
npm install
```

3. Jalankan aplikasi:

```
npm run dev
```

Frontend berjalan pada:

```
http://localhost:3000
```

---

# Teknologi yang Digunakan

## Backend

* CodeIgniter 4
* REST API
* MySQL
* JWT/Token Authentication

## Frontend

* Vue.js
* Axios
* TailwindCSS

## Database

* MySQL
* phpMyAdmin

---

# Link Demo

Demo aplikasi:

```
(Tambahkan link hosting/demo aplikasi)
```

# Link Video Presentasi

Video presentasi:

```
(Tambahkan link Youtube/Drive video presentasi)
```

---

# Kesimpulan

Aplikasi E-Library berhasil membangun sistem perpustakaan digital yang mempermudah proses pengelolaan data buku dan transaksi peminjaman. Dengan adanya sistem berbasis web ini, admin dapat melakukan pengelolaan data secara lebih cepat dan terstruktur, sedangkan anggota dapat mencari dan meminjam buku secara mudah melalui tampilan yang responsive dan modern.
