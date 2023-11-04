DROP TABLE Sell;
DROP TABLE Merchandise;
DROP TABLE OpenStore;
DROP TABLE TicketAtDisneyResortOwnedByAccount;
DROP TABLE Reserve;
DROP TABLE Account;
DROP TABLE Serve;
DROP TABLE Food;
DROP TABLE FeatureRestaurant;
DROP TABLE ShowtimeDuration;
DROP TABLE ShowtimeEvent;
DROP TABLE Event_;
DROP TABLE MinimumHeightRideType;
DROP TABLE RideAvgWaitTime;
DROP TABLE RideMinimumHeight;
DROP TABLE IsPartOf;
DROP TABLE Attraction;
DROP TABLE ThemeParkThemeName;
DROP TABLE LandYearOpen;
DROP TABLE LandTheme;
DROP TABLE ComprisingThemePark;
DROP TABLE PostalCodeCountry;
DROP TABLE PostalCodeCity;
DROP TABLE AddressCityCountry;
DROP TABLE DisneyResortPostal;
DROP TABLE DisneyResortAddress;

CREATE TABLE DisneyResortAddress(
    disneyResortName VARCHAR(100) PRIMARY KEY,
    address VARCHAR(100)
);

CREATE TABLE DisneyResortPostal(
    disneyResortName VARCHAR(100) PRIMARY KEY,
    postalCode VARCHAR(100)
);

CREATE TABLE AddressCityCountry(
    disneyResortName VARCHAR(100) PRIMARY KEY,
    address VARCHAR(100),
    city VARCHAR(100),
    country VARCHAR(100)
);

CREATE TABLE PostalCodeCity(
    postalCode VARCHAR(100) PRIMARY KEY,
    city VARCHAR(100)
);

CREATE TABLE PostalCodeCountry(
    postalCode VARCHAR(100) PRIMARY KEY,
    country VARCHAR(100)
);

CREATE TABLE ComprisingThemePark(
    themeParkId INT PRIMARY KEY,
    name VARCHAR(100) UNIQUE NOT NULL,
    disneyResortName VARCHAR(100) NOT NULL,
    FOREIGN KEY (disneyResortName) REFERENCES DisneyResortAddress ON DELETE CASCADE
    -- ON UPDATE CASCADE
);

CREATE TABLE LandTheme(
    themeParkId INT,
    landId INT,
    theme VARCHAR(100),
    PRIMARY KEY(themeParkId, landId),
    FOREIGN KEY (themeParkId) REFERENCES ComprisingThemePark ON DELETE CASCADE
    -- ON UPDATE CASCADE
);

CREATE TABLE LandYearOpen(
    themeParkId INT,
    landId INT,
    theme VARCHAR(100),
    PRIMARY KEY(themeParkId, landId),
    FOREIGN KEY (themeParkId) REFERENCES ComprisingThemePark ON DELETE CASCADE
    -- ON UPDATE CASCADE
);

CREATE TABLE ThemeParkThemeName(
    themeParkId INT,
    theme VARCHAR(100),
    name VARCHAR(100),
    PRIMARY KEY (themeParkId, theme),
    FOREIGN KEY (themeParkId) REFERENCES ComprisingThemePark ON DELETE CASCADE
    -- ON UPDATE CASCADE
);

CREATE TABLE Attraction(
    attractionId INT PRIMARY KEY,
    name VARCHAR(100) UNIQUE NOT NULL
);

CREATE TABLE IsPartOf(
    themeParkId INT,
    landId INT,
    attractionId INT,
    PRIMARY KEY (themeParkId, landId, attractionId),
    FOREIGN KEY (themeParkId, landId) REFERENCES LandTheme ON DELETE CASCADE,
    -- ON UPDATE CASCADE,
    FOREIGN KEY (attractionId) REFERENCES Attraction ON DELETE CASCADE
     -- ON UPDATE CASCADE
);

