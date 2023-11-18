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
DROP TABLE RideAvgWaitTime;
DROP TABLE RideTypeMinimumHeight;
DROP TABLE IsPartOf;
DROP TABLE Attraction;
DROP TABLE ThemeParkLand;
DROP TABLE ThemeName;
DROP TABLE ComprisingThemePark;
DROP TABLE DisneyResortAddress;
DROP TABLE PostalCodeCountry;
DROP TABLE PostalCodeCity;


CREATE TABLE PostalCodeCity(
    postalCode VARCHAR(100) PRIMARY KEY,
    city VARCHAR(100)
);

CREATE TABLE PostalCodeCountry(
    postalCode VARCHAR(100) PRIMARY KEY,
    country VARCHAR(100),
    FOREIGN KEY (postalCode) REFERENCES PostalCodeCity ON DELETE CASCADE
);

CREATE TABLE DisneyResortAddress(
    disneyResortName VARCHAR(100) PRIMARY KEY,
    address VARCHAR(100),
    postalCode VARCHAR(100),
    FOREIGN KEY (postalCode) REFERENCES PostalCodeCountry ON DELETE CASCADE
);

CREATE TABLE ComprisingThemePark(
    themeParkId INT PRIMARY KEY,
    name VARCHAR(100) UNIQUE NOT NULL,
    disneyResortName VARCHAR(100) NOT NULL,
    FOREIGN KEY (disneyResortName) REFERENCES DisneyResortAddress ON DELETE CASCADE
    -- ON UPDATE CASCADE
);

CREATE TABLE ThemeName(
    name VARCHAR(100) PRIMARY KEY,
    theme VARCHAR(100)
);

CREATE TABLE ThemeParkLand(
    themeParkId INT,
    landId INT,
    name VARCHAR(100),
    YearOpen INT,
    PRIMARY KEY (themeParkId, landId),
    FOREIGN KEY (themeParkId) REFERENCES ComprisingThemePark ON DELETE CASCADE,
    FOREIGN KEY (name) REFERENCES ThemeName ON DELETE CASCADE
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
    FOREIGN KEY (themeParkId, landId) REFERENCES ThemeParkLand ON DELETE CASCADE,
    -- ON UPDATE CASCADE,
    FOREIGN KEY (attractionId) REFERENCES Attraction ON DELETE CASCADE
     -- ON UPDATE CASCADE
);

CREATE TABLE RideTypeMinimumHeight(
    minimumHeight INT PRIMARY KEY,
    rideType VARCHAR(100)
);

CREATE TABLE RideAvgWaitTime(
    attractionId INT PRIMARY KEY,
    minimumHeight INT,
    avgWaitTime INT,
    FOREIGN KEY (attractionId) REFERENCES Attraction ON DELETE CASCADE,
    FOREIGN KEY (minimumHeight) REFERENCES RideTypeMinimumHeight
    -- ON UPDATE CASCADE
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
    FOREIGN KEY (themeParkId, landId) REFERENCES ThemeParkLand ON DELETE CASCADE
    -- ON UPDATE CASCADE,
);

CREATE TABLE Food(
    name VARCHAR(100) PRIMARY KEY,
    price INT
);

CREATE TABLE Serve(
    restaurantId INT,
    foodName VARCHAR(100),
    PRIMARY KEY (restaurantId, foodName),
    FOREIGN KEY (restaurantId) REFERENCES FeatureRestaurant ON DELETE CASCADE,
    -- ON UPDATE CASCADE,
    FOREIGN KEY (foodName) REFERENCES Food(name) ON DELETE CASCADE
    -- ON UPDATE CASCADE
);

CREATE TABLE Account(
    accountId INT PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(100) UNIQUE NOT NULL,
    birthDate DATE
);

CREATE TABLE Reserve(
    accountId INT,
    restaurantId INT,
    partySize INT,
    time DATE,
    PRIMARY KEY (accountId, restaurantId),
    FOREIGN KEY (accountId) REFERENCES Account ON DELETE CASCADE,
    -- ON UPDATE CASCADE,
    FOREIGN KEY (restaurantId) REFERENCES FeatureRestaurant ON DELETE CASCADE
    -- ON UPDATE CASCADE
);

