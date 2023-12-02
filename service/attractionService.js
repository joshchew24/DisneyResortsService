const appService = require("./appService.js");

async function selectAttraction(whereClause) {
    return await appService.withOracleDB(async (connection) => {
        const query = 'SELECT * FROM IsPartOf WHERE ' + whereClause;
        const result = await connection.execute(query);
        return result.rows;
    }).catch(() => {
        return -1;
    });
}

async function getMinimumHeights() {
    return await appService.withOracleDB(async (connection) => {
        const result = await connection.execute(
            `
            SELECT minimumHeight
            FROM RideTypeMinimumHeight
            `
        );
        console.log("Successfully retrieved all minimum heights from database");
        return result.rows;
    })
    .catch(() => {
        console.error('Error retrieving all minimum heights:', error);
        return false; // Return false in case of an error
    })
}

async function updateAttractionMinimumHeightAndAvgWaitTime(attractionId, minimumHeight, avgWaitTime) {
    return await appService.withOracleDB(async (connection) => {
        const query = 

            `
            UPDATE RideAvgWaitTime 
            SET minimumHeight=${minimumHeight}, avgWaitTime=${avgWaitTime}
            WHERE attractionId=${attractionId}
            `
        ;
        const result = await connection.execute(query);

        await connection.execute("COMMIT");

        console.log("rowsAffected: " + result.rowsAffected);

        return result.rowsAffected && result.rowsAffected > 0;
    }).catch((error) => {
        console.log("error: " + error);
        return false;
    });
}

async function getAllRides() {
    return await appService.withOracleDB(async (connection) => {
        const result = await connection.execute(
            `
            SELECT *
            FROM RideAvgWaitTime
            `
        );
        console.log("Successfully retrieved all rides from database");
        return result.rows;
    })
    .catch(() => {
        console.error('Error retrieving all rides:', error);
        return false; // Return false in case of an error
    })
}

module.exports = {
    selectAttraction,
    updateAttractionMinimumHeightAndAvgWaitTime,
    getAllRides,
    getMinimumHeights
}