CREATE TABLE RideMinimumHeight(
    attractionId INT PRIMARY KEY,
    minimumHeight INT,
    FOREIGN KEY (attractionId) REFERENCES Attraction ON DELETE CASCADE
    -- ON UPDATE CASCADE
);

CREATE TABLE RideAvgWaitTime(
    attractionId INT PRIMARY KEY,
    avgWaitTime INT,
    FOREIGN KEY (attractionId) REFERENCES Attraction ON DELETE CASCADE
    -- ON UPDATE CASCADE
);

CREATE TABLE MinimumHeightRideType(
    minimumHeight INT PRIMARY KEY,
    rideType VARCHAR(100)
);

CREATE TABLE Event_(
    attractionId INT PRIMARY KEY,
    eventType VARCHAR(100),
    FOREIGN KEY (attractionId) REFERENCES Attraction ON DELETE CASCADE
    -- ON UPDATE CASCADE
);

CREATE TABLE ShowtimeEvent(
    attractionId INT,
    startTime INT,
    endTime INT,
    PRIMARY KEY (attractionId, startTime),
    FOREIGN KEY (attractionId) REFERENCES Event_ ON DELETE CASCADE
    -- ON UPDATE CASCADE
);

CREATE TABLE ShowtimeDuration(
    startTime INT,
    endTime INT,
    duration INT,
    PRIMARY KEY (startTime, endTime)
);

CREATE TABLE FeatureRestaurant(
    restaurantId INT PRIMARY KEY,
    restaurantName VARCHAR(100) NOT NULL,
    maxOccupancy INT,
    themeParkId INT,
    landId INT,
    FOREIGN KEY (themeParkId, landId) REFERENCES LandTheme ON DELETE CASCADE
    -- ON UPDATE CASCADE,
);

CREATE TABLE Food(
    foodName VARCHAR(100) PRIMARY KEY,
    price INT
);

CREATE TABLE Serve(
    restaurantId INT,
    foodName VARCHAR(100),
    PRIMARY KEY (restaurantId, foodName),
    FOREIGN KEY (restaurantId) REFERENCES FeatureRestaurant ON DELETE CASCADE,
    -- ON UPDATE CASCADE,
    FOREIGN KEY (foodName) REFERENCES Food ON DELETE CASCADE
    -- ON UPDATE CASCADE
);

CREATE TABLE Account(
    accountId INT PRIMARY KEY,
    a_name VARCHAR(100),
    email VARCHAR(100) UNIQUE NOT NULL,
    birthDate INT
);

CREATE TABLE Reserve(
    accountId INT,
    restaurantId INT,
    time INT,
    PRIMARY KEY (accountId, restaurantId),
    FOREIGN KEY (accountId) REFERENCES Account ON DELETE CASCADE,
    -- ON UPDATE CASCADE,
    FOREIGN KEY (restaurantId) REFERENCES FeatureRestaurant ON DELETE CASCADE
    -- ON UPDATE CASCADE
);

CREATE TABLE TicketAtDisneyResortOwnedByAccount(
    ticketId INT,
    disneyResortName VARCHAR(100),
    entryDate INT,
    accountId INT NOT NULL,
    PRIMARY KEY (ticketId, disneyResortName),
    FOREIGN KEY (disneyResortName) REFERENCES DisneyResortAddress,
    -- ON UPDATE CASCADE,
    FOREIGN KEY (accountId) references Account
    -- ON UPDATE CASCADE
);

-- Oracle doesn't support DEFAULT/ON DELETE SET DEFAULT????
-- CREATE TABLE TicketAtDisneyResortOwnedByAccount(
--     ticketId INT,
--     disneyResortName VARCHAR(100) DEFAULT 'none',
--     entryDate INT,
--     accountId INT NOT NULL DEFAULT -1,
--     PRIMARY KEY (ticketId, disneyResortName),
--     FOREIGN KEY (disneyResortName) REFERENCES DisneyResortAddress ON DELETE SET DEFAULT,
--     -- ON UPDATE CASCADE,
--     FOREIGN KEY (accountId) references Account ON DELETE SET DEFAULT
--     -- ON UPDATE CASCADE
-- );

