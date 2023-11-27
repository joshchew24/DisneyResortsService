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

CREATE TABLE Event(
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
    FOREIGN KEY (attractionId) REFERENCES Event ON DELETE CASCADE
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