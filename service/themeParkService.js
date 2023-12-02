const appService = require("./appService.js");

async function findNumberOfRidesAtThemeParkWithMinimumHeightLessThanOrEqualToHeight(themeParkId, height) {
    return await appService.withOracleDB(async (connection) => {
        const result = await connection.execute(
            `
            SELECT R.minimumHeight, count(*)
            FROM Attraction A, IsPartOf I, RideAvgWaitTime R
            WHERE A.attractionId = I.attractionId AND I.themeParkId = :themeParkId AND R.attractionId = A.attractionId
            GROUP BY R.minimumHeight
            HAVING R.minimumHeight <= :height
            `,
            [themeParkId, height]
        );
        return result.rows;
    }).catch(() => {
        return -1;
    });
}

module.exports = {
    findNumberOfRidesAtThemeParkWithMinimumHeightLessThanOrEqualToHeight
}