CREATE TABLE OpenStore(
    storeId INT PRIMARY KEY,
    storeName VARCHAR(100),
    themeParkId INT,
    landId INT,
    FOREIGN KEY (themeParkId, landId) REFERENCES LandTheme ON DELETE CASCADE
    -- ON UPDATE CASCADE
);

CREATE TABLE Merchandise(
    sku INT PRIMARY KEY,
    name VARCHAR(100) UNIQUE NOT NULL,
    price FLOAT NOT NULL
);

CREATE TABLE Sell(
    storeId INT,
    sku INT,
    PRIMARY KEY (storeId, sku),
    FOREIGN KEY (storeId) REFERENCES OpenStore ON DELETE CASCADE,
    -- ON UPDATE CASCADE,
    FOREIGN KEY (sku) REFERENCES Merchandise ON DELETE CASCADE
    -- ON UPDATE CASCADE,
);

INSERT INTO DisneyResortAddress VALUES ('Disneyland Resort', '1313 Disneyland Dr');
INSERT INTO DisneyResortAddress	VALUES ('Walt Disney World Resort', '1375 East Buena Vista Drive');
INSERT INTO DisneyResortAddress	VALUES ('Tokyo Disney Resort', '1-1 Maihama');
INSERT INTO DisneyResortAddress	VALUES ('Disneyland Paris', 'Bd de Parc');
INSERT INTO DisneyResortAddress	VALUES ('Hong Kong Disneyland Resort', 'Park Promenade');
INSERT INTO DisneyResortAddress	VALUES ('Shanghai Disneyland Resort', 'No. 310 Huang Zhao Road');

INSERT INTO DisneyResortPostal VALUES ('Disneyland Resort', '92802');
INSERT INTO DisneyResortPostal VALUES ('Walt Disney World Resort', '98264');
INSERT INTO DisneyResortPostal VALUES ('Tokyo Disney Resort', '279-0031');
INSERT INTO DisneyResortPostal VALUES ('Disneyland Paris', '77700');
INSERT INTO DisneyResortPostal VALUES ('Hong Kong Disneyland Resort', 'HKG');
INSERT INTO DisneyResortPostal VALUES ('Shanghai Disneyland Resort', '10011005');

INSERT INTO AddressCityCountry VALUES ('Disneyland Resort', '1313 Disneyland Dr', 'Anaheim', 'USA');
INSERT INTO AddressCityCountry VALUES ('Walt Disney World Resort', '1375 East Buena Vista Drive', 'Bay Lake', 'USA');
INSERT INTO AddressCityCountry VALUES ('Tokyo Disney Resort', '1-1 Maihama', 'Chiba', 'Japan');
INSERT INTO AddressCityCountry VALUES ('Disneyland Paris', 'Bd de Parc', 'Coupvray', 'France');
INSERT INTO AddressCityCountry VALUES ('Hong Kong Disneyland Resort', 'Park Promenade', 'Hong Kong', 'Hong Kong SAR');
INSERT INTO AddressCityCountry VALUES ('Shanghai Disneyland Resort', 'No. 310 Huang Zhao Road', 'Shanghai', 'China');

INSERT INTO PostalCodeCity VALUES ('92802', 'Anaheim');
INSERT INTO PostalCodeCity VALUES ('98264', 'Bay Lake');
INSERT INTO PostalCodeCity VALUES ('279-0031', 'Chiba');
INSERT INTO PostalCodeCity VALUES ('77700', 'Coupvray');
INSERT INTO PostalCodeCity VALUES ('HKG', 'Hong Kong');
INSERT INTO PostalCodeCity VALUES ('10011005', 'Shanghai');

