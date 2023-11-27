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
INSERT INTO Attraction VALUES (7, '"Believe...In Holiday Magic" Fireworks Spectacular');
INSERT INTO Attraction VALUES (8, 'A Christmas Fantasy Parade');
INSERT INTO Attraction VALUES (9, 'Disney Junior Dance Party!');
INSERT INTO Attraction VALUES (10, 'Fireworks at Disneyland Park');
INSERT INTO Attraction VALUES (11, 'Star Wars: Millennium Falcon - Smugglers Run');
INSERT INTO Attraction VALUES (12, 'Star Wars: Rise of the Resistance');
INSERT INTO Attraction VALUES (13, 'Alice in Wonderland');
INSERT INTO Attraction VAlUES (14, 'Casey Jr. Circus Train');
INSERT INTO Attraction VAlUES (15, 'Dumbo the Flying Elephant');
INSERT INTO Attraction VAlUES (16, 'Peter Pan''s Flight');
INSERT INTO Attraction VAlUES (17, 'It''s a Small World');


INSERT INTO IsPartOf VALUES (1, 5, 1);
INSERT INTO IsPartOf VALUES (1, 5, 5);
INSERT INTO IsPartOf VALUES (1, 3, 3);
INSERT INTO IsPartOf VALUES (1, 6, 4);
INSERT INTO IsPartOf VALUES (2, 11, 2);
INSERT INTO IsPartOf VALUES (3, 7, 1);
INSERT INTO IsPartOf VALUES (1, 9, 11);
INSERT INTO IsPartOf VALUES (1, 9, 12);
INSERT INTO IsPartOf VALUES (1, 4, 13);
INSERT INTO IsPartOf VALUES (1, 4, 14);
INSERT INTO IsPartOf VALUES (1, 4, 15);
INSERT INTO IsPartOf VALUES (1, 4, 16);
INSERT INTO IsPartOf VALUES (1, 4, 17);

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
INSERT INTO RideAvgWaitTime VALUES (11, 102, 80);
INSERT INTO RideAvgWaitTime VALUES (12, 102, 80);
INSERT INTO RideAvgWaitTime VALUES (13, 0, 25);
INSERT INTO RideAvgWaitTime VALUES (14, 0, 35);
INSERT INTO RideAvgWaitTime VALUES (15, 0, 10);
INSERT INTO RideAvgWaitTime VALUES (16, 0, 45);
INSERT INTO RideAvgWaitTime VALUES (17, 0, 60);

INSERT INTO Event VALUES (6, 'Show');
INSERT INTO Event VALUES (7, 'Fireworks');
INSERT INTO Event VALUES (8, 'Parade');
INSERT INTO Event VALUES (9, 'Show');
INSERT INTO Event VALUES (10, 'Fireworks');

INSERT INTO ShowtimeEvent VALUES (6, 0800, 0815);
INSERT INTO ShowtimeEvent VALUES (6, 0930, 0945);
INSERT INTO ShowtimeEvent VALUES (7, 2400, 2115);
INSERT INTO ShowtimeEvent VALUES (8, 1300, 1340);
INSERT INTO ShowtimeEvent VALUES (9, 1015, 1045);
INSERT INTO ShowtimeEvent VALUES (9, 1115, 1145);
INSERT INTO ShowtimeEvent VALUES (10, 2030, 2040);

INSERT INTO ShowtimeDuration VALUES (0800, 0815, 15);
INSERT INTO ShowtimeDuration VALUES (0930, 0945, 15);
INSERT INTO ShowtimeDuration VALUES (2400, 2115, 15);
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