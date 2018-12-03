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
  `Created` datetime NOT NULL,
  `Deleted` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_czech_ci;

INSERT INTO `article` (`Id`, `Author`, `Header`, `Content`, `Image`, `Game`, `Created`, `Deleted`) VALUES
(1, 'Admin', 'Prodeje PUBG: Velký milník pokořen, prodáno přes 30 milionů kopií', 'Úspěšný herní titul PlayersUnknow’s Battleground byl 12. prosince uveden do programu Xbox Game Preview pro konzole Xbox One a o osm dní později - tedy 20. prosince - byl po dlouhém čekání představen v plné verzi pro PC. Devět měsíců v Early Access, zpočátku mnoho chyb, velkých i malých a pouze jedinná mapa Erengel - nic z toho nemělo negativní efekt na sílící popularitu hry. Prodeje v posledních měsících letí raketově vzhůru, v rozmezí pouhých čtyř měsíců se prodalo 20 milionů kopií. Aktuální čísla prodejů byla odhalena právě při představení plné verze hry, prodeje se přehouply přes 30 milionů a s prozatimním rekordem 2,9 milionů současně hrajících hráčů má skvěle našlápnuto.\nZdroj: https://www.grunex.com/article/prodeje-pubg-velky-milnik-pokoren-prodano-pres-30-milionu-kopii/3150', NULL, 8, '2018-12-02 00:01:00', 0),
(2, 'Admin', 'EU LCS Spring 2016 - Finále', 'A je tu konec EU LCS Spring 2016. Po vyrovnaném finále se nakonec dočkali vítězství G2 Esports. Na druhém místě skončili Origen. Třetí místo si v sobotu vybojovali Fnatic a na \"bramborovém\" čtvrtém místě skončili H2K. Všechny týmy se dočkaly odměny ve formě peněz a také se jim připsaly body, které jsou potřebné k postupu na Worlds - světový šampionát. G2 navíc ještě pojedou reprezentovat Evropu na Mid Season Invitational do Šanghaje.\n\nZdroj: https://www.grunex.com/article/eu-lcs-spring-2016-finale/573', NULL, 3, '2018-12-02 00:03:00', 0),
(3, 'Admin', 'Stařenka vzdala oběť Garenovi z LoL namísto bohu', 'O tom, že v Číně se může stát cokoliv není třeba dlouze diskutovat. V minulosti jsme k takovému závěru mohli dojít v mnoha případech, teď nám to opět potvrdila starší žena, která si podle všeho spletla sochu postavy ze hry League of Legends a to bojovníka Garena, s historicky známým čínským válečníkem Guan Yu, který je ve své zemi díky své minulosti pro mnohé bohem.\n\nZdroj: https://www.grunex.com/article/starenka-vzdala-obet-garenovi-z-lol-namisto-bohu/549', NULL, 3, '2018-12-02 00:04:00', 0),
(4, 'Admin', 'Overwatch vydává své první Lego', 'Blizzard chce očividně značku Overwatch ždímat, co to jde, a my jim to samozřejmě nemáme za zlé, protože si vybrali ten správný směr. Poté, co navázali spolupráci s Hasbro na Nerf zbraních, dali se dohromady i s Legem a již nyní mají fanoušci možnost si zakoupit první kousek do sbírky - Bastiona.\n\nZdroj: https://www.grunex.com/article/overwatch-vydava-sve-prvni-lego/5425', NULL, 7, '2018-12-02 00:05:00', 0),
(5, 'Admin', 'Blizzard pod palbou fanoušků, důvodem je ohlášení Diabla pro mobily', 'Donedávna platilo pravidlo, že na co Blizzard sáhne, to se promění ve zlato. Tomu je však konec. Přestože oblíbená firma dopředu jasně upozorňovala, že se na letošním Blizzconu žádných novinek o připravovaném Diablu 4 ještě nedočkáme, očekávání ze strany fanoušků byla obrovská. Když pak vývojáři na velikém pódiu oznámili „pouhou“ mobilní odbočku Diablo Immortal, bylo zklamání v sále takřka hmatatelné i přes obrazovky monitorů. „To je nějaký špatně načasovaný aprílový vtípek?“ vyjádřil všeobecné emoce jeden z fanoušků během následného diskusního panelu a vývojáři se dokonce dočkali hlasitého bučení. \n\nZdroj: https://bonusweb.idnes.cz/dablo-immortal-mobilni-hry-d0l-/Novinky.aspx?c=A181105_095440_bw-novinky_srp', NULL, NULL, '2018-12-02 00:06:00', 0),
(6, 'Admin', 'Na univerzitě v Ostravě rozdali letos slušný balík peněz jako stipendium na esport', 'Pro herního nadšence není v současnosti vůbec jednoduché rozhodnout se, kam po ukončení střední školy zamíří, chce-li dál studovat. Vždyť třeba na Masarykově univerzitě v Brně se historie z doby před Husitstvím vyučuje pomocí hry Kingdom Come: Deliverance od českého vývojářského týmu Warhorse Studios.\n\nPokud ale svůj skill ve hrách předvádíte spíše v multiplayerových titulech, zamiřte raději na Technickou univerzitu Vysoké školy báňské v Ostravě. Ta totiž letos vypsala stipendium o celkové výši 35 000 Kč jejím šestnácti esportovcům.\n\nPokud máme správné informace, je to jediná škola v ČR, která úspěchy v esportu oceňuje finanční pomocí. Můžeme jen doufat, že se k VŠB-TUO přidají i další univerzity.\n\nZdroj: https://www.grunex.com/article/na-univerzite-v-ostrave-rozdali-letos-slusny-balik-penez-jako-stipendium-na-esport/5761', NULL, NULL, '2018-12-03 00:08:00', 0),
(7, 'Admin', '[CS:GO] IEM Chicago opět v rukou Astralis', 'EM Chicago 2018 mělo všechno. Kvalitní týmy, dobře vybraný formát, ideální prize pool a obrovskou mezinárodní pozornost. Krom úžasných výkonů nám však přinesl i odpovědi na mnohé otázky, které trápily nejednoho CS:GO analytika, či prostého hráče. Na první otázku, tedy \"Kdo vyhraje?\" nám už odpověděl název článku. Opět je to dánský celek Astralis, který si odnáší již sedmou letošní trofej a prokazuje svou téměř absolutní dominanci nad celosvětovou CS:GO scénou.\n\nZdroj: https://www.grunex.com/article/cs-go-iem-chicago-opet-v-rukou-astralis/5655', NULL, 1, '2018-12-03 00:10:00', 0),
(8, 'Admin', 'Hearthstone MČR odstartuje v pátek', 'Hearthstone se v Česku těší velké popularitě a na program jej nezapomněli zařadit ani organizátoři MČR. V kartičkách se letos utká 16 nejlepších borců reprezentující široké spektrum domácích organizací.\n\nV turnaji na sebe narazí jak ti nejzkušenější hráči, tak i ti, pro které bude akce tohoto formátu premiéra. Hra jako je Hearthstone dává šanci všem a tak lze jen těžko spekulovat o favoritech a outsiderech.\n\nSamozřejmě existují hráči, o kterých se v komunitě hodně diskutuje, že by to mohli být právě oni, jež si odnesou titul. O největší rozruch se v posledních dnech postaral především tým Inaequalis. Podařilo se jim do svých řad přivést, alespoň pro MČR, Oldřicha „Faeliho“ Mahdala. Právě jeho jméno je s titulem na domácí akci často skloňováno. Podobné spekulace se točí také kolem hráčů jako je Jarla, Matty nebo Vlčák.\n\nTitul z minulého ročníku bude obhajovat reprezentant eSuby, Petr „Scruffy“ Janík. Pozadu nezůstává ani zbytek startujících mezi kterými najdeme jména jako Findan nebo Pokrovac. Podtrženo a sečteno, kdokoliv má šanci překvapit a to je to co na Hearthstonu máme tak rádi!\n\nZdroj: https://www.grunex.com/article/hearthstone-mcr-odstartuje-v-patek/5635', NULL, 5, '2018-12-03 00:12:21', 0),
(9, 'Admin', '[CS:GO] MSL posiluje Rogue', 'Třiadvacetiletý hráč Krystal byl přemístěn na pozici náhradníka, když ho North nahradil bývalým vedoucím Rogue Casper \"cadiaN\" Møller. K tomuto kroku došlo po zklamání v New Challenger Stage Major turnaje FACEIT, což se stalo jen několik dní poté, co tým vyhrál DreamHack Masters Stockholm, kde porazil významné týmy jako Natus Vincere nebo dánské rivaly Astralis.\n\nV nové AWP roli mladý talent MSL vybojoval ocenění MVP v DreamHack Masters. V Rogue převezme roli in-game leadera za hráče Kevin \"Krystal\" Amend, který měl těžkou roli Strat callera. První utkání dánského hráče spolu s Rogue bude finále kvalifikace na DreamHack Open Winter již ve čtvrtek večer. \n\nZdroj: https://www.grunex.com/article/cs-go-msl-posiluje-rogue/5550', NULL, 1, '2018-12-03 00:16:00', 0),
(10, 'Admin', 'Gunrunners ovládli NVIDIA PUBG turnaj na MČR', 'Od 9. - 11. listopadu 2018 probíhalo na Brněnském výstavišti Mistrovství České republiky v počítačových hrách. Poprvé v historii se zde také uskutečnil souboj o mistrovský titul v PUBG! Jak tento turnaj dopadl a který tým může nosit nálepku mistra České republiky?\n\nPrognózy byly různé někdo favorizoval Alza Gaming, jiný eSubu nebo Inside Games. Nakonec všem favoritům ale vypálili rybník Gunrunners! Rozhodujícím faktorem vítězství tohoto týmu bylo konzistentní umístění na mapě Erangel, kdy se vždy umístili v TOP 3. Na Miramaru se Gunrunners úplně nedařilo, a týmy na dalších místech Alza Gaming a Ooops tak měly možnost se dotáhnout. Poslední kolo na Erangelu, které rozhodovalo, který tým si odnese vítěznou trofej, jenom potvrdilo dominanci týmu Gunrunners na této mapě.\n\nZdroj: https://www.grunex.com/article/gunrunners-ovladli-nvidia-pubg-turnaj-na-mcr/5652', NULL, 8, '2018-12-03 00:19:25', 0);

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