INSERT INTO PostalCodeCountry VALUES ('92802', 'USA');
INSERT INTO PostalCodeCountry VALUES ('98264', 'USA');
INSERT INTO PostalCodeCountry VALUES ('279-0031', 'Japan');
INSERT INTO PostalCodeCountry VALUES ('77700', 'France');
INSERT INTO PostalCodeCountry VALUES ('HKG', 'Hong Kong SAR');
INSERT INTO PostalCodeCountry VALUES ('10011005', 'China');

INSERT INTO ComprisingThemePark VALUES (1, 'Disneyland Park', 'Disneyland Resort');
INSERT INTO ComprisingThemePark VALUES (2, 'Disney California Adventure Park', 'Disneyland Resort');
INSERT INTO ComprisingThemePark VALUES (3, 'Magic Kingdom Park', 'Walt Disney World Resort');
INSERT INTO ComprisingThemePark VALUES (4, 'Epcot', 'Walt Disney World Resort');
INSERT INTO ComprisingThemePark VALUES (5, 'Disney''s Hollywood Studios', 'Walt Disney World Resort');
INSERT INTO ComprisingThemePark VALUES (6, 'Disney''s Animal Kingdom Theme Park', 'Walt Disney World Resort');
INSERT INTO ComprisingThemePark VALUES (7, 'Tokyo Disneyland', 'Tokyo Disney Resort');
INSERT INTO ComprisingThemePark VALUES (8, 'Tokyo DisneySea', 'Tokyo Disney Resort');
INSERT INTO ComprisingThemePark VALUES (9, 'Disneyland Park (Paris)', 'Disneyland Paris');
INSERT INTO ComprisingThemePark VALUES (10, 'Walt Disney Studios Park', 'Disneyland Paris');
INSERT INTO ComprisingThemePark VALUES (11, 'Hong Kong Disneyland', 'Hong Kong Disneyland Resort');
INSERT INTO ComprisingThemePark VALUES (12, 'Shanghai Disneyland Park', 'Shanghai Disneyland Resort');

INSERT INTO LandTheme VALUES (1, 1, 'American small towns during the early 20th Century');
INSERT INTO LandTheme VALUES (1, 2, 'Remote jungles of Asia, Africa, South America, Oceania, the Caribbean Islands and the Middle East');
INSERT INTO LandTheme VALUES (1, 3, '19th Century American Frontier, American History and North America');
INSERT INTO LandTheme VALUES (1, 4, 'Disney''s animated fairy tale films, Fantasy, the towns and villages of Europe');
INSERT INTO LandTheme VALUES (1, 5, 'Future, technology, outer space, discovery and science fiction');
INSERT INTO LandTheme VALUES (1, 6, '19th Century New Orleans');
INSERT INTO LandTheme VALUES (1, 7, 'Land of bears and other animals');
INSERT INTO LandTheme VALUES (1, 8, 'Mickey Mouse universe');
INSERT INTO LandTheme VALUES (1, 9, 'Star Wars');
INSERT INTO LandTheme VALUES (2, 10, '20th Century Art Deco/Mission street');
INSERT INTO LandTheme VALUES (2, 11, 'Pixar/A Victorian era seaside amusement park');
INSERT INTO LandTheme VALUES (2, 12, 'A Victorian era seaside amusement park');
INSERT INTO LandTheme VALUES (2, 13, '1950s National Recreation Area');
INSERT INTO LandTheme VALUES (2, 14, '1930s Hollywood');
INSERT INTO LandTheme VALUES (2, 15, 'Cars, Radiator Springs');
INSERT INTO LandTheme VALUES (2, 16, 'Marvel Cinematic Universe');
INSERT INTO LandTheme VALUES (3, 5, 'Future, technology, outer space, discovery and science fiction');

