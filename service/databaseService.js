const appService = require("./appService.js");
const fs = require("fs");

async function resetDatabase() {
    return await appService.withOracleDB(async (connection) => {
        // TODO: better error messages
        await executeSqlScript(connection, "./scripts/sql/dropTables.sql", "error dropping tables");
        await executeSqlScript(connection, "./scripts/sql/createTables.sql", "error creating tables");
        await executeSqlScript(connection, "./scripts/sql/insertData.sql", "error populating tables");
        connection.execute("COMMIT");
        return true;
    }).catch(() => {
        return false;
    });
}
async function executeSqlScript(connection, path, err_msg, delim=";") {
    const script = fs.readFileSync(path).toString();
    const statements = script.split(delim).map((item) => {
        return item.trim();
    });
    for (const statement of statements) {
        if (statement) {
            try {
                console.log(statement);
                await connection.execute(statement);
            } catch (err) {
                console.log(err_msg + " with statement " + statement);
            }
        }
    }
}

module.exports = {
    resetDatabase
}