INSERT INTO `game` (`Id`, `Name`, `Keyname`, `ReleaseDate`, `Description`, `PublisherId`, `Icon`, `Image`, `Video`, `Deleted`) VALUES
(1, 'Counter-Strike: Global Offensive', 'CSGO', '2012-08-21', 'Counter-Strike: Global Offensive (zkráceně CS:GO) je počítačová online FPS (střílečka z pohledu první osoby). Hru vyvinulo Valve ve spolupráci s Hidden Path Entertainment. Hra navazuje na předchozí verze hry Counter-Strike. Je to v pořadí čtvrtá hra ze série Counter-Strike. Verze pro Linux byla vydána v září 2014.\n\nHra byla vydána 21. srpna 2012 k dispozici na Windows, OS X a na platformách Steam, Xbox Live Arcade. Obsahuje například předělané verze klasických map, ale také úplně nové mapy, postavy a herní módy. Multiplatformní multiplayer byl původně plánován pro Windows, OS X a PSN, ale nakonec byl umožněn pouze pro Windows a OS X. PSN verze nabízí tři metody ovládání: ovladač DualShock 3, PlayStation Move nebo USB klávesnici/myš.', 18, NULL, NULL, 'https://www.youtube.com/embed/edYCtaNueQY', 0),
(2, 'StarCraft II: Legacy of the Void', 'SC2', '2015-11-10', 'StarCraft II: Legacy of the Void je pokračování vojenské sci-fi real-time strategie StarCraft II: Wings of Liberty, jež vydala firma Blizzard Entertainment dne 10. listopadu 2015. Legacy of the Void je třetí část z trilogie StarCraft II. Avšak již od 31. března 2015 byla společností Blizzard Entertainment poskytnuta uzavřená betaverze, obsahující od června též minikampaň „Whispers of Oblivion“ (česky: Zvěsti zapomnění), jež byla ukončena krátce před vydáním plné verze hry.\n\nRozšíření obsahuje nové jednotky, úpravy jednotek z Wings of Liberty, ale i pokračování kampaně. Ta je tentokrát zaměřena hlavně na protossy a hráč ji projde pozvolna 19 misemi a pak dalšími třemi dodatečnými misemi, jež uzavírají hlavní příběh série Starcraft II. Hlavní postavou kampaně je hierarch Artanis, novopečený vůdce všech protossů.[2] Jako „most“ mezi datadisky Heart of the Swarm a Legacy of the Void a též jako úvod do příběhu protossů posloužila již výše zmíněná minikampaň Whispers of Oblivion, která je v plné verzi dostupná také. V ní byl hlavní postavou temný templar Zeratul, snažící se zastavit přicházející temnotu. Z hlediska multiplayeru se pro hru používá od patche 4.0.0 v roce 2017 jen název \"StarCraft II\".', 1, NULL, NULL, 'https://www.youtube.com/embed/M_XwzBMTJaM', 0),
(3, 'League of Legends', 'LOL', '2009-09-27', 'League of Legends (česky: Liga legend, zkráceně: LoL nebo LoLko) je multiplayer online battle arena. Jedná se o hru typu freemium s podporou tzv. mikroplateb ke koupi herní měny zvané RP (Riot Points). Pro platformu Microsoft Windows a macOS byla vyvinuta studiem Riot Games. Hra byla oznámena dne 7. října 2008 a spuštěna 27. října 2009.\n\nV současnosti Riot Games spravuje servery EUNE (EU Sever a Východ), EUW (EU západ), NA (Severní Amerika), JPN (Japonsko), OCE (Oceánie), LAS/LAN (Jižní a Severní Latinská Amerika), RU (Rusko), TU (Turecko) a BR (Brazílie). Dále existují servery CN (Čína), TW (Taiwan), GARENA (Singapur) a KR (Jižní Korea), které jsou oddělené od zbytku a nedá se na ně z jiné země zaregistrovat.\n\nPro Čechy se doporučuje hraní na EUNE (EU Sever a Východ) nebo EUW (EU západ) a to kvůli nejrychlejšímu spojení se serverem a plné podpoře českého jazyka (EUNE).\n\nSami vývojáři tvrdí, že herní mechanismy jsou částečně převzaté z módu hry Warcraft 3 společnosti Blizzard Entertainment Defense of the Ancients (DotA).', 16, NULL, NULL, 'https://www.youtube.com/embed/vzHrjOMfHPY', 0),
(4, 'World of Tanks', 'WOT', '2010-10-12', 'World of Tanks (zkráceně WoT, česky Svět tanků) je akční online free to play hra s tematikou tankových bitev první poloviny dvacátého století. Hra je vyvíjená společností Wargaming.net, ve které hráč hraje z pohledu třetí osoby (v odstřelovacím módu z pohledu střelce tanku, v dělostřeleckém módu z ptačí perspektivy). K dispozici je více než 400 vozidel od konce První světové války, meziválečného období. Přes hojně zastoupenou vojenskou techniku z období Druhé světové války konče technikou z doby Korejského války a začátku války ve Vietnamu. Hra má více než 150 milionů registrovaných uživatelů. V roce 2013 vyhrála první místo v soutěži Golden Joystick Awards za nejlepší online hru roku. V aktualizaci 0.9.13, která vyšla 16. prosince 2015, byl do hry přidán československý národ. Existuje i verze na mobilní telefony a tablety World of Tanks Blitz.', 19, NULL, NULL, 'https://www.youtube.com/embed/iJXvmedxF-M', 0),
(5, 'Hearthstone', 'hearthstone', '2014-12-15', 'Hearthstone, dříve Hearthstone: Heroes of Warcraft je online virtuální karetní hra vyvinutá společností Blizzard Entertainment. Je zdarma dostupná (tzv. free-to-play), s možností koupě karet pro rychlejší postup hrou.\n\nHra byla oznámena v dubnu 2013 a spuštěna 11. dubna 2014. Hearthstone je dostupný na Microsoft Windows a OS X systémech iOS a Androidových zařízení.\n\nV listopadu 2018 překročil počet registrovaných hráčů 100 milionů.', 1, NULL, NULL, 'https://www.youtube.com/embed/YG35phnCKRc', 0),
(6, 'Fortnite Battle Royale', 'fortnite', '2017-09-26', 'Fortnite Battle Royale je free-to-play videohra vyvíjená studiem Epic Games. Byla vydána pro Microsoft Windows, macOS, PlayStation 4, Xbox One a Nintendo Switch v září 2017 a pro iOS v březnu 2018. Již je dostupná i beta verze pro Android, ale pouze na některá zařízení. Je založená na Fortnite, kooperativní survival hře s prvky stavění.\n\nEpic Games se inspirovali hlavně hrou PlayerUnknown\'s Battlegrounds, která vyšla v březnu 2017 a nejvíce popularizovala žánr battle royale. Postřehli možnost vytvořit ze hry Fortnite mód ve stylu Battle Royale. Epic Games nejdříve tento mód spustili jako součást Fortnite, ale později z něj udělali samostatnou free-to-play hru podporovanou mikrotransakcemi.', 13, NULL, NULL, 'https://www.youtube.com/embed/2gUtfBmw86Y', 0),
(7, 'Overwatch', 'overwatch', '2016-05-24', 'Svět potřebuje hrdiny! V multiplayerové týmové střílečce Overwatch jich proto najdete rovnou celých 21. Každého s naprosto odlišnými vlastnostmi a jiným stylem hraní. Jde o první střílečku ze zkušených vývojářských rukou společnosti Blizzard. Vojáci. Vědci. Dobrodruzi. Podivnosti. V době světové krize se sešla netradiční partička hrdinů, aby opět nastolila mír ve světě zničeném válkou. Říkala si - OVERWATCH. Krizi zažehnali a pomohli opět nastolit mír. Díky tomu následovaly krásné prosperující dekády inovací, objevů a zkoumání. Po mnoha letech však vliv Overwatch klesl, až byla skupinka nakonec rozpuštěna. Overwatch je tedy pryč... ale svět stále potřebuje hrdiny!', 1, NULL, NULL, 'https://www.youtube.com/embed/FqnKB22pOC0', 0),
(8, 'PlayerUnknown\'s Battlegrounds', 'PUBG', '2017-12-20', 'PlayerUnknown\'s Battlegrounds (zkráceně PUBG) je online multiplayerová battle royale hra vyvinutá a distribuovaná dceřinou společností firmy Bluehole – PUBG Corporation. Je založena na módech hry Arma 2, které byly vyvinuty Brendanem \"PlayerUnknown\" Greenem a a používaly jako inspiraci film z roku 2000 Battle Royale a rozšířily se do samostatné hry pod vedením Greeneho. Na začátku hry je až 100 hráčů, kteří pomocí padáku dopadnou na ostrov bez jakéhokoliv vybavení. Musí jej prohledat, najít zbraně, další výbavu a zabít všechny ostatní hráče, aniž by sami zemřeli. Herní mapa se postupně zmenšuje, aby se hráči dostali do vzájemné konfrontace a nezůstávali na stejném místě. Poslední žijící hráč či tým vyhrává.\n\nHra byla vydána pro Microsoft Windows na známé herní platformě Steam v módu předběžného přístupu v březnu 2017. Za 6 měsíců od uvedení se prodalo více než deset milionů kopií a PUBG nově drží také rekord v počtu hráčů online na Steamu – v lednu roku 2018 byla překročena hranice 3,25 milionů hráčů v jeden den, čímž byl překonán rekord hry Dota 2. Plná verze hry byla vydána 20. prosince 2017.', 21, NULL, NULL, 'https://www.youtube.com/embed/4rG9noTfb4A', 0),
(9, 'Dota 2', 'dota2', '2013-07-09', 'Dota 2 (Defense of the Ancients 2) je strategická počítačová hra žánru MOBA (Multiplayer online battle arena) uznaná v mnoha zemích jako plnohodnotný sport, vyvíjená firmou Valve Corporation. Jedná se o \"stand-alone\" remake Defense of the Ancients (DotA), oblíbené modifikace (mapy) ze hry Warcraft III.\n\nVývoj hry začal roku 2009, kdy Valve najalo jako hlavního designéra vývojáře původního módu DotA s přezdívkou \"Icefrog\". Hra byla oficiálně oznámena 13. října 2010 na portálu Game Informer.[1] Přestože byla Dota 2 kritizována pro příliš pozvolnou křivku učení, je dnes třetí nejhranější hrou z platformy Steam s denními špičkami přes 600 000 současně hrajících hráčů.\n\nHra je založena na platformě F2P (Free to play), tedy lze ji hrát zdarma. Herní systém a mapa zůstaly podobné jako v původní hře, vývoj hry pokračoval tam, kde skončil vývoj původní DotA;[2] hlavním důvodem k vydání pokračování Defense of the Ancients je odpoutání se od herního klienta v podobě Warcraftu III, protože i když si první DotA vytvořila samostatnou komunitu, je to stále pouze přídavná mapa ke hře Warcraft III: The Frozen Throne.', 18, NULL, NULL, 'https://www.youtube.com/embed/-cSFPIwMEq4', 0);

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
(13, 'MMORPG'),
(14, 'MOBA');