INSERT INTO LandYearOpen VALUES (1, 1, 1955);
INSERT INTO LandYearOpen VALUES (1, 2, 1955);
INSERT INTO LandYearOpen VALUES (1, 3, 1955);
INSERT INTO LandYearOpen VALUES (1, 4, 1955);
INSERT INTO LandYearOpen VALUES (1, 5, 1955);
INSERT INTO LandYearOpen VALUES (1, 6, 1966);
INSERT INTO LandYearOpen VALUES (1, 7, 1972);
INSERT INTO LandYearOpen VALUES (1, 8, 1993);
INSERT INTO LandYearOpen VALUES (1, 9, 2019);
INSERT INTO LandYearOpen VALUES (2, 10, 2001);
INSERT INTO LandYearOpen VALUES (2, 11, 2001);
INSERT INTO LandYearOpen VALUES (2, 12, 2001);
INSERT INTO LandYearOpen VALUES (2, 13, 2001);
INSERT INTO LandYearOpen VALUES (2, 14, 2001);
INSERT INTO LandYearOpen VALUES (2, 15, 2012);
INSERT INTO LandYearOpen VALUES (2, 16, 2021);
INSERT INTO LandYearOpen VALUES (3, 5, 1971);

INSERT INTO ThemeParkThemeName VALUES (1, 'American small towns during the early 20th Century', 'Main Street, U.S.A.');
INSERT INTO ThemeParkThemeName VALUES (1, 'Remote jungles of Asia, Africa, South America, Oceania, the Caribbean Islands and the Middle East', 'Adventureland');
INSERT INTO ThemeParkThemeName VALUES (1, '19th Century American Frontier, American History and North America', 'Frontierland');
INSERT INTO ThemeParkThemeName VALUES (1, 'Disney''s animated fairy tale films, Fantasy, the towns and villages of Europe', 'Fantasyland');
INSERT INTO ThemeParkThemeName VALUES (1, 'Future, technology, outer space, discovery and science fiction', 'Tomorrowland');
INSERT INTO ThemeParkThemeName VALUES (1, '19th Century New Orleans', 'New Orleans Square');
INSERT INTO ThemeParkThemeName VALUES (1, 'Land of bears and other animals', 'Critter Country');
INSERT INTO ThemeParkThemeName VALUES (1, 'Mickey Mouse universe', 'Mickey’s Toontown');
INSERT INTO ThemeParkThemeName VALUES (1, 'Star Wars', 'Star Wars: Galaxy’s Edge');
INSERT INTO ThemeParkThemeName VALUES (2, '20th Century Art Deco/Mission street', 'Buena Vista Street');
INSERT INTO ThemeParkThemeName VALUES (2, 'Pixar/A Victorian era seaside amusement park', 'Pixar Pier');
INSERT INTO ThemeParkThemeName VALUES (2, 'A Victorian era seaside amusement park', 'Paradise Gardens Park');
INSERT INTO ThemeParkThemeName VALUES (2, '1950s National Recreation Area', 'Grizzly Peak');
INSERT INTO ThemeParkThemeName VALUES (2, '1930s Hollywood', 'Hollywood Land');
INSERT INTO ThemeParkThemeName VALUES (2, 'Marvel Cinematic Universe', 'Avengers Campus');
INSERT INTO ThemeParkThemeName VALUES (2, 'Cars, Radiator Springs', 'Cars Land');
INSERT INTO ThemeParkThemeName VALUES (3, 'Future, technology, outer space, discovery and science fiction', 'Tomorrowland');
INSERT INTO ThemeParkThemeName VALUES (12, 'Remote jungles of Asia, Africa, South America, Oceania, the Caribbean Islands and the Middle East', 'Adventure Isle');

