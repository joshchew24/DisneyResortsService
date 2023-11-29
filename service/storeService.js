const appService = require("./appService.js");

// join query
async function getListOfStoresInThemePark(themeParkId) {
    return appService.withOracleDB(async (connection) => {
        const result = await connection.execute(
            `
            SELECT L.name, S.name
            FROM OpenStore S
            LEFT JOIN ThemeParkLand L 
            ON S.themeParkId = L.themeParkId
            AND S.landID = L.landId
            WHERE S.themeParkId = :themeParkId
            `,
            {themeParkId}
        );
        console.log(result);
        return result.rows;
    });
}

module.exports = {getListOfStoresInThemePark};