const appService = require("./appService.js");

async function findLandsInAllDisneyResorts() {
    console.log("got here in landsService");
    return await appService.withOracleDB(async (connection) => {
        const result = await connection.execute(
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
        );

        console.log(`Result: ${result}`);
        return result.rows;
    }).catch(() => {
        return -1;
    });
}

module.exports = {
    findLandsInAllDisneyResorts
}