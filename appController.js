const express = require('express');
const appService = require('./service/appService');
const databaseService = require('./service/databaseService');
const reservationService = require('./service/reservationService');
const landsService = require('./service/landsService');
const themeParkService = require('./service/themeParkService');
const attractionService = require('./service/attractionService');
const storeService = require('./service/storeService');
const router = express.Router();

// ----------------------------------------------------------
// API endpoints
// Modify or extend these routes based on your project's needs.
router.get('/check-db-connection', async (req, res) => {
    const isConnect = await appService.testOracleConnection();
    if (isConnect) {
        res.send('connected');
    } else {
        res.send('unable to connect');
    }
});

// router.post("/update-reservation", async (req, res) => {
//     const { accountId, restaurantId, newPartySize, newDate, newTime } = req.body;
//     const updateResult = await reservationService.updateReservation(accountId, restaurantId, newPartySize, newDate, newTime);
//     if (updateResult) {
//         res.json({ success: true });
//         console.log(updateResult);
//     } else {
//         res.status(500).json({ success: false });
//     }
// });

router.post("/update-ride-minimumHeight-and-avgWaitTime", async (req, res) => {
    const { attractionId, newMinimumHeight, newAvgWaitTime } = req.body;
    const updateResult = await attractionService.updateAttractionMinimumHeightAndAvgWaitTime(attractionId, newMinimumHeight, newAvgWaitTime);
    if (updateResult) {
        res.json({ success: true });
        console.log(updateResult);
    } else {
        console.log("got here error");
        res.status(500).json({ success: false });
    }
});

router.post("/reset-database", async (req, res) => {
    const resetResult = await databaseService.resetDatabase();
    if (resetResult) {
        res.json({ success: true });
    } else {
        res.status(500).json({ success: false });
    }
});

router.post("/insert-reservation", async (req, res) => {
    const { accountId, restaurantId, partySize, date, time } = req.body;
    try {
        const insertResult = await reservationService.insertReservation(accountId, restaurantId, partySize, date, time);
        if (insertResult) {
            res.json({ success: true });
        }
    } catch (error) {
        res.status(500).json({ success: false, errorMessage: error });
    }
});

router.get("/select-attraction", async (req, res) => {
    const whereClause = req.query.where;
    const selectResult = await attractionService.selectAttraction(whereClause);
    if (selectResult) {
        res.json({
            success: true,
            result: selectResult
        });
    } else {
        res.status(500).json({ success: false });
    }
});

router.get('/find-lands-that-appear-in-all-disney-resorts', async (req, res) => {
    const lands = await landsService.findLandsInAllDisneyResorts();
    if (lands) {
        res.json({
            success: true,
            result: lands
        });
    } else {
        res.status(500).json({ success: false });
    }
});

router.get("/find-number-of-rides-at-theme-park-with-minimum-height-less-than-or-equal-to-height", async (req, res) => {
    const themeParkId = req.query.themeParkId;
    const height = req.query.height;
    const tableContent = await themeParkService.findNumberOfRidesAtThemeParkWithMinimumHeightLessThanOrEqualToHeight(themeParkId, height);
    if (tableContent) {
        res.json({
            success: true,
            result: tableContent
        });
    } else {
        res.status(500).json({ success: false });
    }
});


// Project All Table Droptown Options
router.get('/project-allTableDropdown', async (req, res) => {
    const tableContent = await appService.fetchAllTablesFromDb();
    res.json({data: tableContent});
});

router.get('/get-minimumHeights', async (req, res) => {
    const tableContent = await attractionService.getMinimumHeights();
    res.json({data: tableContent});
});


// Project Selected Table Data
router.get('/project-selectedTable', async (req, res) => {
    
    const selectedTable = req.query.selectedTable;
    const selectedAttributes = req.query.attributes ? req.query.attributes.split(',') : null;

    try {
        const tableContent = await appService.fetchMyTableFromDb(selectedTable, selectedAttributes);

        if (tableContent) {
            res.json({
                success: true,
                result: tableContent
            });
        } else {
            res.status(404).json({ success: false, message: 'No data found for the selected table' });
        }
    } catch (error) {
        console.error('Error fetching table data:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});

// Selected Table Headers (Attribute Title)
router.get('/selectedTable-description', async (req, res) => {
    const myOption = req.query.selectedOption;
    const tableContent = await appService.fetchMyTableDescription(myOption);

    if (tableContent) {
        res.json({
            success: true,
            result: tableContent
        });
    } else {
        res.status(500).json({ success: false });
    }
});


// // Delete Reservation
// router.post('/delete-reservation', async (req,res) => {
//     const { accountId, restaurantId } = req.body;
//     const deleteReservationResult = await reservationService.deleteReservationFromDb(accountId,restaurantId);

//     if (deleteReservationResult) {
//         res.json({ success: true });
//     } else {
//         res.status(500).json({ success: false });
//     }
// });

// Delete Account
router.delete('/delete-account', async (req,res) => {
    const { accountId } = req.body;
    const deleteAccountResult = await appService.deleteAccount(accountId);

    if (deleteAccountResult) {
        res.json({ success: true });
    } else {
        res.status(500).json({ success: false });
    }
});

// Join Query
router.get('/find-stores', async (req, res) => {
    const themeParkId = req.query.themeParkId;
    const findStoreResult = await storeService.getListOfStoresInThemePark(themeParkId);
    if (findStoreResult) {
        res.json({
            success: true,
            result: findStoreResult
        });
    } else {
        res.status(500).json({ success: false });
    }
});

// aggregation with group by query
router.get('/find-avg-prices', async (req, res) => {
    const themeParkId = req.query.themeParkId;
    const findAvgPricesResult = await storeService.findAvgPrices(themeParkId);
    if (findAvgPricesResult) {
        res.json({
            success: true,
            result: findAvgPricesResult
        });
    } else {
        res.status(500).json({ success: false });
    }
});

// nested aggregation with group by query
router.get('/find-min-avg-wt', async (req, res) => {
    const themeParkId = req.query.themeParkId;
    const findMinAvgWaitTimeResult = await landsService.findMinAvgWaitTime(themeParkId);
    if (findMinAvgWaitTimeResult) {
        res.json({
            success: true,
            result: findMinAvgWaitTimeResult
        });
    } else {
        res.status(500).json({ success: false });
    }
});

// // get all reservations
// router.get('/get-all-reservations', async (req, res) => {
//     const reservationsResult = await reservationService.getAllReservations();
//     if (reservationsResult) {
//         res.json({
//             success: true,
//             result: reservationsResult
//         });
//     } else {
//         res.status(500).json({ success: false });
//     }
// });

router.get('/get-all-rides', async (req, res) => {
    const ridesResult = await attractionService.getAllRides();
    if (ridesResult) {
        res.json({
            success: true,
            result: ridesResult
        });
    } else {
        res.status(500).json({ success: false });
    }
});

router.post("/insert-merchandise", async (req, res) => {
    const { storeId, sku, name, price } = req.body;
    try {
        const insertResult = await storeService.insertMerchandise(storeId, sku, name, price);
        if (insertResult) {
            res.json({ success: true });
        }
    } catch (error) {
        res.status(500).json({ success: false, errorMessage: error });
    }
});


module.exports = router;