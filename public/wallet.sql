-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost:8889
-- Generation Time: Jul 14, 2023 at 07:51 AM
-- Server version: 5.7.39
-- PHP Version: 7.4.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `wallet`
--

-- --------------------------------------------------------

--
-- Table structure for table `transactions`
--

CREATE TABLE `transactions` (
  `id` int(11) NOT NULL,
  `sender` varchar(42) NOT NULL,
  `receiver` varchar(42) NOT NULL,
  `amount` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `transactions`
--

INSERT INTO `transactions` (`id`, `sender`, `receiver`, `amount`) VALUES
(1, '0x9e73e12B0A4c4ba4f4B346A7c23D657d79C7e90b', '0x9e73e12B0A4c4ba4f4B346A7c23D657d79C7e90d', '27.00'),
(2, '0x9e73e12B0A4c4ba4f4B346A7c23D657d79C7e90b', '0x9e73e12B0A4c4ba4f4B346A7c23D657d79C7e90d', '27.00'),
(3, '0x9e73e12B0A4c4ba4f4B346A7c23D657d79C7e90b', '0x9e73e12B0A4c4ba4f4B346A7c23D657d79C7e90d', '27.00');

-- --------------------------------------------------------

--
-- Table structure for table `wallets`
--

CREATE TABLE `wallets` (
  `id` int(11) NOT NULL,
  `address` varchar(42) NOT NULL,
  `balance` decimal(10,2) DEFAULT '100.00'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `wallets`
--

INSERT INTO `wallets` (`id`, `address`, `balance`) VALUES
(1, '0x9e73e12B0A4c4ba4f4B346A7c23D657d79C7e90b', '46.00'),
(2, '0x9e73e12B0A4c4ba4f4B346A7c23D657d79C7e90d', '154.00'),
(3, '0x9e73e12B0A4c4ba4f4B346A7c23D657d79C7e90f', '100.00'),
(4, '0x9e73e12B0A4c4ba4f4B346A7c23D657d79C7e90H', '100.00');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `transactions`
--
ALTER TABLE `transactions`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `wallets`
--
ALTER TABLE `wallets`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `transactions`
--
ALTER TABLE `transactions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `wallets`
--
ALTER TABLE `wallets`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
