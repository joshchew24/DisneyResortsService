const appService = require("./appService.js");

async function updateReservation(accountId, restaurantId, newPartySize, newTime) {
    return await withOracleDB(async (connection) => {
        const dateTimeString = date + "T" + time + ":00";
        let dateTime = new Date(Date.parse(dateTimeString));
        const result = await connection.execute(
            `
            UPDATE Reserve 
            SET partySize=:newPartySize, time=:dateTime
            WHERE accountId=:accountId, restaurantId=:restaurantId
            `,
            [newPartySize, dateTime],
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