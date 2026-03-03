-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 03, 2026 at 06:09 PM
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
-- Database: `minehr`
--

-- --------------------------------------------------------

--
-- Table structure for table `career`
--

CREATE TABLE `career` (
  `id` int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `full_name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `phone` varchar(20) NOT NULL,
  `location` varchar(100) DEFAULT NULL,
  `resume` varchar(255) NOT NULL,
  `created_at` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `career`
--

INSERT INTO `career` (`id`, `full_name`, `email`, `phone`, `location`, `resume`, `created_at`) VALUES
(1, 'Harshil Thakrar', 'harshilthakrar33@gmail.com', '6351143540', 'Vadodara', '1771671805600-615100382-invoice-INV-2024-007.pdf', '2026-02-21 16:33:25');

-- --------------------------------------------------------

--
-- Table structure for table `contacts`
--

CREATE TABLE `contacts` (
  `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `name` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `contact_number` varchar(255) DEFAULT NULL,
  `company` varchar(255) DEFAULT NULL,
  `message` text DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `contacts`
--

INSERT INTO `contacts` (`id`, `name`, `email`, `contact_number`, `company`, `message`, `created_at`, `updated_at`) VALUES
(1, 'Harshil Thakrar', 'thakrarharshil0@gmail.com', '6351112096', 'test', 'test mode', '2026-02-19 01:57:57', '2026-02-19 01:57:57'),
(2, 'dev', 'dev@gmail.com', '8530015003', 'Test', 'test', '2026-02-21 06:20:41', NULL),
(3, 'dev', 'dev@gmail.com', '8530015003', 'test', 'test', '2026-02-21 06:24:57', NULL),
(4, 'Harshil Thakrar', 'smit@gmail.com', '4594949549', 'smit', 'dfhudhgusrehgf', '2026-02-21 06:27:55', NULL),
(5, 'Harshil Thakrar', 'smit@gmail.com', '6976787868', 'test', 'demooo', '2026-02-21 06:30:44', NULL),
(6, 'Harshil Thakrar', 'smit@gmail.com', '8346584385', 'test', 'demoo', '2026-02-21 06:32:54', '2026-02-21 06:32:54'),
(7, 'Harsh ', 'Harshchavda980@gmail.com', '7016606014', 'MineHR solutions', 'Want HRMS', '2026-02-21 06:44:45', '2026-02-21 06:44:45'),
(8, 'Harsh ', 'Harshchavda980@gmail.com', '7016606014', 'MineHR solutions', 'Want HRMS', '2026-02-21 06:44:47', '2026-02-21 06:44:47'),
(9, 'dev', 'dev@gmail.com', '6351112096', 'test', 'fgdhdghd', '2026-02-21 08:28:23', '2026-02-21 08:28:23'),
(10, 'dev', 'dev@gmail.com', '6351112096', 'test', 'fgdhdghd', '2026-02-21 08:28:27', '2026-02-21 08:28:27');

-- --------------------------------------------------------

--
-- Table structure for table `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `uuid` varchar(255) NOT NULL,
  `connection` text NOT NULL,
  `queue` text NOT NULL,
  `payload` longtext NOT NULL,
  `exception` longtext NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp(),
  UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `migration` varchar(255) NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '2014_10_12_000000_create_users_table', 1),
(2, '2014_10_12_100000_create_password_reset_tokens_table', 1),
(3, '2019_08_19_000000_create_failed_jobs_table', 1),
(4, '2019_12_14_000001_create_personal_access_tokens_table', 2),
(5, '2026_02_14_135931_add_contact_number_to_contacts_table', 3);

-- --------------------------------------------------------

--
-- Table structure for table `password_reset_tokens`
--

CREATE TABLE `password_reset_tokens` (
  `email` varchar(255) NOT NULL PRIMARY KEY,
  `token` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `personal_access_tokens`
--

CREATE TABLE `personal_access_tokens` (
  `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `tokenable_type` varchar(255) NOT NULL,
  `tokenable_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `token` varchar(64) NOT NULL,
  `abilities` text DEFAULT NULL,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `remember_token` varchar(100) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at?` timestamp NULL DEFAULT NULL,
  UNIQUE KEY `users_email_unique` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