CREATE TABLE `game_genre_games` (
  `GameId` int(11) NOT NULL,
  `GameGenreId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf16 COLLATE=utf16_czech_ci;

INSERT INTO `game_genre_games` (`GameId`, `GameGenreId`) VALUES
(1, 1),
(2, 2),
(3, 14),
(4, 5),
(5, 7),
(6, 5),
(7, 1),
(8, 5),
(9, 14);

CREATE TABLE `invite` (
  `Id` int(11) NOT NULL,
  `User` varchar(45) COLLATE utf8_czech_ci NOT NULL,
  `Team` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_czech_ci;

CREATE TABLE `publisher` (
  `Id` int(11) NOT NULL,
  `Name` varchar(255) COLLATE utf16_czech_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf16 COLLATE=utf16_czech_ci;

INSERT INTO `publisher` (`Id`, `Name`) VALUES
(1, 'Blizzard Entertainment'),
(2, 'CD Projekt‎'),
(3, 'Electronic Arts'),
(4, 'Rockstar Games'),
(5, 'Ubisoft Entertainment‎'),
(6, '2K Games'),
(7, 'Activision'),
(8, 'Bethesda Softworks'),
(9, 'BioWare'),
(10, 'Bohemia Interactive'),
(11, 'Codemasters'),
(12, 'Crytek'),
(13, 'Epic Games'),
(14, 'Infinity Ward'),
(15, 'Naughty Dog'),
(16, 'Riot Games'),
(17, 'Sega'),
(18, 'Valve Corporation'),
(19, 'Wargaming'),
(20, 'Ostatní'),
(21, 'PUBG Corporation ');

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
  `Game` int(11) DEFAULT NULL,
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

INSERT INTO `user` (`Nickname`, `Firstname`, `Lastname`, `Email`, `Phone`, `Image`, `Password`, `Salt`, `Team`, `Admin`, `Deactivated`) VALUES
('Admin', 'John', 'Doe', 'admin@admin.cz', NULL, NULL, '$2a$10$NVAMtZl6UFYR.dkiOL1Rw.A4NjM/tyNCQPomldGGFHw2C5eziwyU2', '$2a$10$NVAMtZl6UFYR.dkiOL1Rw.', NULL, 2, 0),
('BaseAdmin', 'John', 'Doe', 'admin@admin.cz', NULL, NULL, '$2a$10$aDZtWFyrDGpTcu3kJc2R5uB/yUfvHuXI.sgGPODsHq.XrlOI0usoy', '$2a$10$aDZtWFyrDGpTcu3kJc2R5u', NULL, 1, 0),
('User', 'John', 'Doe', 'user@user.com', NULL, NULL, '$2a$10$HAeRt9uK3OCYZotREAmzR.knm2WVejnOKgxk/Vz9o2npDtGXVtceO', '$2a$10$HAeRt9uK3OCYZotREAmzR.', NULL, 0, 0);


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
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

ALTER TABLE `game`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

ALTER TABLE `game_genre`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

ALTER TABLE `invite`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT;

ALTER TABLE `publisher`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

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
