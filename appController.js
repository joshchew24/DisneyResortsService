const express = require('express');
const appService = require('./service/appService');
const databaseService = require('./service/databaseService');
const reservationService = require('./service/reservationService');
const landsService = require('./service/landsService');
const themeParkService = require('./service/themeParkService');
const attractionService = require('./service/attractionService');
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

router.get('/demotable', async (req, res) => {
    const tableContent = await appService.fetchDemotableFromDb();
    res.json({data: tableContent});
});

router.post("/initiate-demotable", async (req, res) => {
    const initiateResult = await appService.initiateDemotable();
    if (initiateResult) {
        res.json({ success: true });
    } else {
        res.status(500).json({ success: false });
    }
});

router.post("/insert-demotable", async (req, res) => {
    const { id, name } = req.body;
    const insertResult = await appService.insertDemotable(id, name);
    if (insertResult) {
        res.json({ success: true });
    } else {
        res.status(500).json({ success: false });
    }
});

router.post("/update-name-demotable", async (req, res) => {
    const { oldName, newName } = req.body;
    const updateResult = await appService.updateNameDemotable(oldName, newName);
    if (updateResult) {
        res.json({ success: true });
    } else {
        res.status(500).json({ success: false });
    }
});

router.post("/update-reservation", async (req, res) => {
    const { accountId, restaurantId, newPartySize, newDate, newTime } = req.body;
    const updateResult = await reservationService.updateReservation(accountId, restaurantId, newPartySize, newDate, newTime);
    if (updateResult) {
        res.json({ success: true });
        console.log(updateResult);
    } else {
        res.status(500).json({ success: false });
    }
});

router.get('/count-demotable', async (req, res) => {
    const tableCount = await appService.countDemotable();
    if (tableCount >= 0) {
        res.json({ 
            success: true,  
            count: tableCount
        });
    } else {
        res.status(500).json({ 
            success: false, 
            count: tableCount
        });
    }
});

router.post("/insert-reservation", async (req, res) => {
    const { accountId, restaurantId, partySize, date, time } = req.body;
    const insertResult = await reservationService.insertReservation(accountId, restaurantId, partySize, date, time);
    if (insertResult) {
        res.json({ success: true });
    } else {
        res.status(500).json({ success: false });
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

//Celine

router.get('/project-foodtable', async (req, res) => {
    const tableContent = await appService.fetchafoodtableFromDb();
    res.json({data: tableContent});
});


//Celine
router.get('/project-allTableDropdown', async (req, res) => {
    const tableContent = await appService.fetchAllTablesFromDb();
    res.json({data: tableContent});
});


//Celine
router.get('/project-selectedTable', async (req, res) => {
    const myOption = req.query.selectedOption;
    const tableContent = await appService.fetchMyTableFromDb(myOption);

    if (tableContent) {
        res.json({
            success: true,
            result: tableContent
        });
    } else {
        res.status(500).json({ success: false });
    }
});

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

module.exports = router;