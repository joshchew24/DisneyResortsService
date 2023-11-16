const appService = require("./appService.js");

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

module.exports = {
    updateReservation
}