INSERT INTO Attraction VALUES (1, 'Space Mountain');
INSERT INTO Attraction VALUES (2, 'Incredicoaster');
INSERT INTO Attraction VALUES (3, 'Big Thunder Mountain Railroad');
INSERT INTO Attraction VALUES (4, 'Pirates of the Caribbean');
INSERT INTO Attraction VALUES (5, 'Buzz Lightyear Astro Blasters');
INSERT INTO Attraction VALUES (6, 'Walt Disney''s Enchanted Tiki Room');
INSERT INTO Attraction VALUES (7, '“Believe...In Holiday Magic" Fireworks Spectacular');
INSERT INTO Attraction VALUES (8, 'A Christmas Fantasy Parade');
INSERT INTO Attraction VALUES (9, 'Disney Junior Dance Party!');
INSERT INTO Attraction VALUES (10, 'Fireworks at Disneyland Park');

INSERT INTO IsPartOf VALUES (1, 5, 1);
INSERT INTO IsPartOf VALUES (1, 5, 5);
INSERT INTO IsPartOf VALUES (1, 3, 3);
INSERT INTO IsPartOf VALUES (1, 6, 4);
INSERT INTO IsPartOf VALUES (2, 11, 2);
INSERT INTO IsPartOf VALUES (3, 5, 1);

INSERT INTO RideMinimumHeight VALUES (1, 102);
INSERT INTO RideMinimumHeight VALUES (2, 122);
INSERT INTO RideMinimumHeight VALUES (3, 102);
INSERT INTO RideMinimumHeight VALUES (4, 0);
INSERT INTO RideMinimumHeight VALUES (5, 0);

INSERT INTO RideAvgWaitTime VALUES (1, 50);
INSERT INTO RideAvgWaitTime VALUES (2, 50);
INSERT INTO RideAvgWaitTime VALUES (3, 35);
INSERT INTO RideAvgWaitTime VALUES (4, 40);
INSERT INTO RideAvgWaitTime VALUES (5, 25);

INSERT INTO MinimumHeightRideType VALUES (122, 'Big Drops');
INSERT INTO MinimumHeightRideType VALUES (117, 'Medium Drops');
INSERT INTO MinimumHeightRideType VALUES (107, 'Small Drops');
INSERT INTO MinimumHeightRideType VALUES (102, 'Mini Drops');
INSERT INTO MinimumHeightRideType VALUES (0, 'All Heights');

INSERT INTO Event_ VALUES (6, 'Show');
INSERT INTO Event_ VALUES (7, 'Fireworks');
INSERT INTO Event_ VALUES (8, 'Parade');
INSERT INTO Event_ VALUES (9, 'Show');
INSERT INTO Event_ VALUES (10, 'Fireworks');

INSERT INTO ShowtimeEvent VALUES (6, 0800, 0815);
INSERT INTO ShowtimeEvent VALUES (6, 0930, 0945);
INSERT INTO ShowtimeEvent VALUES (7, 2100, 2115);
INSERT INTO ShowtimeEvent VALUES (8, 1300, 1340);
INSERT INTO ShowtimeEvent VALUES (9, 1015, 1045);
INSERT INTO ShowtimeEvent VALUES (9, 1115, 1145);
INSERT INTO ShowtimeEvent VALUES (10, 2030, 2040);

INSERT INTO ShowtimeDuration VALUES (0800, 0815, 15);
INSERT INTO ShowtimeDuration VALUES (0930, 0945, 15);
INSERT INTO ShowtimeDuration VALUES (2100, 2115, 15);
INSERT INTO ShowtimeDuration VALUES (1300, 1340, 40);
INSERT INTO ShowtimeDuration VALUES (1015, 1045, 30);
INSERT INTO ShowtimeDuration VALUES (1115, 1145, 30);
INSERT INTO ShowtimeDuration VALUES (2030, 2040, 10);

