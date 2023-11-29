const appService = require("./appService.js");

// join query
async function getListOfStoresInThemePark(themeParkId) {
    return appService.withOracleDB(async (connection) => {
        const result = await connection.execute(
            `
            SELECT L.name, S.name
            FROM ThemeParkLand L, OpenStore S
            WHERE S.themeParkId = :themeParkId
            AND L.themeParkId = S.themeParkId
            AND L.landId = S.landId
            `,
            {themeParkId}
        )
        return result.rows;
    });
}

module.exports = {getListOfStoresInThemePark};