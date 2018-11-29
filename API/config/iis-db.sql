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
(2, 'Strategie'),
(3, 'Sportovní'),
(4, 'Adventura'),
(5, 'Akční'),
(6, 'Arkáda'),
(7, 'Karetní'),
(8, 'Logická hra'),
(9, 'RPG'),
(10, 'Simulátor'),
(11, 'Horor'),
(12, 'Závodní'),
(13, 'MMORPG');

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

CREATE TABLE `tmatch` (
  `Id` int(11) NOT NULL,
  `User1` varchar(45) COLLATE utf8_czech_ci NOT NULL,
  `User2` varchar(45) COLLATE utf8_czech_ci DEFAULT NULL,
  `Score1` int(11) DEFAULT NULL,
  `Score2` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_czech_ci;

CREATE TABLE `tournament` (
  `Id` int(11) NOT NULL,
  `Name` tinytext COLLATE utf8_czech_ci NOT NULL,
  `Description` text COLLATE utf8_czech_ci NOT NULL,
  `Game` int(11) NOT NULL,
  `State` int(11) NOT NULL,
  `Created` datetime NOT NULL,
  `CreatedBy` varchar(45) COLLATE utf8_czech_ci NOT NULL,
  `Round` int(11) NOT NULL DEFAULT '0',
  `Winner` varchar(45) COLLATE utf8_czech_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_czech_ci;

CREATE TABLE `tournament_match` (
  `Tournament` int(11) NOT NULL,
  `Round` int(11) NOT NULL,
  `TMatch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_czech_ci;

CREATE TABLE `tournament_user` (
  `TournamentId` int(11) NOT NULL,
  `UserId` varchar(45) COLLATE utf8_czech_ci NOT NULL
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

ALTER TABLE `tmatch`
  ADD PRIMARY KEY (`Id`);

ALTER TABLE `tournament`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `Game` (`Game`);

ALTER TABLE `tournament_match`
  ADD PRIMARY KEY (`Tournament`,`Round`,`TMatch`),
  ADD KEY `Tournament` (`Tournament`),
  ADD KEY `Round_2` (`Round`),
  ADD KEY `Round_3` (`Round`),
  ADD KEY `TMatch` (`TMatch`);

ALTER TABLE `tournament_user`
  ADD PRIMARY KEY (`TournamentId`,`UserId`),
  ADD KEY `TournamentId` (`TournamentId`),
  ADD KEY `UserId` (`UserId`);

ALTER TABLE `user`
  ADD PRIMARY KEY (`Nickname`),
  ADD KEY `Team` (`Team`);


ALTER TABLE `article`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT;

ALTER TABLE `game`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT;

ALTER TABLE `game_genre`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

ALTER TABLE `invite`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT;

ALTER TABLE `publisher`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT;

ALTER TABLE `team`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT;

ALTER TABLE `tmatch`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT;

ALTER TABLE `tournament`
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

ALTER TABLE `tournament`
  ADD CONSTRAINT `tournament_ibfk_1` FOREIGN KEY (`Game`) REFERENCES `game` (`Id`);

ALTER TABLE `tournament_match`
  ADD CONSTRAINT `tournament_match_ibfk_1` FOREIGN KEY (`TMatch`) REFERENCES `tmatch` (`Id`),
  ADD CONSTRAINT `tournament_match_ibfk_2` FOREIGN KEY (`Tournament`) REFERENCES `tournament` (`Id`);

ALTER TABLE `tournament_user`
  ADD CONSTRAINT `tournament_user_ibfk_1` FOREIGN KEY (`TournamentId`) REFERENCES `tournament` (`Id`),
  ADD CONSTRAINT `tournament_user_ibfk_2` FOREIGN KEY (`UserId`) REFERENCES `user` (`Nickname`);

ALTER TABLE `user`
  ADD CONSTRAINT `user_ibfk_1` FOREIGN KEY (`Team`) REFERENCES `team` (`Id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
