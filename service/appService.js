const oracledb = require('oracledb');
const loadEnvFile = require('../utils/envUtil');
const fs = require('fs');

const envVariables = loadEnvFile('./.env');

// Database configuration setup. Ensure your .env file has the required database credentials.
const dbConfig = {
    user: envVariables.ORACLE_USER,
    password: envVariables.ORACLE_PASS,
    connectString: `${envVariables.ORACLE_HOST}:${envVariables.ORACLE_PORT}/${envVariables.ORACLE_DBNAME}`
};


// ----------------------------------------------------------
// Wrapper to manage OracleDB actions, simplifying connection handling.
async function withOracleDB(action) {
    let connection;
    try {
        connection = await oracledb.getConnection(dbConfig);
        return await action(connection);
    } catch (err) {
        console.error(err);
        throw err;
    } finally {
        if (connection) {
            try {
                await connection.close();
            } catch (err) {
                console.error(err);
            }
        }
    }
}


// ----------------------------------------------------------
// Core functions for database operations
// Modify these functions, especially the SQL queries, based on your project's requirements and design.
async function testOracleConnection() {
    return await withOracleDB(async (connection) => {
        return true;
    }).catch(() => {
        return false;
    });
}

// Fetch All Table Dropdown Options From Databases 
async function fetchAllTablesFromDb() {
    try {
        return await withOracleDB(async (connection) => {
            const result = await connection.execute(`SELECT table_name FROM user_tables`);
            return result.rows;
        });
    } catch (error) {
        console.error('Error fetching tables:', error);
        return []; 
    }
}

// Fetch Selected Table Header From Databases 
async function fetchMyTableDescription(myOption) {
    try {
        return await withOracleDB(async (connection) => {
            const result = await connection.execute(
                `
                SELECT column_name
                FROM user_tab_columns
                WHERE table_name = :myOption
                `,
                [myOption]
            );
            return result.rows;
        });
    } catch (error) {
        console.error('Error fetching tables:', error);
        return [];  // Return an empty array in case of an error
    }
}

// Fetch All Data From Selected Table From Databases 
async function fetchMyTableFromDb(tableName, attributes) {
    let columnsToFetch = '*'; 
    if (attributes && attributes.length > 0) {
        // Joining the attributes to create a string for the SQL query
        columnsToFetch = attributes.join(', ');
    }

    try {
        return await withOracleDB(async (connection) => {
            // cannot use bind variables with identifiers
            // TODO: this is a vulnerability as a client can modify the values 
            // of the checkboxes in the frontend to inject SQL here
            const query = `SELECT ${columnsToFetch} FROM ${tableName}`;
            // console.log(query);
            const result = await connection.execute(query);
            return result.rows;
        });
    } catch (error) {
        console.error('Error fetching tables:', error);
        return []; 
    }
}

async function deleteAccount(accountId) {
    return await withOracleDB(async (connection) => {
        const result = await connection.execute(
            `DELETE FROM Account WHERE accountId = :accountId`,
            [accountId],
            { autoCommit: true }
        );
        console.log("Received accountId:", accountId);
        return result.rowsAffected && result.rowsAffected > 0;
        
    }).catch ((error) => {
        console.error('Error deleting account:', error);
        return false; 
    })
}


module.exports = {
    withOracleDB,
    testOracleConnection,
    fetchAllTablesFromDb,
    fetchMyTableFromDb,
    fetchMyTableDescription,
    deleteAccount
};