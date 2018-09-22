-- phpMyAdmin SQL Dump
-- version 4.8.2
-- https://www.phpmyadmin.net/
--
-- Počítač: 127.0.0.1
-- Vytvořeno: Sob 22. zář 2018, 11:24
-- Verze serveru: 10.1.34-MariaDB
-- Verze PHP: 7.2.7

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Databáze: `iis-db`
--

-- --------------------------------------------------------

--
-- Struktura tabulky `user`
--

CREATE TABLE `user` (
  `Nickname` varchar(45) COLLATE utf16_czech_ci NOT NULL,
  `Firstname` varchar(45) COLLATE utf16_czech_ci NOT NULL,
  `Lastname` varchar(45) COLLATE utf16_czech_ci NOT NULL,
  `Email` varchar(255) COLLATE utf16_czech_ci NOT NULL,
  `Phone` varchar(20) COLLATE utf16_czech_ci DEFAULT NULL,
  `Password` varchar(255) COLLATE utf16_czech_ci NOT NULL,
  `Salt` varchar(255) COLLATE utf16_czech_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf16 COLLATE=utf16_czech_ci;

--
-- Vypisuji data pro tabulku `user`
--

INSERT INTO `user` (`Nickname`, `Firstname`, `Lastname`, `Email`, `Phone`, `Password`, `Salt`) VALUES
('RyKkOlaN', 'David', 'Endrych', 'david.endrych@gmail.com', '123456789', '$2b$10$GPkpGForzXKxjzUgEA.z8.Pm3OyVIF5xCbFl09G/09ZoQrfQ1CyIG', '$2b$10$GPkpGForzXKxjzUgEA.z8.');

--
-- Klíče pro exportované tabulky
--

--
-- Klíče pro tabulku `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`Nickname`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
