const appService = require("./appService.js");

async function findLandsInAllDisneyResorts() {
    return await appService.withOracleDB(async (connection) => {
        const query = 
            `
            SELECT TN.name
            FROM ThemeName TN
            WHERE NOT EXISTS (
            SELECT D.disneyResortName
            FROM DisneyResortAddress D
            MINUS
            SELECT C.disneyResortName
            FROM ComprisingThemePark C, ThemeParkLand T
            WHERE C.themeParkId = T.themeParkId AND TN.name = T.name)
            `
        ;
        const result = await connection.execute(query);
        return result.rows;
    }).catch(() => {
        return -1;
    });
}

// Nested Aggregation with Group By Query
async function findMinAvgWaitTime(themeParkId) {
    return appService.withOracleDB(async (connection) => {
        const result = await connection.execute(
            `
            WITH AvgWaitTimePerLand(landId, landName, avgWaitTime) AS
            (SELECT landId, L.name, AVG(WT.avgWaitTime)
            FROM ThemeParkLand L
            NATURAL JOIN IsPartOf I
            NATURAL JOIN RideAvgWaitTime WT
            WHERE themeParkId = :themeParkId
            GROUP BY landId, L.name)
            SELECT landName, avgWaitTime
            FROM AvgWaitTimePerLand
            WHERE avgWaitTime = (SELECT MIN(avgWaitTime) FROM AvgWaitTimePerLand)
            `,
            {themeParkId}
        );
        console.log("nested aggregation with group by query: successfully retrieved " + Object.keys(result.rows).length + " tuples from the database");
        return result.rows;
    });
}

module.exports = {
    findLandsInAllDisneyResorts,
    findMinAvgWaitTime
}