INSERT INTO FeatureRestaurant VALUES (1, 'Hungry Bear Restaurant', 150, 1, 7);
INSERT INTO FeatureRestaurant VALUES (2, 'Carthay Circle Restaurant', 200, 2, 10);
INSERT INTO FeatureRestaurant VALUES (3, 'Plaza Inn', 400, 1, 1);
INSERT INTO FeatureRestaurant VALUES (4, 'Blue Bayou Restaurant', 300, 1, 6);
INSERT INTO FeatureRestaurant VALUES (5, 'Paradise Garden Grill', 130, 2, 12);

INSERT INTO Food VALUES ('Honey-Spiced Chicken Sandwich', 12.99);
INSERT INTO Food VALUES ('Classic Cheeseburger', 12.79);
INSERT INTO Food VALUES ('BBQ Chicken Salad', 12.49);
INSERT INTO Food VALUES ('Pumpkin Churro Funnel Cake', 11.99);
INSERT INTO Food VALUES ('French Fries', 4.49);

INSERT INTO Serve VALUES (1, 'Honey-Spiced Chicken Sandwich');
INSERT INTO Serve VALUES (1, 'Classic Cheeseburger');
INSERT INTO Serve VALUES (1, 'BBQ Chicken Salad');
INSERT INTO Serve VALUES (1, 'Pumpkin Churro Funnel Cake');
INSERT INTO Serve VALUES (1, 'French Fries');

INSERT INTO Account VALUES (001, 'Celine', 'celine@ubc.ca', 20031114);
INSERT INTO Account VALUES (002, 'Brandon', 'brandon@ubc.ca', 20010629);
INSERT INTO Account VALUES (003, 'Josh', 'josh@ubc.ca', 20010424);
INSERT INTO Account VALUES (004, 'Melissa', 'melissa@ubc.ca', 20010925);
INSERT INTO Account VALUES (005, 'Rachael', 'rachael@ubc.ca', 19750101);

INSERT INTO Reserve VALUES (001, 1, 1200);
INSERT INTO Reserve VALUES (002, 5, 2015);
INSERT INTO Reserve VALUES (003, 3, 1400);
INSERT INTO Reserve VALUES (001, 4, 1700);
INSERT INTO Reserve VALUES (001, 5, 1800);

INSERT INTO TicketAtDisneyResortOwnedByAccount VALUES (111, 'Shanghai Disneyland Resort', 20231114, 001);
INSERT INTO TicketAtDisneyResortOwnedByAccount VALUES (112, 'Shanghai Disneyland Resort', 20231115, 001);
INSERT INTO TicketAtDisneyResortOwnedByAccount VALUES (113, 'Disneyland Paris', 20231020, 003);
INSERT INTO TicketAtDisneyResortOwnedByAccount VALUES (114, 'Disneyland Resort', 20191221, 002);
INSERT INTO TicketAtDisneyResortOwnedByAccount VALUES (115, 'Shanghai Disneyland Resort', 20241021, 003);

INSERT INTO OpenStore VALUES (01, 'World of Disney®', NULL, NULL);
INSERT INTO OpenStore VALUES (02, 'Emporium', 1, 1);
INSERT INTO OpenStore VALUES (03, 'Little Green Men Store Command', 1, 5);
INSERT INTO OpenStore VALUES (04, 'The LEGO® Store', NULL, NULL);
INSERT INTO OpenStore VALUES (05, 'Pioneer Mercantile', 1, 3);

INSERT INTO Merchandise VALUES (55555, 'Winnie-the-Pooh plush large', 65);
INSERT INTO Merchandise VALUES (66666, 'Piglet plush large', 60);
INSERT INTO Merchandise VALUES (77777, 'Tigger plush large', 60);
INSERT INTO Merchandise VALUES (88888, 'Rabbit plush large', 60);
INSERT INTO Merchandise VALUES (99999, 'Eeyore plush large', 60);

INSERT INTO Sell VALUES (01, 55555);
INSERT INTO Sell VALUES (01, 66666);
INSERT INTO Sell VALUES (01, 77777);
INSERT INTO Sell VALUES (01, 88888);
INSERT INTO Sell VALUES (01, 99999);