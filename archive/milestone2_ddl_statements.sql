/*
DisneyResortAddress(disneyResortName: varchar, address: varchar)
*/
CREATE TABLE DisneyResortAddress(
    disneyResortName VARCHAR PRIMARY KEY,
    address VARCHAR
)

/*
DisneyResortPostal(disneyResortName: varchar, postalCode: varchar)
*/
CREATE TABLE DisneyResortPostal(
    disneyResortName VARCHAR PRIMARY KEY,
    postalCode VARCHAR
)

/*
AddressCityCountry(disneyResortName: varchar, address: varchar, city: varchar, country: varchar)
*/
CREATE TABLE AddressCityCountry(
    disneyResortName VARCHAR PRIMARY KEY,
    address VARCHAR,
    city VARCHAR,
    country VARCHAR
)

/*
PostalCodeCity(postalCode: varchar, city: varchar)
*/
CREATE TABLE PostalCodeCity(
    postalCode VARCHAR PRIMARY KEY,
    city VARCHAR
)

/*
PostalCodeCountry(postalCode: varchar, country: varchar)
*/
CREATE TABLE PostalCodeCountry(
    postalCode VARCHAR PRIMARY KEY,
    country VARCHAR
)

/*
ComprisingThemePark(themeParkId: integer, name: char[20], disneyResortName: char[20])
PK: themeParkId
CK: themeParkId, disneyResortName
FK: disneyResortName references DisneyResortAddress(disneyResortName)
Not Null (participation): disneyResortName
Not Null (semantic): name
*/
CREATE TABLE ComprisingThemePark(
    themeParkId INT PRIMARY KEY,
    name VARCHAR UNIQUE NOT NULL,
    disneyResortName VARCHAR NOT NULL,
    FOREIGN KEY (disneyResortName) 
        REFERENCES DisneyResortAddress(disneyResortName)
        ON DELETE CASCADE
        ON UPDATE CASCADE
)

/*
LandTheme(themeParkId: integer, landId: integer, theme: varchar)
*/
CREATE TABLE LandTheme(
    themeParkId INT,
    landId INT,
    theme VARCHAR,
    PRIMARY KEY(themeParkId, landId),
    FOREIGN KEY (themeParkId)
        REFERENCES ComprisingThemePark(themeParkId)
        ON DELETE CASCADE
        ON UPDATE CASCADE
)

/*
LandYearOpen(themeParkId: integer, landId: integer, yearOpen: integer)
FK: themeParkId references ComprisingThemePark(themeParkId)
*/
CREATE TABLE LandYearOpen(
    themeParkId INT,
    landId INT,
    theme VARCHAR,
    PRIMARY KEY(themeParkId, landId),
    FOREIGN KEY (themeParkId)
        REFERENCES ComprisingThemePark(themeParkId)
        ON DELETE CASCADE
        ON UPDATE CASCADE
)

/*
ThemeParkThemeName(themeParkId: integer, theme: varchar, name: varchar)
PK: {themeParkId, theme}
CK: {themeParkId, theme}
FK: themeParkId references ComprisingThemePark(themeParkId)
*/
CREATE TABLE ThemeParkThemeName(
    themeParkId INT,
    theme VARCHAR,
    name VARCHAR,
    PRIMARY KEY (themeParkId, theme),
    FOREIGN KEY (themeParkId)
        REFERENCES ComprisingThemePark(themeParkId)
        ON DELETE CASCADE
        ON UPDATE CASCADE
)

/*
IsPartOf(themeParkId: integer, landId: integer, attractionId: integer)
PK: {themeParkId, landId, attractionId}
CK: {themeParkId, landId, attractionId}
FK: themeParkId references LandTheme(themeParkId), landId references LandTheme(landId), attractionIdreferences Attraction(attractionId)
*/
CREATE TABLE IsPartOf(
    themeParkId INT,
    landId INT,
    attractionId INT,
    PRIMARY KEY (themeParkId, landId, attractionId),
    FOREIGN KEY (themeParkId)
        REFERENCES LandTheme(themeParkId),
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
)

/*
Attraction(attractionId: integer, name: char[20])
PK: attractionId
CK: attractionId, name
Not Null (semantic): name
*/
CREATE TABLE Attraction(
    attractionId INT PRIMARY KEY,
    name VARCHAR UNIQUE NOT NULL,
)

/*
RideMinimumHeight(attractionId: integer, minimumHeight: integer)
*/
CREATE TABLE RideMinimumHeight(
    attractionId INT PRIMARY KEY,
    minimumHeight INT,
    FOREIGN KEY (attractionId)
        REFERENCES Attraction(attractionId)
        ON DELETE CASCADE
        ON UPDATE CASCADE
)

