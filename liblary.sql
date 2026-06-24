-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 24, 2026 at 08:37 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `liblary`
--

-- --------------------------------------------------------

--
-- Table structure for table `anggota`
--

CREATE TABLE `anggota` (
  `id` int(11) NOT NULL,
  `nama` varchar(150) DEFAULT NULL,
  `email` varchar(150) DEFAULT NULL,
  `telepon` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `anggota`
--

INSERT INTO `anggota` (`id`, `nama`, `email`, `telepon`) VALUES
(1, 'budi', 'budi@gmail.com', '08123456789'),
(2, 'bagus', 'bagus@gmail.com', '08012345678'),
(3, 'habil', 'habil@gmail.com', '08987654321'),
(4, 'rafi', 'rafi@gmail.com', '01234567898'),
(5, 'aldi', 'aldi@gmail.com', '08881234567'),
(6, 'ayu', 'ayu@gmail.com', '088876543219');

-- --------------------------------------------------------

--
-- Table structure for table `buku`
--

CREATE TABLE `buku` (
  `id` int(11) NOT NULL,
  `judul` varchar(200) DEFAULT NULL,
  `penulis` varchar(150) DEFAULT NULL,
  `penerbit` varchar(150) DEFAULT NULL,
  `genre_id` int(11) DEFAULT NULL,
  `cover` varchar(255) DEFAULT NULL,
  `stok` int(11) DEFAULT NULL,
  `deskripsi` varchar(1000) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `buku`
--

INSERT INTO `buku` (`id`, `judul`, `penulis`, `penerbit`, `genre_id`, `cover`, `stok`, `deskripsi`, `created_at`) VALUES
(1, 'One Piece Vol 1', 'Eiichoro Oda', 'Shueisha', 4, '1781803853_6d86c430b98cccbab263.jpg', 9, 'Petualangan Luffy', '2026-06-15 16:25:17'),
(3, 'Naruto Vol 1', 'Masashi Kishimoto', 'Shueisha', 3, '1781541314_7e5420950bca95a4e6c2.webp', 14, 'Ninja Konoha', '2026-06-15 16:35:14'),
(4, 'Jujutsu Kaisen 0', 'Gege Akutami', 'MAPPA', 3, '1781802345_864808d356552c20bf80.jpg', 5, 'Dunia penyihir yang dipenuhi kutukan', '2026-06-18 17:05:45'),
(5, 'Kaoruko Hana Wa Rin To Saku Vol1', 'Saka Mikami', '', 1, '1781898257_7ea03fcfd38cc13a7122.jpg', 4, 'The Fragrant Flower Blooms With Dignity-Kaoru & Rin atau Kaoru Hana wa Rin to Saku berkisah mengenai SMA Chidori, tempat berkumpulnya anak-anak bodoh dan cowok berandalan, berlokasi tepat di samping Akademi Kikyo, SMA khusus putri yang kaya dan cerdas. Murid kedua sekolah tersebut saling membenci. Rintaro Tsumugi, anak kelas 2 SMA Chidori yang bertampang seram, bertemu gadis siswi Kikyo yang datang ke toko kue keluarganya, Kaoruko Waguri. Semakin lama menghabiskan waktu bersama Kaoruko, Rintaro semakin merasa nyaman. Akan tetapi, Rintaro takut akan reaksi gadis itu jika mengetahui dia murid Chidori yang dibenci murid Kikyo.', '2026-06-19 19:44:17'),
(6, 'Kaoruko Hana Wa Rin To Saku Vol2', 'Saka Mikami', '', 1, '1781899610_c258d50d2c7ad4092de2.jpg', 4, 'Lanjutan vol 1', '2026-06-19 20:06:50'),
(7, 'One Piece Vol 2', 'Eiichoro Oda', 'Shueisha', 4, '1781899806_fb71f3c19877ba06704e.jpg', 10, 'Petualangan Luffy', '2026-06-19 20:10:06'),
(8, 'Detektif Conan Premium Vol. 1', 'Gosho Aoyama', 'Goodreads', 2, '1781900153_07e5fa57b898c5ef4f54.jpg', 4, 'Mengungkap banyak misteri bersama detektif conan', '2026-06-19 20:15:53'),
(9, 'Detektif Conan Premium Vol. 2', 'Gosho Aoyama', 'Goodreads', 2, '1781900446_c5e795aca7380fc9a696.jpg', 4, 'Lanjutan dari Vol. 1', '2026-06-19 20:20:46'),
(10, 'Detektif Conan Premium Vol. 3', 'Gosho Aoyama', 'Goodreads', 2, '1781900573_95e5c43213bc6ce861d5.jpg', 5, 'Lanjutan dari Vol. 2', '2026-06-19 20:22:53');

-- --------------------------------------------------------

--
-- Table structure for table `genre`
--

CREATE TABLE `genre` (
  `id` int(11) NOT NULL,
  `nama_genre` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `genre`
--

INSERT INTO `genre` (`id`, `nama_genre`) VALUES
(1, 'Romance'),
(2, 'Mystery'),
(3, 'Action'),
(4, 'Adventure'),
(5, 'Comedy'),
(6, 'Horror');

-- --------------------------------------------------------

--
-- Table structure for table `peminjaman`
--

CREATE TABLE `peminjaman` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `buku_id` int(11) DEFAULT NULL,
  `tanggal_pinjam` date DEFAULT NULL,
  `tanggal_kembali` date DEFAULT NULL,
  `status` enum('Dipinjam','Dikembalikan') DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `peminjaman`
--

INSERT INTO `peminjaman` (`id`, `user_id`, `buku_id`, `tanggal_pinjam`, `tanggal_kembali`, `status`) VALUES
(1, 1, 3, '2026-06-16', '2026-06-18', 'Dikembalikan'),
(2, 1, 1, '2026-06-16', '2026-06-18', 'Dikembalikan'),
(4, 1, 1, '2026-06-16', '2026-06-18', 'Dikembalikan'),
(5, NULL, 1, '2026-06-16', NULL, 'Dipinjam'),
(6, NULL, 3, '2026-06-16', NULL, 'Dipinjam'),
(7, 2, 3, '2026-06-18', '2026-06-21', 'Dikembalikan'),
(8, 3, 4, '2026-06-19', '2026-06-21', 'Dikembalikan'),
(9, 3, 1, '2026-06-19', '2026-06-21', 'Dikembalikan'),
(22, 4, 3, '2026-06-19', '2026-06-21', 'Dikembalikan'),
(23, 4, 4, '2026-06-19', '2026-06-21', 'Dikembalikan'),
(24, 2, 8, '2026-06-19', '2026-06-21', 'Dikembalikan'),
(25, 2, 1, '2026-06-19', '2026-06-21', 'Dikembalikan'),
(26, 2, 7, '2026-06-21', '2026-06-24', 'Dikembalikan'),
(27, 2, 6, '2026-06-21', NULL, 'Dipinjam'),
(28, 2, 5, '2026-06-21', NULL, 'Dipinjam'),
(29, 7, 3, '2026-06-21', NULL, 'Dipinjam'),
(30, 7, 8, '2026-06-21', NULL, 'Dipinjam'),
(31, 7, 9, '2026-06-21', NULL, 'Dipinjam'),
(32, 2, 1, '2026-06-24', NULL, 'Dipinjam');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(100) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `token` text DEFAULT NULL,
  `nama` varchar(150) DEFAULT NULL,
  `role` enum('admin','anggota') DEFAULT NULL,
  `email` varchar(150) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `token`, `nama`, `role`, `email`) VALUES
(1, 'admin', '$2y$10$afYvX9htbBZc4RMDyKkWHe.EW2uFC8h3ilKsBlbhZGbqgvU21c.PS', 'e945ee59a6fea2dede357ec1fdcdb6c2516f68152b3893e6f6f9066353ca5b45', 'Administrator', 'admin', 'admin@gmail.com'),
(2, 'bagus', '$2y$10$2XdKdg1AsX6UgVQ/I8PkYOaLQZMMU96uKqe7Y8ab.M5bRuWhYhU8K', 'c3f440e509381c061111796c3e8f6d3b43a92c0723fb954d0df523f90b9d2515', 'Bagus Sanjaya', 'anggota', 'bagus@gmail.com'),
(3, 'budi', '$2y$10$HCDBWCtAI19Eu5uqb2str.Pa50Bycbt6lRdVCIf2uFTeaAqfvyGke', 'ac187ac8cce6c4cb8bb56a4d401cc4a892778c76e3a5e5e39289445f6104dbb9', 'Budi Susanto', 'anggota', NULL),
(4, 'habil', '$2y$10$Th7NaMGQSbISfOi.MnIFTOrWr.LnS0bT0sQtU3X9tZe9MSnMJtC36', '21ab8ffc186a0d3e597fbf873aa868c56fc0a82a6c367df7b2f1583b5afec48f', 'Habil Saiful', 'anggota', NULL),
(5, 'aldi', '$2y$10$aSnaLNFUn5f0xWQCHbl.vOQxEOVgunZNd0kM4H2xZo1WfXpte8IVa', NULL, 'Aldi Taher', 'anggota', NULL),
(6, 'rafi', '$2y$10$qR4Ehy.VD2zBNgPDilVycePd9BWWAAxurZelgoODHHZ5p63fu.APq', NULL, 'Rafi Ahmad', 'anggota', NULL),
(7, 'ayu', '$2y$10$UyCR71x52w1S5ylYb4iloun5ClYpgZY30UFTOqeQWmAMXXYPpKCfy', 'eb20de172eef4d42c038531f0d14f67f1302db3ea9af9aba7dcc870392548ec8', 'Ayu Ting Ting', 'anggota', NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `anggota`
--
ALTER TABLE `anggota`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `buku`
--
ALTER TABLE `buku`
  ADD PRIMARY KEY (`id`),
  ADD KEY `genre_id` (`genre_id`);

--
-- Indexes for table `genre`
--
ALTER TABLE `genre`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `peminjaman`
--
ALTER TABLE `peminjaman`
  ADD PRIMARY KEY (`id`),
  ADD KEY `buku_id` (`buku_id`),
  ADD KEY `peminjaman_ibfk_1` (`user_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `anggota`
--
ALTER TABLE `anggota`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `buku`
--
ALTER TABLE `buku`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `genre`
--
ALTER TABLE `genre`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `peminjaman`
--
ALTER TABLE `peminjaman`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `buku`
--
ALTER TABLE `buku`
  ADD CONSTRAINT `buku_ibfk_1` FOREIGN KEY (`genre_id`) REFERENCES `genre` (`id`);

--
-- Constraints for table `peminjaman`
--
ALTER TABLE `peminjaman`
  ADD CONSTRAINT `peminjaman_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `peminjaman_ibfk_2` FOREIGN KEY (`buku_id`) REFERENCES `buku` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
