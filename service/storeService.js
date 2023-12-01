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
            SELECT storeId, O.name, AVG(M.price) AS avgPrice
            FROM OpenStore O
            NATURAL JOIN Sell S
            JOIN Merchandise M ON S.sku = M.sku
            WHERE O.themeParkId = :themeParkId
            GROUP BY storeId, O.name
            `,
            {themeParkId}
        );
        console.log("aggregation with group by query: successfully retrieved " + Object.keys(result.rows).length + " tuples from the database");
        return result.rows;
    });
}

async function insertMerchandise(storeId, sku, name, price) {
    return await appService.withOracleDB(async (connection) => {
        // by using bind variables, 'name' parameter cannot be used for sql injection
        // @621_f2 on piazza
        // https://stackoverflow.com/questions/43235073/how-is-sql-injection-possible-when-using-bind-variables
        const merchResult = await connection.execute(
            `INSERT INTO Merchandise VALUES(:sku, :name, :price)`,
            [sku, name, price],
            { autoCommit: false }
        );
        const sellResult = await connection.execute(
            `INSERT INTO Sell VALUES(:storeId, :sku)`,
            [storeId, sku],
            { autoCommit: false}
        )
        if (merchResult.rowsAffected && merchResult.rowsAffected > 0 && sellResult.rowsAffected && sellResult.rowsAffected > 0) {
            await connection.execute(`COMMIT`);
            return true;
        } else {
            return false;
        }
    }).catch((error) => {
        let errorMessage = "Error inserting data.";
        const errorString = error.toString()
        if (errorString.includes("ORA-02291")) {
            errorMessage = "Error inserting data. Ensure store ID and SKUs exist!";
        } else if (errorString.includes("ORA-00001")) {
            errorMessage = "Error inserting data. Cannot insert duplicate merchandise!";
        }
        throw errorMessage;
    });
}

module.exports = {
    getListOfStoresInThemePark,
    findAvgPrices,
    insertMerchandise
};