const appService = require("./appService.js");

async function selectAttraction(whereClause) {
    return await appService.withOracleDB(async (connection) => {
        const query = 'SELECT * FROM IsPartOf WHERE ' + whereClause;
        const result = await connection.execute(query);
        return result.rows;
    }).catch(() => {
        return -1;
    });
}

module.exports = {
    selectAttraction
}