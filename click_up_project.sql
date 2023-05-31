-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: May 30, 2023 at 12:25 PM
-- Server version: 10.3.38-MariaDB-0ubuntu0.20.04.1
-- PHP Version: 8.1.18

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `click_up_project`
--

-- --------------------------------------------------------

--
-- Table structure for table `invite_members`
--

CREATE TABLE `invite_members` (
  `id` int(11) NOT NULL,
  `project_id` int(11) NOT NULL COMMENT 'Project Id refer project table',
  `admin_id` int(11) NOT NULL COMMENT 'user id refer users table',
  `member` varchar(255) DEFAULT NULL,
  `invite_token` longtext DEFAULT NULL,
  `status` tinyint(4) NOT NULL DEFAULT 0,
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `projects`
--

CREATE TABLE `projects` (
  `id` int(11) NOT NULL,
  `admin_id` int(11) NOT NULL,
  `project_name` varchar(255) NOT NULL,
  `description` longtext DEFAULT NULL,
  `members` longtext DEFAULT NULL,
  `status` tinyint(4) NOT NULL DEFAULT 0 COMMENT '0=Progress,1=Completed',
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `projects`
--

INSERT INTO `projects` (`id`, `admin_id`, `project_name`, `description`, `members`, `status`, `created_at`, `updated_at`) VALUES
(1, 1, 'Test Project 1', 'Desc sdfasd', '[{\"value\":1,\"label\":\"Vijay Amule\"},{\"value\":3,\"label\":\"Mohan\"},{\"value\":2,\"label\":\"Test\"}]', 0, '2023-05-09 15:21:45', '2023-05-09 15:21:45'),
(3, 1, 'Test Project 2', 'dkjsdfjs', '[{\"value\":1,\"label\":\"Vijay\"},{\"value\":3,\"label\":\"Mohan\"},{\"value\":2,\"label\":\"Test\"}]', 0, '2023-05-09 18:03:56', '2023-05-09 18:03:56'),
(4, 3, 'Test Project For M', 'Test Project For M', '[]', 0, '2023-05-11 12:57:24', '2023-05-11 12:57:24'),
(9, 1, 'Test Project 3', 'dsa', '[{\"value\":1,\"label\":\"Vijay\"}]', 0, '2023-05-12 18:17:50', '2023-05-12 18:17:50');

-- --------------------------------------------------------

--
-- Table structure for table `tasks`
--

CREATE TABLE `tasks` (
  `id` int(11) NOT NULL,
  `project_id` int(11) NOT NULL,
  `assign_user_id` int(11) NOT NULL,
  `assign_to_user_id` int(11) NOT NULL,
  `task_name` varchar(255) NOT NULL,
  `description` longtext DEFAULT NULL,
  `expected_date_time` datetime DEFAULT NULL,
  `complete_date_time` datetime DEFAULT NULL,
  `status` varchar(255) NOT NULL DEFAULT 'assigned' COMMENT 'assigned,in-progress,completed',
  `comments` longtext DEFAULT NULL,
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tasks`
--

INSERT INTO `tasks` (`id`, `project_id`, `assign_user_id`, `assign_to_user_id`, `task_name`, `description`, `expected_date_time`, `complete_date_time`, `status`, `comments`, `created_at`, `updated_at`) VALUES
(1, 1, 1, 3, 'Test', 'Tfsdf sdfsdf', '2023-05-09 15:36:00', NULL, 'in-progress', NULL, '2023-05-09 15:34:16', '2023-05-09 15:34:16'),
(3, 3, 1, 3, 'Test Task Info', 'd;sdfjs dsfjsdf sfl;dsajfsdf', '2023-05-09 18:07:00', NULL, 'in-progress', NULL, '2023-05-09 18:04:34', '2023-05-09 18:04:34'),
(5, 4, 3, 1, 'Test Task For M', 'Test Task For M', '2023-05-11 14:59:00', NULL, 'assigned', NULL, '2023-05-11 12:57:53', '2023-05-11 12:57:53'),
(6, 1, 1, 1, 'This is demo task', 'task description', '2023-05-22 18:14:00', NULL, 'completed', NULL, '2023-05-22 15:12:00', '2023-05-22 15:12:00'),
(8, 1, 1, 1, 'fdg dfgd sdfsd', 'fgh dgfd', '2023-05-22 20:19:00', NULL, 'in-progress', NULL, '2023-05-22 15:14:19', '2023-05-22 15:14:19'),
(9, 1, 1, 2, 'Test Task By Long Desc', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.\n\nContrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of \"de Finibus Bonorum et Malorum\" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, \"Lorem ipsum dolor sit amet..\", comes from a line in section 1.10.32.\n\nThe standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from \"de Finibus Bonorum et Malorum\" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.', '2023-05-31 18:02:00', NULL, 'in-progress', NULL, '2023-05-29 18:02:53', '2023-05-29 18:02:53'),
(10, 1, 1, 1, 'Test22', 'In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before final copy is available.', '2023-05-30 17:58:00', NULL, 'completed', NULL, '2023-05-30 11:52:34', '2023-05-30 11:52:34'),
(11, 3, 1, 1, 'Task 333', 'In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before final copy is available.', '2023-05-31 17:00:00', NULL, 'assigned', NULL, '2023-05-30 11:53:06', '2023-05-30 11:53:06'),
(12, 1, 1, 1, 'Task 44', 'In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before final copy is available.', '2023-06-01 16:58:00', NULL, 'assigned', NULL, '2023-05-30 11:53:27', '2023-05-30 11:53:27'),
(13, 9, 1, 1, 'Task 555', 'In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before final copy is available.', '2023-06-11 16:57:00', NULL, 'in-progress', NULL, '2023-05-30 11:53:51', '2023-05-30 11:53:51'),
(14, 3, 1, 1, 'Task 666', 'In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before final copy is available.', '2023-06-16 08:00:00', NULL, 'completed', NULL, '2023-05-30 11:54:21', '2023-05-30 11:54:21'),
(15, 1, 1, 1, 'Task 87', 'sdefrs sdfs', '2023-06-08 18:22:00', NULL, 'assigned', NULL, '2023-05-30 12:16:57', '2023-05-30 12:16:57');

-- --------------------------------------------------------

--
-- Table structure for table `task_comments`
--

CREATE TABLE `task_comments` (
  `id` int(11) NOT NULL,
  `task_id` bigint(20) NOT NULL,
  `user_id` bigint(20) NOT NULL,
  `comment` longtext DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `task_comments`
--

INSERT INTO `task_comments` (`id`, `task_id`, `user_id`, `comment`) VALUES
(8, 5, 3, 'This task complete ASAP.'),
(23, 1, 1, 'Please provide the task description properly.');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `avatar` varchar(255) DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `status` tinyint(4) NOT NULL DEFAULT 1 COMMENT '1=Active,0=Block',
  `created_at` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `avatar`, `name`, `email`, `password`, `status`, `created_at`) VALUES
(1, NULL, 'Vijay', 'vijay@gmail.com', '$2b$10$Q9Vl/E/.zq/eecT61Kk6o.OlP/PPWe32C/72eYzaRjG4U.yTEmxkG', 1, '2023-05-01 10:49:18'),
(2, NULL, 'Test', 'test@gmail.com', '$2b$10$DWSYYyrk2ZiGPkWX8xDJd.drQfOxT/aeE/HDcmmi87w.d97iktIQ6', 1, '2023-05-01 12:07:23'),
(3, NULL, 'Mohan', 'mohan@gmail.com', '$2b$10$N8RfwuJS/VUagq6Y9PNRcOiImhSXf9OdYYhpq03HfHDbqRx3Mdvxi', 1, '2023-05-08 18:43:31');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `invite_members`
--
ALTER TABLE `invite_members`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `projects`
--
ALTER TABLE `projects`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tasks`
--
ALTER TABLE `tasks`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `task_comments`
--
ALTER TABLE `task_comments`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `invite_members`
--
ALTER TABLE `invite_members`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT for table `projects`
--
ALTER TABLE `projects`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `tasks`
--
ALTER TABLE `tasks`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `task_comments`
--
ALTER TABLE `task_comments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
