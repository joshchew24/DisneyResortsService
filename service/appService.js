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

async function fetchDemotableFromDb() {
    return await withOracleDB(async (connection) => {
        const result = await connection.execute('SELECT * FROM DEMOTABLE');
        return result.rows;
    }).catch(() => {
        return [];
    });
}

async function initiateDemotable() {
    return await withOracleDB(async (connection) => {
        try {
            await connection.execute(`DROP TABLE DEMOTABLE`);
        } catch(err) {
            console.log('Table might not exist, proceeding to create...');
        }

        const result = await connection.execute(`
            CREATE TABLE DEMOTABLE (
                id NUMBER PRIMARY KEY,
                name VARCHAR2(20)
            )
        `);
        return true;
    }).catch(() => {
        return false;
    });
}

async function insertDemotable(id, name) {

    return await withOracleDB(async (connection) => {
        console.log(`${id}`); //printout the id para
        console.log("inside insert demotable in AppService");
        const result = await connection.execute(
            `INSERT INTO DEMOTABLE (id, name) VALUES (:id, :name)`,
            [id, name],
            { autoCommit: true }
        );

        return result.rowsAffected && result.rowsAffected > 0;
    }).catch(() => {
        return false;
    });
}

async function updateNameDemotable(oldName, newName) {
    return await withOracleDB(async (connection) => {
        const result = await connection.execute(
            `UPDATE DEMOTABLE SET name=:newName where name=:oldName`,
            [newName, oldName],
            { autoCommit: true }
        );

        return result.rowsAffected && result.rowsAffected > 0;
    }).catch(() => {
        return false;
    });
}

async function countDemotable() {
    return await withOracleDB(async (connection) => {
        const result = await connection.execute('SELECT Count(*) FROM DEMOTABLE');
        return result.rows[0][0];
    }).catch(() => {
        return -1;
    });
}

//Celine:
async function fetchafoodtableFromDb() {
    return await withOracleDB(async (connection) => {

        const result = await connection.execute(`SELECT * FROM FOOD`);
        return result.rows;
    }).catch(() => {
        return [];
    });
}

//Celine:
async function fetchAllTablesFromDb() {
    try {
        return await withOracleDB(async (connection) => {
            const result = await connection.execute(`select table_name from user_tables`);
            console.log("Successful");  // Log before returning
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
            console.log("Successful");  // Log before returning
            return result.rows;
        });
    } catch (error) {
        console.error('Error fetching tables:', error);
        return [];  // Return an empty array in case of an error
    }
}

module.exports = {
    testOracleConnection,
    fetchDemotableFromDb,
    initiateDemotable, 
    insertDemotable,
    updateNameDemotable, 
    countDemotable,
    withOracleDB,
    fetchafoodtableFromDb,
    fetchAllTablesFromDb,
    fetchMyTableFromDb,
    fetchMyTableDescription,
};