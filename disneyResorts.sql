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