/*
RideAvgWaitTime(attractionId: integer, avgWaitTime: integer)
FK: attractionId references Attraction(attractionId)
*/
CREATE TABLE RideAvgWaitTime(
    attractionId INT PRIMARY KEY,
    avgWaitTime INT,
    FOREIGN KEY (attractionId)
        REFERENCES Attraction(attractionId)
        ON DELETE CASCADE
        ON UPDATE CASCADE
)

/*
MinimumHeightRideType(minimumHeight: integer, rideType: varchar)
PK: minimumHeight
CK: minimumHeight
*/
CREATE TABLE MinimumHeightRideType(
    minimumHeight INT PRIMARY KEY,
    rideType VARCHAR
)

/*
Event(attractionId: integer, eventType: char[20])
PK: attractionId
CK: attractionId
FK: attractionId references Attraction(attractionId)
*/
CREATE TABLE Event(
    attractionId INT PRIMARY KEY,
    eventType VARCHAR,
    FOREIGN KEY (attractionId)
        REFERENCES Attraction(attractionId)
        ON DELETE CASCADE
        ON UPDATE CASCADE
)

/*
ShowtimeEvent(attractionId: integer, startTime: integer, endTime: integer)
PK: {attractionId, startTime}
CK: {attractionId, startTime}
FK: attractionId references Event(attractionId)
*/
CREATE TABLE ShowtimeEvent(
    attractionId INT,
    startTime INT,
    endTime INT,
    PRIMARY KEY (attractionId, startTime),
    FOREIGN KEY (attractionId)
        REFERENCES Event(attractionId)
        ON DELETE CASCADE
        ON UPDATE CASCADE
)

/*
ShowtimeDuration(startTime: integer, endTime: integer, duration: integer)
PK: {startTime, endTime}
CK: {startTime, endTime}
*/
CREATE TABLE ShowtimeDuration(
    startTime INT,
    endTime INT,
    duration INT,
    PRIMARY KEY (startTime, endTime)
)

/*
FeatureRestaurant(restaurantId: integer, name: char[20], maxOccupancy: integer, themeParkId: integer, landId: integer)
PK: restaurantId
CK: restaurantId
FK: themeParkId references LandTheme(themeParkId), landId references LandTheme(LandId)
Not Null (semantic): name
*/
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
)

/*
serve(restaurantId: char[100], foodName: char[100])
PK: {restaurantId, foodName}
CK: {restaurantId, foodName}
FK: restaurantId references FeatureRestaurant(restaurantId), foodName references Food(foodName)
*/
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
)

/*
Food(foodName: varchar, price: integer)
PK: foodName
CK: foodName
*/
CREATE TABLE Food(
    foodName VARCHAR PRIMARY KEY,
    price INT
)

/*
Account(accountId: integer, name: varchar, email: varchar, birthDate: integer)
PK: accountId
CK: accountId, email
*/
CREATE TABLE Account(
    accountId INT PRIMARY KEY,
    name VARCHAR,
    email VARCHAR UNIQUE NOT NULL,
    birthDate INT
)

/*
Reserve(accountId: integer, restaurantId: integer, time: integer)
PK: {accountId, restaurantId}
CK: {accountId, restaurantId}
FK: accountId references Account(accountId), restaurantId references FeatureRestaurant(restaurantId)
*/
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
)

/*
TicketAtDisneyResortOwnedByAccount(ticketId: integer, disneyResortName: varchar, entryDate: integer, partySize: integer, accountId: integer)
PK: {ticketId, disneyResortName}
CK: {ticketId, disneyResortName}
FK: disneyResortName references DisneyResortAddress(disneyResortName), accountId references Account(accountId)
Not Null (participation): accountId
!!!
*/
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
)

/*
OpenStore(storeId: integer, themeParkId: integer, landId: integer)
PK: storeId
CK: storeId
FK: themeParkId references LandTheme(themeParkId), landId references LandTheme(landId)
!!!
*/
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
)

/*
sell(storeId: integer, sku: integer)
PK: {storeId, sku}
CK: {storeId, sku}
FK: storeId references OpenStore(storeId), sku references Merchandise(sku)
*/
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
)

/*
Merchandise(sku: integer, name: varchar, price: float)
PK: sku
CK: sku, name
Not Null (semantic): name, price
*/
CREATE TABLE Merchandise(
    sku INT PRIMARY KEY,
    name VARCHAR UNIQUE NOT NULL,
    price FLOAT NOT NULL,
)

