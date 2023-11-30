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
        console.log("join query: successfully retrieved " + Object.keys(result.rows).length + " tuples from the database");
        return result.rows;
    });
}

// aggregation with group by query
async function findAvgPrices(themeParkId) {
    return appService.withOracleDB(async (connection) => {
        const result = await connection.execute(
            `
            SELECT O.name, AVG(M.price) AS avgPrice
            FROM OpenStore O
            NATURAL JOIN Sell S
            JOIN Merchandise M ON S.sku = M.sku
            WHERE O.themeParkId = :themeParkId
            GROUP BY O.name
            `,
            {themeParkId}
        );
        console.log("aggregation with group by query: successfully retrieved " + Object.keys(result.rows).length + " tuples from the database");
        return result.rows;
    });
}

module.exports = {
    getListOfStoresInThemePark,
    findAvgPrices
};