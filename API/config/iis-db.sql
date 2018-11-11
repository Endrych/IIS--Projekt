-- phpMyAdmin SQL Dump
-- version 4.8.3
-- https://www.phpmyadmin.net/
--
-- Počítač: 127.0.0.1
-- Vytvořeno: Ned 11. lis 2018, 01:46
-- Verze serveru: 10.1.36-MariaDB
-- Verze PHP: 7.2.10

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
-- Struktura tabulky `article`
--

CREATE TABLE `article` (
  `Id` int(11) NOT NULL,
  `Author` varchar(45) COLLATE utf8_czech_ci NOT NULL,
  `Header` tinytext COLLATE utf8_czech_ci NOT NULL,
  `Content` text COLLATE utf8_czech_ci NOT NULL,
  `Image` longtext COLLATE utf8_czech_ci,
  `Game` int(11) NOT NULL,
  `Created` date NOT NULL,
  `Deleted` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_czech_ci;

-- --------------------------------------------------------

--
-- Struktura tabulky `game`
--

CREATE TABLE `game` (
  `Id` int(11) NOT NULL,
  `Name` tinytext COLLATE utf16_czech_ci NOT NULL,
  `Keyname` varchar(45) COLLATE utf16_czech_ci NOT NULL,
  `ReleaseDate` date DEFAULT NULL,
  `Description` text COLLATE utf16_czech_ci,
  `PublisherId` int(11) DEFAULT NULL,
  `Icon` text COLLATE utf16_czech_ci,
  `Image` longtext COLLATE utf16_czech_ci,
  `Video` tinytext COLLATE utf16_czech_ci,
  `Deleted` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf16 COLLATE=utf16_czech_ci;

-- --------------------------------------------------------

--
-- Struktura tabulky `game_genre`
--

CREATE TABLE `game_genre` (
  `Id` int(11) NOT NULL,
  `Name` varchar(55) COLLATE utf16_czech_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf16 COLLATE=utf16_czech_ci;

-- --------------------------------------------------------

--
-- Struktura tabulky `game_genre_games`
--

CREATE TABLE `game_genre_games` (
  `GameId` int(11) NOT NULL,
  `GameGenreId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf16 COLLATE=utf16_czech_ci;

-- --------------------------------------------------------

--
-- Struktura tabulky `invite`
--

CREATE TABLE `invite` (
  `User` varchar(45) COLLATE utf8_czech_ci NOT NULL,
  `Team` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_czech_ci;

-- --------------------------------------------------------

--
-- Struktura tabulky `publisher`
--

CREATE TABLE `publisher` (
  `Id` int(11) NOT NULL,
  `Name` varchar(255) COLLATE utf16_czech_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf16 COLLATE=utf16_czech_ci;

-- --------------------------------------------------------

--
-- Struktura tabulky `team`
--

CREATE TABLE `team` (
  `Id` int(11) NOT NULL,
  `Name` tinytext COLLATE utf8_czech_ci NOT NULL,
  `Description` text COLLATE utf8_czech_ci NOT NULL,
  `Owner` varchar(45) COLLATE utf8_czech_ci NOT NULL,
  `Logo` longtext COLLATE utf8_czech_ci,
  `Created` date NOT NULL,
  `Deleted` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_czech_ci;

-- --------------------------------------------------------

--
-- Struktura tabulky `user`
--

CREATE TABLE `user` (
  `Nickname` varchar(45) CHARACTER SET utf8 COLLATE utf8_czech_ci NOT NULL,
  `Firstname` varchar(45) CHARACTER SET utf8 COLLATE utf8_czech_ci NOT NULL,
  `Lastname` varchar(45) CHARACTER SET utf8 COLLATE utf8_czech_ci NOT NULL,
  `Email` varchar(255) CHARACTER SET utf8 COLLATE utf8_czech_ci NOT NULL,
  `Phone` varchar(20) CHARACTER SET utf8 COLLATE utf8_czech_ci DEFAULT NULL,
  `Password` varchar(255) CHARACTER SET utf8 COLLATE utf8_czech_ci NOT NULL,
  `Salt` varchar(255) CHARACTER SET utf8 COLLATE utf8_czech_ci NOT NULL,
  `Team` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf16 COLLATE=utf16_czech_ci;

--
-- Klíče pro exportované tabulky
--

--
-- Klíče pro tabulku `article`
--
ALTER TABLE `article`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `Author` (`Author`),
  ADD KEY `Game` (`Game`);

--
-- Klíče pro tabulku `game`
--
ALTER TABLE `game`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `PublisherId` (`PublisherId`);

--
-- Klíče pro tabulku `game_genre`
--
ALTER TABLE `game_genre`
  ADD PRIMARY KEY (`Id`);

--
-- Klíče pro tabulku `game_genre_games`
--
ALTER TABLE `game_genre_games`
  ADD PRIMARY KEY (`GameId`,`GameGenreId`),
  ADD KEY `GameGenreId` (`GameGenreId`);

--
-- Klíče pro tabulku `invite`
--
ALTER TABLE `invite`
  ADD PRIMARY KEY (`User`,`Team`),
  ADD KEY `Team` (`Team`);

--
-- Klíče pro tabulku `publisher`
--
ALTER TABLE `publisher`
  ADD PRIMARY KEY (`Id`);

--
-- Klíče pro tabulku `team`
--
ALTER TABLE `team`
  ADD PRIMARY KEY (`Id`);

--
-- Klíče pro tabulku `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`Nickname`),
  ADD KEY `Team` (`Team`);

--
-- AUTO_INCREMENT pro tabulky
--

--
-- AUTO_INCREMENT pro tabulku `article`
--
ALTER TABLE `article`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pro tabulku `game`
--
ALTER TABLE `game`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pro tabulku `game_genre`
--
ALTER TABLE `game_genre`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pro tabulku `publisher`
--
ALTER TABLE `publisher`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pro tabulku `team`
--
ALTER TABLE `team`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Omezení pro exportované tabulky
--

--
-- Omezení pro tabulku `article`
--
ALTER TABLE `article`
  ADD CONSTRAINT `article_ibfk_1` FOREIGN KEY (`Game`) REFERENCES `game` (`Id`),
  ADD CONSTRAINT `article_ibfk_2` FOREIGN KEY (`Author`) REFERENCES `user` (`Nickname`);

--
-- Omezení pro tabulku `game`
--
ALTER TABLE `game`
  ADD CONSTRAINT `game_ibfk_1` FOREIGN KEY (`PublisherId`) REFERENCES `publisher` (`Id`);

--
-- Omezení pro tabulku `game_genre_games`
--
ALTER TABLE `game_genre_games`
  ADD CONSTRAINT `game_genre_games_ibfk_1` FOREIGN KEY (`GameGenreId`) REFERENCES `game_genre` (`Id`),
  ADD CONSTRAINT `game_genre_games_ibfk_2` FOREIGN KEY (`GameId`) REFERENCES `game` (`Id`);

--
-- Omezení pro tabulku `invite`
--
ALTER TABLE `invite`
  ADD CONSTRAINT `invite_ibfk_1` FOREIGN KEY (`User`) REFERENCES `user` (`Nickname`),
  ADD CONSTRAINT `invite_ibfk_2` FOREIGN KEY (`Team`) REFERENCES `team` (`Id`);

--
-- Omezení pro tabulku `user`
--
ALTER TABLE `user`
  ADD CONSTRAINT `user_ibfk_1` FOREIGN KEY (`Team`) REFERENCES `team` (`Id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
