const appService = require("./appService.js");

async function selectAttraction(whereClause) {
    return await appService.withOracleDB(async (connection) => {
        const query = 'SELECT * FROM IsPartOf WHERE ' + whereClause;
        const result = await connection.execute(query);
        console.log(`SelectAttraction Result: ${result.rows}`);
        return result.rows;
    }).catch(() => {
        return -1;
    });
}

module.exports = {
    selectAttraction
}