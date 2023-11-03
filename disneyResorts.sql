
CREATE TABLE DisneyResortAddress(
    disneyResortName VARCHAR PRIMARY KEY,
    address VARCHAR
);

CREATE TABLE DisneyResortPostal(
    disneyResortName VARCHAR PRIMARY KEY,
    postalCode VARCHAR
);

CREATE TABLE AddressCityCountry(
    disneyResortName VARCHAR PRIMARY KEY,
    address VARCHAR,
    city VARCHAR,
    country VARCHAR
);

CREATE TABLE PostalCodeCity(
    postalCode VARCHAR PRIMARY KEY,
    city VARCHAR
);

CREATE TABLE PostalCodeCountry(
    postalCode VARCHAR PRIMARY KEY,
    country VARCHAR
);

CREATE TABLE ComprisingThemePark(
    themeParkId INT PRIMARY KEY,
    name VARCHAR UNIQUE NOT NULL,
    disneyResortName VARCHAR NOT NULL,
    FOREIGN KEY (disneyResortName)
        REFERENCES DisneyResort(disneyResortName)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

CREATE TABLE LandTheme(
    themeParkId INT,
    landId INT,
    theme VARCHAR,
    PRIMARY KEY(themeParkId, landId),
    FOREIGN KEY (themeParkId)
        REFERENCES ComprisingThemePark(themeParkId)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

CREATE TABLE LandYearOpen(
    themeParkId INT,
    landId INT,
    theme VARCHAR,
    PRIMARY KEY(themeParkId, landId),
    FOREIGN KEY (themeParkId)
        REFERENCES ComprisingThemePark(themeParkId)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

CREATE TABLE ThemeParkThemeName(
    themeParkId INT,
    theme VARCHAR,
    name VARCHAR,
    PRIMARY KEY (themeParkId, theme),
    FOREIGN KEY (themeParkId)
        REFERENCES ComprisingThemePark(themeParkId)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

CREATE TABLE IsPartOf(
    themeParkId INT,
    landId INT,
    attractionId INT,
    PRIMARY KEY (themeParkId, landId, attractionId),
    FOREIGN KEY (themeParkId)
        REFERENCES LandTheme(themeParkId)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY (landId)
        REFERENCES LandTheme(landId)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY (attractionId)
        REFERENCES Attraction(attractionId)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

CREATE TABLE Attraction(
    attractionId INT PRIMARY KEY,
    name VARCHAR UNIQUE NOT NULL,
);

CREATE TABLE RideMinimumHeight(
    attractionId INT PRIMARY KEY,
    minimumHeight INT,
    FOREIGN KEY (attractionId)
        REFERENCES Attraction(attractionId)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

CREATE TABLE RideAvgWaitTime(
    attractionId INT PRIMARY KEY,
    avgWaitTime INT,
    FOREIGN KEY (attractionId)
        REFERENCES Attraction(attractionId)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

CREATE TABLE MinimumHeightRideType(
    minimumHeight INT PRIMARY KEY,
    rideType VARCHAR
);

CREATE TABLE Event(
    attractionId INT PRIMARY KEY,
    eventType VARCHAR,
    FOREIGN KEY (attractionId)
        REFERENCES Attraction(attractionId)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

CREATE TABLE ShowtimeEvent(
    attractionId INT,
    startTime INT,
    endTime INT,
    PRIMARY KEY (attractionId, startTime),
    FOREIGN KEY (attractionId)
        REFERENCES Event(attractionId)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

CREATE TABLE ShowtimeDuration(
    startTime INT,
    endTime INT,
    duration INT,
    PRIMARY KEY (startTime, endTime)
);

CREATE TABLE FeatureRestaurant(
    restaurantId INT PRIMARY KEY,
    name VARCHAR NOT NULL,
    maxOccupancy INT,
    themeParkId INT,
    landId INT,
    FOREIGN KEY (themeParkId)
        REFERENCES LandTheme(themeParkId),
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY (landId)
        REFERENCES LandTheme(landId)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

CREATE TABLE serve(
    restaurantId VARCHAR,
    foodName VARCHAR,
    PRIMARY KEY (restaurantId, foodName)
    FOREIGN KEY (restaurantId)
        REFERENCES FeatureRestaurant(restaurantId)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY (foodName)
        REFERENCES Food(name)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

CREATE TABLE Food(
    foodName VARCHAR PRIMARY KEY,
    price INT
);

CREATE TABLE Account(
    accountId INT PRIMARY KEY,
    name VARCHAR,
    email VARCHAR UNIQUE NOT NULL,
    birthDate INT
);

CREATE TABLE Reserve(
    accountId INT,
    restaurantId INT,
    PRIMARY KEY (accountId, restaurantId),
    FOREIGN KEY (accountId)
        REFERENCES Account(accountId)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY (restaurantId)
        REFERENCES FeatureRestaurant(restaurantId)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

CREATE TABLE TicketAtDisneyResortOwnedByAccount(
    ticketId INT,
    disneyResortName VARCHAR DEFAULT 'none',
    entryDate INT,
    accountId INT NOT NULL DEFAULT -1,
    PRIMARY KEY (ticketId, disneyResortName)
    FOREIGN KEY (disneyResortName)
        REFERENCES DisneyResortAddress(disneyResortName)
        ON DELETE SET DEFAULT
        ON UPDATE CASCADE,
    FOREIGN KEY (accountId)
        references Account(accountId)
        ON DELETE SET DEFAULT
        ON UPDATE CASCADE
);

CREATE TABLE OpenStore(
    storeId INT PRIMARY KEY,
    themeParkId INT,
    landId INT,
    FOREIGN KEY (themeParkId)
        REFERENCES LandTheme(themeParkId),
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY (landId)
        REFERENCES LandTheme(landId)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

CREATE TABLE sell(
    storeId INT,
    sku INT,
    PRIMARY KEY (storeId, sku),
    FOREIGN KEY (storeId)
        REFERENCES OpenStore(storeId)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY (sku)
        REFERENCES Merchandise(sku)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
);

CREATE TABLE Merchandise(
    sku INT PRIMARY KEY,
    name VARCHAR UNIQUE NOT NULL,
    price FLOAT NOT NULL,
);