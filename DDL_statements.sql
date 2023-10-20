/*
DisneyResort(disneyResortName: char[20], address: char[20], city: char[20], country: char[20], postalCode: char[20])
PK: disneyResortName
CK: disneyResortName, {address, city, country}
*/
CREATE TABLE DisneyResort(
    disneyResortName CHAR (20) PRIMARY KEY,
    address CHAR (20),
    city CHAR (20),
    country CHAR (20),
    postalCode CHAR (20),
    UNIQUE (address, city, country)
)

/*
ComprisingThemePark(themeParkId: integer, name: char[20], openTime: integer, closeTime: integer, disneyResortName: char[20])
PK: themeParkId
CK: themeParkId, disneyResortName
FK: disneyResortName references DisneyResort(disneyResortName)
Not Null (participation): disneyResortName
Not Null (semantic): name
*/
CREATE TABLE ComprisingThemePark(
    themeParkId INT PRIMARY KEY,
    name CHAR (20) UNIQUE NOT NULL,
    openTime INT,
    closeTime INT,
    disneyResortName CHAR (20) NOT NULL,
    FOREIGN KEY (disneyResortName) 
        REFERENCES DisneyResort(disneyResortName)
        ON DELETE CASCADE
        ON UPDATE CASCADE
)

/*
IsPartOf(themeParkId: integer, landId: integer, attractionId: integer)
PK: {themeParkId, landId, attractionId}
CK: {themeParkId, landId, attractionId}
FK: themeParkId references Land(themeParkId), landId references Land(landId), attractionIdreferences Attraction(attractionId)
*/
CREATE TABLE IsPartOf(
    themeParkId INT,
    landId INT,
    attractionId INT,
    PRIMARY KEY (themeParkId, landId, attractionId),
    FOREIGN KEY (themeParkId)
        REFERENCES ComprisingThemePark(themeParkId),
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY (landId)
        REFERENCES Land(landId)
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
    name CHAR (20) UNIQUE NOT NULL,
)

/*
Ride(attractionId: integer, rideType: char[20], minimumHeight: integer, avgWaitTime: integer, openTime: integer, closeTime: integer)
PK: attractionId
CK: attractionId
FK: attractionId references Attraction(attractionId)
*/
CREATE TABLE Ride(
    attractionId INT PRIMARY KEY,
    rideType CHAR (20),
    minimumHeight INT,
    avgWaitTime INT,
    openTime INT,
    closeTime INT,
    FOREIGN KEY (attractionId)
        REFERENCES Attraction(attractionId)
        ON DELETE CASCADE
        ON UPDATE CASCADE
)

/*
Event(attractionId: integer, eventType: char[20])
PK: attractionId
CK: attractionId
FK: attractionId references Attraction(attractionId)
*/
CREATE TABLE Event(
    attractionId INT PRIMARY KEY,
    eventType CHAR (20),
    FOREIGN KEY (attractionId)
        REFERENCES Attraction(attractionId)
        ON DELETE CASCADE
        ON UPDATE CASCADE
)

/*
ShowtimeShowingEvent(attractionId: integer, startTime: integer, endTime: integer, duration: integer)
PK: {attractionId, startTime}
CK: {attractionId, startTime}
FK: attractionId references Event(attractionId)
*/
CREATE TABLE ShowtimeShowingEvent(
    attractionId INT,
    startTime INT,
    endTime INT,
    duration INT,
    PRIMARY KEY (attractionId, startTime),
    FOREIGN KEY attractionId
        REFERENCES Event(attractionId)
        ON DELETE CASCADE
        ON UPDATE CASCADE
)

/*
FeatureRestaurant(restaurantId: integer, name: char[20], maxOccupancy: integer, openTime: integer: closeTime: integer, themeParkId: integer, landId: integer)
PK: restaurantId
CK: restaurantId
FK: themeParkId references Land(themeParkId), landId references Land(LandId)
Not Null (participation): themeParkId, landId
Not Null (semantic): name
*/
CREATE TABLE FeatureRestaurant(
    restaurantId INT PRIMARY KEY,
    name CHAR (20) NOT NULL,
    maxOccupancy INT,
    openTime INT,
    closeTime INT,
    themeParkId INT NOT NULL,
    landId INT NOT NULL,
    FOREIGN KEY (themeParkId)
        REFERENCES ComprisingThemePark(themeParkId),
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY (landId)
        REFERENCES Land(landId)
        ON DELETE CASCADE
        ON UPDATE CASCADE
)