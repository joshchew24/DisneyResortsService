const appService = require("./appService.js");
const fs = require("fs");

async function resetDatabase() {
    return await appService.withOracleDB(async (connection) => {
        // TODO: better error messages
        await dropUserTables(connection);
        console.log('all user tables dropped succesfully');
        await executeSqlScript(connection, "./scripts/sql/createTables.sql");
        console.log('app tables created successfully');
        await executeSqlScript(connection, "./scripts/sql/insertData.sql");
        console.log('tables populated successfully');
        await connection.execute("COMMIT");
        console.log('database successfully reset')
        return true;
    }).catch((err) => {
        console.log(err);
        return false;
    });
}
async function executeSqlScript(connection, path, delim=";") {
    const script = fs.readFileSync(path).toString();
    const statements = script.split(delim).map((item) => {
        return item.trim();
    });
    for (const statement of statements) {
        if (statement) {
            await connection.execute(statement);
        }
    }
}

async function dropUserTables(connection) {
    const result = await connection.execute("SELECT table_name FROM user_tables")
    for (let table_name of result.rows) {
        await connection.execute("DROP TABLE " + table_name[0] + ' CASCADE CONSTRAINTS');
    }
}

module.exports = {
    resetDatabase
}