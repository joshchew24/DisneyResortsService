/*
 * These functions below are for various webpage functionalities. 
 * Each function serves to process data on the frontend:
 *      - Before sending requests to the backend.
 *      - After receiving responses from the backend.
 * 
 * To tailor them to your specific needs,
 * adjust or expand these functions to match both your 
 *   backend endpoints 
 * and 
 *   HTML structure.
 * 
 */


let selectAttractionInputCount = 0;


// This function checks the database connection and updates its status on the frontend.
async function checkDbConnection() {
    const statusElem = document.getElementById('dbStatus');
    const loadingGifElem = document.getElementById('loadingGif');

    const response = await fetch('/check-db-connection', {
        method: "GET"
    });

    // Hide the loading GIF once the response is received.
    loadingGifElem.style.display = 'none';
    // Display the statusElem's text in the placeholder.
    statusElem.style.display = 'inline';

    response.text()
        .then((text) => {
            statusElem.textContent = text;
        })
        .catch((error) => {
            statusElem.textContent = 'connection timed out';  // Adjust error handling if required.
        });
}

// Celine: This fuction fetches all the table name from db and displays it in the dropdwon options.
async function fetchAndDisplayAllTables() {

    const dropdownElement = document.getElementById('myDropdown')

    //fetch is fetching from appController.js
    const response = await fetch('/project-allTableDropdown', {
        method: 'GET'
    });


    const responseData = await response.json();
    const tableNames = responseData.data; //responseData.data is an array of table names

    // Clear old options before adding new ones
    if (dropdownElement) {
        dropdownElement.innerHTML = '';
    }

    // Loop through each table name and create an option element for it
    tableNames.forEach(tableName => {
        const option = document.createElement('option'); //create an <option> element
        option.value = tableName;
        option.textContent = tableName;
        dropdownElement.appendChild(option); //append to the dropdownElement
    });
}

// Celine: This function fetches data from the database and displayes the selected table.

async function resetDatabase() {
    const response = await fetch("/reset-database", {
        method: 'POST'
    });
    const responseData = await response.json();

    if (responseData.success) {
        const messageElement = document.getElementById('resetDatabaseResultMsg');
        messageElement.textContent = "database initiated successfully!";
    } else {
        alert("Error initiating database!");
    }
}

async function projectSelectedTable() {
    const dropdownElement = document.getElementById('myDropdown');
    const selectedOption = dropdownElement.value; // Get the selected value from the dropdown


    const tableElement = document.getElementById('selectedTable');
    const tableRow = tableElement.querySelector('tr');
    const tableBody = tableElement.querySelector('tbody');

    const tableDescriptionResponse = await fetch(`/selectedTable-description?selectedOption=${selectedOption}`, {
        method: 'GET'
    });

    const tableDescriptionResponseData = await tableDescriptionResponse.json();
    const tableRowContent = tableDescriptionResponseData.result;

    if (tableRow) {
        tableRow.innerHTML = '';
    }

    //title
    tableRowContent.forEach((field, index) => {
        const cell = tableRow.insertCell(index);
        cell.textContent = field;
    });


    //fetch is fetching from appController.js
    const projectSelectedTableResponse = await fetch(`/project-selectedTable?selectedOption=${selectedOption}`, {
        method: 'GET'
    });

    const projectSelectedTableResponseData = await projectSelectedTableResponse.json();
    const myTableContent = projectSelectedTableResponseData.result;

    // Always clear old, already fetched data before new fetching process.
    if (tableBody) {
        tableBody.innerHTML = '';
    }

    myTableContent.forEach(user => {
        const row = tableBody.insertRow();
        user.forEach((field, index) => {
            const cell = row.insertCell(index);
            cell.textContent = field;
        });

        // Attach click event listener to the row
        row.addEventListener('click', function() {
        this.classList.toggle('selected');
        });
    });

    const messageElement = document.getElementById('projectSelectedTableResultMsg');
    if (projectSelectedTableResponseData.success) {
        messageElement.textContent = "selected table projected successfully!";
    } else {
        messageElement.textContent = "selected table projected NOT successfully!";
    }
}

// Delete account
async function deleteAccount(event) {
    event.preventDefault();

    const accountIdValue = document.getElementById('toDeleteAccountId').value;
    console.log("account id to delete: " + accountIdValue);
    const response = await fetch('/delete-account', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            accountId: accountIdValue,
        })
    });

    const responseData = await response.json();
    const messageElement = document.getElementById('deleteAccountResultMsg');

    if (responseData.success) {
        messageElement.textContent = "Data deleted successfully!";
    } else {
        messageElement.textContent = "Error deleting data!";
    }
}

// ---------------------------------------------------------------
// Initializes the webpage functionalities.
// Add or remove event listeners based on the desired functionalities.88
window.onload = function () {
    selectAttractionInputCount = 0;
    checkDbConnection();
    fetchTableData();

    document.getElementById("resetDatabase").addEventListener("click", resetDatabase);
    document.getElementById('projectButtonNew').addEventListener('click', projectSelectedTable); //Celine: projection
    document.getElementById("deleteAccount").addEventListener("submit", deleteAccount); 

};

// ---------------------------------------------------------------
// Added funcitons by Celine
document.getElementById('myDropdown').addEventListener('change', function () {
    var selectedOption = this.value;
    document.getElementById('displayText').textContent = selectedOption;
});




// General function to refresh the displayed table data.
// You can invoke this after any table-modifying operation to keep consistency.
function fetchTableData() {
    fetchAndDisplayAllTables();
}
