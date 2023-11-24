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

module.exports = {
    findLandsInAllDisneyResorts
}