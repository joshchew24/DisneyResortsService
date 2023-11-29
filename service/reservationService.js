const appService = require("./appService.js");

async function insertReservation(accountId, restaurantId, partySize, date, time) {
    return await appService.withOracleDB(async (connection) => {
        const dateTimeString = date + "T" + time + ":00";
        let dateTime = new Date(Date.parse(dateTimeString));

        const result = await connection.execute(
            `INSERT INTO RESERVE VALUES (:accountId, :restaurantId, :partySize, :dateTime)`,
            [accountId, restaurantId, partySize, dateTime],
            { autoCommit: true }
        );

        return result.rowsAffected && result.rowsAffected > 0;
    }).catch(() => {
        return false;
    });
}

async function updateReservation(accountId, restaurantId, newPartySize, newDate, newTime) {
    return await appService.withOracleDB(async (connection) => {
        const dateTimeString = newDate + "T" + newTime + ":00";
        let dateTime = new Date(Date.parse(dateTimeString));
        const result = await connection.execute(
            `
            UPDATE Reserve 
            SET partySize=:newPartySize, time=:dateTime
            WHERE accountId=:accountId AND restaurantId=:restaurantId
            `,
            [newPartySize, dateTime, accountId, restaurantId],
            { autoCommit: true }
        );

        return result.rowsAffected && result.rowsAffected > 0;
    }).catch(() => {
        return false;
    });
}


async function deleteReservationFromDb(accountId, restaurantId) {
    return await appService.withOracleDB(async (connection) => {
        const result = await connection.execute(
            `DELETE FROM Reserve WHERE accountId = :accountId AND restaurantId = :restaurantId`,
            [accountId, restaurantId], // Use bind parameters
            { autoCommit: true }
        );
        console.log("Received accountId:", accountId, "Received restaurantId:", restaurantId);
        return result.rowsAffected && result.rowsAffected > 0;
        
    }).catch (() => {
        console.error('Error deleting reservation:', error);
        return false; // Return false in case of an error
    })
}


module.exports = {
    insertReservation,
    updateReservation,
    deleteReservationFromDb,
}