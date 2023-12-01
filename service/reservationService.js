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
    }).catch((error) => {
        let errorMessage = "Error inserting data.";
        const errorString = error.toString()
        if (errorString.includes("ORA-02291")) {
            errorMessage = "Error inserting data. Ensure IDs exist!";
        } else if (errorString.includes("ORA-00001")) {
            errorMessage = "Error inserting data. Cannot insert duplicate reservations!";
        }
        throw errorMessage;
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


async function getAllReservations() {
    return await appService.withOracleDB(async (connection) => {
        const result = await connection.execute(
            `
            SELECT accountId, restaurantId, partySize, TO_CHAR(time, 'YYYY-MM-DD HH24:MI:SS') AS formatted_date
            FROM reserve
            `
        );
        console.log("Successfully retrieved all reservations from database");
        return result.rows;
    })
    .catch(() => {
        console.error('Error retrieving all reservations:', error);
        return false; // Return false in case of an error
    })
}

module.exports = {
    insertReservation,
    updateReservation,
    deleteReservationFromDb,
    getAllReservations
}