CREATE TABLE TicketAtDisneyResortOwnedByAccount(
    ticketId INT,
    disneyResortName VARCHAR(100),
    entryDate DATE,
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
    name VARCHAR(100),
    themeParkId INT,
    landId INT,
    FOREIGN KEY (themeParkId, landId) REFERENCES ThemeParkLand ON DELETE CASCADE
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

INSERT INTO DisneyResortAddress VALUES ('Disneyland Resort', '1313 Disneyland Dr', '92802');
INSERT INTO DisneyResortAddress	VALUES ('Walt Disney World Resort', '1375 East Buena Vista Drive', '98264');
INSERT INTO DisneyResortAddress	VALUES ('Tokyo Disney Resort', '1-1 Maihama', '279-0031');
INSERT INTO DisneyResortAddress	VALUES ('Disneyland Paris', 'Bd de Parc', '77700');
INSERT INTO DisneyResortAddress	VALUES ('Hong Kong Disneyland Resort', 'Park Promenade', 'HKG');
INSERT INTO DisneyResortAddress	VALUES ('Shanghai Disneyland Resort', 'No. 310 Huang Zhao Road', '10011005');

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

INSERT INTO ThemeName VALUES ('Main Street, U.S.A.', 'American small towns during the early 20th Century');
INSERT INTO ThemeName VALUES ('Adventureland', 'Remote jungles of Asia, Africa, South America, Oceania, the Caribbean Islands and the Middle East');
INSERT INTO ThemeName VALUES ('Frontierland', '19th Century American Frontier, American History and North America');
INSERT INTO ThemeName VALUES ('Fantasyland', 'Disney''s animated fairy tale films, Fantasy, the towns and villages of Europe');
INSERT INTO ThemeName VALUES ('Tomorrowland', 'Future, technology, outer space, discovery and science fiction');
INSERT INTO ThemeName VALUES ('New Orleans Square', '19th Century New Orleans');
INSERT INTO ThemeName VALUES ('Critter Country', 'Land of bears and other animals');
INSERT INTO ThemeName VALUES ('Mickey''s Toontown', 'Mickey Mouse universe');
INSERT INTO ThemeName VALUES ('Star Wars: Galaxy''s Edge', 'Star Wars');
INSERT INTO ThemeName VALUES ('Buena Vista Street', '20th Century Art Deco/Mission street');
INSERT INTO ThemeName VALUES ('Pixar Pier', 'Pixar/A Victorian era seaside amusement park');
INSERT INTO ThemeName VALUES ('Paradise Gardens Park', 'A Victorian era seaside amusement park');
INSERT INTO ThemeName VALUES ('Grizzly Peak', '1950s National Recreation Area');
INSERT INTO ThemeName VALUES ('Hollywood Land', '1930s Hollywood');
INSERT INTO ThemeName VALUES ('Avengers Campus', 'Marvel Cinematic Universe');
INSERT INTO ThemeName VALUES ('Cars Land', 'Cars, Radiator Springs');
INSERT INTO ThemeName VALUES ('Adventure Isle', 'Remote jungles of Asia, Africa, South America, Oceania, the Caribbean Islands and the Middle East');

INSERT INTO ThemeParkLand VALUES (1, 1, 'Main Street, U.S.A.', 1955);
INSERT INTO ThemeParkLand VALUES (1, 2, 'Adventureland', 1955);
INSERT INTO ThemeParkLand VALUES (1, 3, 'Frontierland', 1955);
INSERT INTO ThemeParkLand VALUES (1, 4, 'Fantasyland', 1955);
INSERT INTO ThemeParkLand VALUES (1, 5, 'Tomorrowland', 1955);
INSERT INTO ThemeParkLand VALUES (1, 6, 'New Orleans Square', 1966);
INSERT INTO ThemeParkLand VALUES (1, 7, 'Critter Country', 1972);
INSERT INTO ThemeParkLand VALUES (1, 8, 'Mickey''s Toontown', 1993);
INSERT INTO ThemeParkLand VALUES (1, 9, 'Star Wars: Galaxy''s Edge', 2019);
INSERT INTO ThemeParkLand VALUES (2, 10, 'Buena Vista Street', 2001);
INSERT INTO ThemeParkLand VALUES (2, 11, 'Pixar Pier', 2001);
INSERT INTO ThemeParkLand VALUES (2, 12, 'Paradise Gardens Park', 2001);
INSERT INTO ThemeParkLand VALUES (2, 13, 'Grizzly Peak', 2001);
INSERT INTO ThemeParkLand VALUES (2, 14, 'Hollywood Land', 2001);
INSERT INTO ThemeParkLand VALUES (2, 15, 'Cars Land', 2012);
INSERT INTO ThemeParkLand VALUES (2, 16, 'Avengers Campus', 2021);
INSERT INTO ThemeParkLand VALUES (3, 6, 'Fantasyland', 1971);
INSERT INTO ThemeParkLand VALUES (3, 7, 'Tomorrowland', 1971);
INSERT INTO ThemeParkLand VALUES (7, 5, 'Fantasyland', 1983);
INSERT INTO ThemeParkLand VALUES (9, 4, 'Fantasyland', 1992);
INSERT INTO ThemeParkLand VALUES (11, 3, 'Fantasyland', 2005);
INSERT INTO ThemeParkLand VALUES (12, 3, 'Fantasyland', 2016);


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
INSERT INTO IsPartOf VALUES (3, 7, 1);

INSERT INTO RideTypeMinimumHeight VALUES (122, 'Big Drops');
INSERT INTO RideTypeMinimumHeight VALUES (117, 'Medium Drops');
INSERT INTO RideTypeMinimumHeight VALUES (107, 'Small Drops');
INSERT INTO RideTypeMinimumHeight VALUES (102, 'Mini Drops');
INSERT INTO RideTypeMinimumHeight VALUES (0, 'All Heights');

INSERT INTO RideAvgWaitTime VALUES (1, 102, 50);
INSERT INTO RideAvgWaitTime VALUES (2, 122, 50);
INSERT INTO RideAvgWaitTime VALUES (3, 102, 35);
INSERT INTO RideAvgWaitTime VALUES (4, 0, 40);
INSERT INTO RideAvgWaitTime VALUES (5, 0, 25);

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

INSERT INTO Account VALUES (001, 'Celine', 'celine@ubc.ca', TO_DATE('2003-11-14', 'YYYY-MM-DD'));
INSERT INTO Account VALUES (002, 'Brandon', 'brandon@ubc.ca', TO_DATE('2001-06-29', 'YYYY-MM-DD'));
INSERT INTO Account VALUES (003, 'Josh', 'josh@ubc.ca', TO_DATE('2001-04-24', 'YYYY-MM-DD'));
INSERT INTO Account VALUES (004, 'Melissa', 'melissa@ubc.ca', TO_DATE('2001-09-15', 'YYYY-MM-DD'));
INSERT INTO Account VALUES (005, 'Rachael', 'rachael@ubc.ca', TO_DATE('1975-01-01', 'YYYY-MM-DD'));

INSERT INTO Reserve VALUES (001, 1, 4, TO_DATE('2023-11-06 19:00:00', 'YYYY-MM-DD HH24:MI:SS'));
INSERT INTO Reserve VALUES (002, 5, 8, TO_DATE('2023-12-08 20:15:00', 'YYYY-MM-DD HH24:MI:SS'));
INSERT INTO Reserve VALUES (003, 3, 2, TO_DATE('2024-06-29 18:30:00', 'YYYY-MM-DD HH24:MI:SS'));
INSERT INTO Reserve VALUES (001, 4, 1, TO_DATE('2024-01-12 10:30:00', 'YYYY-MM-DD HH24:MI:SS'));
INSERT INTO Reserve VALUES (001, 5, 10, TO_DATE('2025-05-30 20:45:00', 'YYYY-MM-DD HH24:MI:SS'));

INSERT INTO TicketAtDisneyResortOwnedByAccount VALUES (111, 'Shanghai Disneyland Resort', TO_DATE('2023-11-14', 'YYYY-MM-DD'), 001);
INSERT INTO TicketAtDisneyResortOwnedByAccount VALUES (112, 'Shanghai Disneyland Resort', TO_DATE('2023-11-15', 'YYYY-MM-DD'), 001);
INSERT INTO TicketAtDisneyResortOwnedByAccount VALUES (113, 'Disneyland Paris', TO_DATE('2023-10-20', 'YYYY-MM-DD'), 003);
INSERT INTO TicketAtDisneyResortOwnedByAccount VALUES (114, 'Disneyland Resort', TO_DATE('2019-12-21', 'YYYY-MM-DD'), 002);
INSERT INTO TicketAtDisneyResortOwnedByAccount VALUES (115, 'Shanghai Disneyland Resort', TO_DATE('2024-10-21', 'YYYY-MM-DD'), 003);

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