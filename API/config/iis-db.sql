-- phpMyAdmin SQL Dump
-- version 4.8.2
-- https://www.phpmyadmin.net/
--
-- Počítač: 127.0.0.1
-- Vytvořeno: Ned 30. zář 2018, 09:27
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

--
-- Vypisuji data pro tabulku `game`
--

INSERT INTO `game` (`Id`, `Name`, `Keyname`, `ReleaseDate`, `Description`, `PublisherId`, `Icon`, `Image`, `Video`, `Deleted`) VALUES
(1, 'Counter strike: Global offensive', 'CSGO', '2012-09-27', 'Best game ever', 6, NULL, 'neconeco', 'www.youtube.com/watch?v=2XH5_qafR8k', 0),
(2, 'Counter strike: Global offensive', 'CSGO1', '2012-09-27', 'Best game ever', 9, NULL, 'neconeco', 'www.youtube.com/watch?v=2XH5_qafR8k', 0),
(3, 'Counter strike: Global offensive', 'CSGO2', '2012-09-27', 'Best game ever', 9, NULL, 'neconeco', 'www.youtube.com/watch?v=2XH5_qafR8k', 0),
(5, 'Counter strike: Global offensive', 'CSGO3', '2012-09-27', 'Best game ever', 9, NULL, 'neconeco', 'www.youtube.com/watch?v=2XH5_qafR8k', 0),
(10, 'Counter strike: Global offensive', 'CSGO4', '2012-09-27', 'Best game ever', 9, NULL, 'neconeco', 'www.youtube.com/watch?v=2XH5_qafR8k', 0),
(11, 'Counter strike: Global offensive', 'CSGO5', '2012-09-27', 'Best game ever', 9, NULL, 'neconeco', 'www.youtube.com/watch?v=2XH5_qafR8k', 0),
(13, 'Counter strike: Global offensive', 'CSGO6', '2012-09-27', 'Best game ever', 9, NULL, 'neconeco', 'www.youtube.com/watch?v=2XH5_qafR8k', 0),
(14, 'Counter strike: Global offensive', 'CSGO7', '2012-09-27', 'Best game ever', 9, NULL, 'neconeco', 'www.youtube.com/watch?v=2XH5_qafR8k', 0),
(15, 'Counter strike: Global offensive', 'CSGO8', '2012-09-27', 'Best game ever', NULL, NULL, 'neconeco', 'www.youtube.com/watch?v=2XH5_qafR8k', 1),
(16, 'Counter strike: Global offensive', 'CSGO9', '2012-09-27', 'Best game ever', NULL, NULL, 'uuLMhh==', 'www.youtube.com/watch?v=2XH5_qafR8k', 0),
(17, 'Counter strike: Global offensive', 'CSGO8', '2012-09-27', 'Best game ever', NULL, NULL, 'uuLMhh==', 'www.youtube.com/watch?v=2XH5_qafR8k', 0);

-- --------------------------------------------------------

--
-- Struktura tabulky `game_genre`
--

CREATE TABLE `game_genre` (
  `Id` int(11) NOT NULL,
  `Name` varchar(55) COLLATE utf16_czech_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf16 COLLATE=utf16_czech_ci;

--
-- Vypisuji data pro tabulku `game_genre`
--

INSERT INTO `game_genre` (`Id`, `Name`) VALUES
(1, 'FPS'),
(2, 'Strategy'),
(3, 'Sport');

-- --------------------------------------------------------

--
-- Struktura tabulky `game_genre_games`
--

CREATE TABLE `game_genre_games` (
  `GameId` int(11) NOT NULL,
  `GameGenreId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf16 COLLATE=utf16_czech_ci;

--
-- Vypisuji data pro tabulku `game_genre_games`
--

INSERT INTO `game_genre_games` (`GameId`, `GameGenreId`) VALUES
(5, 3),
(10, 1),
(10, 2),
(10, 3),
(11, 1),
(11, 2),
(11, 3),
(13, 1),
(13, 2),
(13, 3),
(14, 1),
(14, 2),
(14, 3),
(15, 1),
(15, 2),
(15, 3),
(16, 1),
(16, 2),
(16, 3),
(17, 1),
(17, 2),
(17, 3);

-- --------------------------------------------------------

--
-- Struktura tabulky `publisher`
--

CREATE TABLE `publisher` (
  `Id` int(11) NOT NULL,
  `Name` varchar(255) COLLATE utf16_czech_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf16 COLLATE=utf16_czech_ci;

--
-- Vypisuji data pro tabulku `publisher`
--

INSERT INTO `publisher` (`Id`, `Name`) VALUES
(6, 'Blizzard Entertainment'),
(9, 'Blizzard Entertainment 1');

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
-- Klíče pro tabulku `publisher`
--
ALTER TABLE `publisher`
  ADD PRIMARY KEY (`Id`);

--
-- Klíče pro tabulku `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`Nickname`);

--
-- AUTO_INCREMENT pro tabulky
--

--
-- AUTO_INCREMENT pro tabulku `game`
--
ALTER TABLE `game`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT pro tabulku `game_genre`
--
ALTER TABLE `game_genre`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT pro tabulku `publisher`
--
ALTER TABLE `publisher`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- Omezení pro exportované tabulky
--

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
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
