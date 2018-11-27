SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;


CREATE TABLE `article` (
  `Id` int(11) NOT NULL,
  `Author` varchar(45) COLLATE utf8_czech_ci NOT NULL,
  `Header` tinytext COLLATE utf8_czech_ci NOT NULL,
  `Content` text COLLATE utf8_czech_ci NOT NULL,
  `Image` longtext COLLATE utf8_czech_ci,
  `Game` int(11) DEFAULT NULL,
  `Created` date NOT NULL,
  `Deleted` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_czech_ci;

CREATE TABLE `game` (
  `Id` int(11) NOT NULL,
  `Name` tinytext COLLATE utf16_czech_ci NOT NULL,
  `Keyname` varchar(45) COLLATE utf16_czech_ci NOT NULL,
  `ReleaseDate` tinytext COLLATE utf16_czech_ci,
  `Description` text COLLATE utf16_czech_ci,
  `PublisherId` int(11) DEFAULT NULL,
  `Icon` text COLLATE utf16_czech_ci,
  `Image` longtext COLLATE utf16_czech_ci,
  `Video` tinytext COLLATE utf16_czech_ci,
  `Deleted` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf16 COLLATE=utf16_czech_ci;

CREATE TABLE `game_genre` (
  `Id` int(11) NOT NULL,
  `Name` varchar(55) COLLATE utf16_czech_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf16 COLLATE=utf16_czech_ci;

INSERT INTO `game_genre` (`Id`, `Name`) VALUES
(1, 'FPS'),
(2, 'Strategy'),
(3, 'Sport');

CREATE TABLE `game_genre_games` (
  `GameId` int(11) NOT NULL,
  `GameGenreId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf16 COLLATE=utf16_czech_ci;

CREATE TABLE `invite` (
  `Id` int(11) NOT NULL,
  `User` varchar(45) COLLATE utf8_czech_ci NOT NULL,
  `Team` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_czech_ci;

CREATE TABLE `publisher` (
  `Id` int(11) NOT NULL,
  `Name` varchar(255) COLLATE utf16_czech_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf16 COLLATE=utf16_czech_ci;

CREATE TABLE `team` (
  `Id` int(11) NOT NULL,
  `Name` tinytext COLLATE utf8_czech_ci NOT NULL,
  `Description` text COLLATE utf8_czech_ci,
  `Owner` varchar(45) COLLATE utf8_czech_ci NOT NULL,
  `Logo` longtext COLLATE utf8_czech_ci,
  `Created` date NOT NULL,
  `Deleted` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_czech_ci;

CREATE TABLE `user` (
  `Nickname` varchar(45) CHARACTER SET utf8 COLLATE utf8_czech_ci NOT NULL,
  `Firstname` varchar(45) CHARACTER SET utf8 COLLATE utf8_czech_ci NOT NULL,
  `Lastname` varchar(45) CHARACTER SET utf8 COLLATE utf8_czech_ci NOT NULL,
  `Email` varchar(255) CHARACTER SET utf8 COLLATE utf8_czech_ci NOT NULL,
  `Phone` varchar(20) CHARACTER SET utf8 COLLATE utf8_czech_ci DEFAULT NULL,
  `Image` longtext COLLATE utf16_czech_ci,
  `Password` varchar(255) CHARACTER SET utf8 COLLATE utf8_czech_ci NOT NULL,
  `Salt` varchar(255) CHARACTER SET utf8 COLLATE utf8_czech_ci NOT NULL,
  `Team` int(11) DEFAULT NULL,
  `Admin` tinyint(4) NOT NULL,
  `Deactivated` tinyint(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf16 COLLATE=utf16_czech_ci;


ALTER TABLE `article`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `Author` (`Author`),
  ADD KEY `Game` (`Game`);

ALTER TABLE `game`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `PublisherId` (`PublisherId`);

ALTER TABLE `game_genre`
  ADD PRIMARY KEY (`Id`);

ALTER TABLE `game_genre_games`
  ADD PRIMARY KEY (`GameId`,`GameGenreId`),
  ADD KEY `GameGenreId` (`GameGenreId`);

ALTER TABLE `invite`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `Team` (`Team`),
  ADD KEY `User` (`User`);

ALTER TABLE `publisher`
  ADD PRIMARY KEY (`Id`);

ALTER TABLE `team`
  ADD PRIMARY KEY (`Id`);

ALTER TABLE `user`
  ADD PRIMARY KEY (`Nickname`),
  ADD KEY `Team` (`Team`);


ALTER TABLE `article`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT;

ALTER TABLE `game`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT;

ALTER TABLE `game_genre`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

ALTER TABLE `invite`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT;

ALTER TABLE `publisher`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT;

ALTER TABLE `team`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT;


ALTER TABLE `article`
  ADD CONSTRAINT `article_ibfk_1` FOREIGN KEY (`Game`) REFERENCES `game` (`Id`),
  ADD CONSTRAINT `article_ibfk_2` FOREIGN KEY (`Author`) REFERENCES `user` (`Nickname`);

ALTER TABLE `game`
  ADD CONSTRAINT `game_ibfk_1` FOREIGN KEY (`PublisherId`) REFERENCES `publisher` (`Id`);

ALTER TABLE `game_genre_games`
  ADD CONSTRAINT `game_genre_games_ibfk_1` FOREIGN KEY (`GameGenreId`) REFERENCES `game_genre` (`Id`),
  ADD CONSTRAINT `game_genre_games_ibfk_2` FOREIGN KEY (`GameId`) REFERENCES `game` (`Id`);

ALTER TABLE `invite`
  ADD CONSTRAINT `invite_ibfk_1` FOREIGN KEY (`Team`) REFERENCES `team` (`Id`),
  ADD CONSTRAINT `invite_ibfk_2` FOREIGN KEY (`User`) REFERENCES `user` (`Nickname`);

ALTER TABLE `user`
  ADD CONSTRAINT `user_ibfk_1` FOREIGN KEY (`Team`) REFERENCES `team` (`Id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
