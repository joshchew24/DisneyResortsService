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

//Celine:
async function fetchAllTablesFromDb() {
    try {
        return await withOracleDB(async (connection) => {
            const result = await connection.execute(`select table_name from user_tables`);
            return result.rows;
        });
    } catch (error) {
        console.error('Error fetching tables:', error);
        return [];  // Return an empty array in case of an error
    }
}

async function fetchMyTableDescription(myOption) {
    try {
        return await withOracleDB(async (connection) => {
            const query = 
            `
            select column_name
            from user_tab_columns
            where table_name = '${myOption}'
            `;
            const result = await connection.execute(query);
            return result.rows;
        });
    } catch (error) {
        console.error('Error fetching tables:', error);
        return [];  // Return an empty array in case of an error
    }
}

//Celine:
async function fetchMyTableFromDb(myOption) {
    try {
        return await withOracleDB(async (connection) => {
            const result = await connection.execute(`select * from ` + myOption);
            return result.rows;
        });
    } catch (error) {
        console.error('Error fetching tables:', error);
        return [];  // Return an empty array in case of an error
    }
}

//Celine can't figure this out TT (WRONG CODE for the projected table)
async function deleteItemFromDb(idToDelete, idColumn, myOption){
    try {
        // Assuming 'Reservations' is your table name
        const result = await appService.withOracleDB(async (connection) => {
            return await connection.execute(
                `
                DELETE FROM Reserve 
                WHERE accountId = :accountId AND restaurantId = :restaurantId
                `,
                [accountId, restaurantId],
                { autoCommit: true }
            );
        });

        return result; // Return the result of the deletion operation
    } catch (error) {
        console.error('Error delete item:', error);
        return [];  // Return an empty array in case of an error
    }
}

//Celine:
async function deleteReservationFromDb(accountId, restaurantId){
    try {
        // Assuming 'Reservations' is your table name
        const result = await appService.withOracleDB(async (connection) => {
            return await connection.execute(
                `
                DELETE FROM Reserve 
                WHERE accountId = :accountId AND restaurantId = :restaurantId
                `,
                [accountId, restaurantId],
                { autoCommit: true }
            );
        });

        return result; // Return the result of the deletion operation

    } catch (error) {
        console.error('Error delete item:', error);
        return [];  // Return an empty array in case of an error
    }
}



module.exports = {
    withOracleDB,
    testOracleConnection,
    fetchAllTablesFromDb,
    fetchMyTableFromDb,
    fetchMyTableDescription,
    deleteItemFromDb,
    deleteReservationFromDb,
};