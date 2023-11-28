const appService = require("./appService.js");

async function getListOfStoresInThemePark(themeParkId) {
    return appService.withOracleDB(async (connection) => {
        const result = await connection.execute(
            `
            SELECT L.name, S.name
            FROM ThemeParkLand L, OpenStore S
            WHERE S.themeParkId = ${themeParkId}
            AND L.themeParkId = S.themeParkId
            AND L.landId = S.landId
            `
        )
        console.log(result);
    });
}

module.exports = {getListOfStoresInThemePark};