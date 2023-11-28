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

// const { deleteReservation } = require("../service/reservationService");


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

// updates reservation under accountId/restaurantId with given party size and time
async function updateReservation(event) {
    event.preventDefault();

    const accountId = document.getElementById('accountId').value;
    const restaurantId = document.getElementById('restaurantId').value;
    const newPartySize = document.getElementById('newPartySize').value;
    const newDate = document.getElementById('newDate').value;
    const newTime = document.getElementById('newTime').value;

    const response = await fetch('/update-reservation', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            accountId: accountId,
            restaurantId: restaurantId,
            newPartySize: newPartySize,
            newDate: newDate,
            newTime: newTime
        })
    });

    const responseData = await response.json();
    const messageElement = document.getElementById('updateReservationResultMsg');

    if (responseData.success) {
        messageElement.textContent = "Reservation updated successfully!";
        // fetchTableData();
    } else {
        messageElement.textContent = "Error updating reservation!";
    }
}

// Inserts new reservation into the table
async function insertReservation(event) {
    event.preventDefault();

    const accountIdValue = document.getElementById('insertAccountId').value;
    const restaurantIdValue = document.getElementById('insertRestaurantId').value;
    const partySizeValue = document.getElementById('insertPartySize').value;
    const dateValue = document.getElementById('insertDate').value;
    const timeValue = document.getElementById('insertTime').value;

    const response = await fetch('/insert-reservation', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            accountId: accountIdValue,
            restaurantId: restaurantIdValue,
            partySize: partySizeValue,
            date: dateValue,
            time: timeValue
        })
    });

    const responseData = await response.json();
    const messageElement = document.getElementById('insertionQueryResultMsg');

    if (responseData.success) {
        messageElement.textContent = "Data inserted successfully!";
        fetchTableData();
    } else {
        messageElement.textContent = "Error inserting data!";
    }
}

// Delete reservations in the table
async function deleteReservation(event) {
    event.preventDefault();

    const accountIdValue = document.getElementById('toDeleteAccountId').value;
    const restaurantIdValue = document.getElementById('toDeleteRestaurantId').value;

    const response = await fetch('/delete-reservation', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            accountId: accountIdValue,
            restaurantId: restaurantIdValue,
        })
    });

    const responseData = await response.json();
    const messageElement = document.getElementById('deleteReservationResultMsg');

    if (responseData.success) {
        messageElement.textContent = "Data deleted successfully!";
        fetchTableData();
    } else {
        messageElement.textContent = "Error deleting data!";
    }
}

// Selects attraction based on where clause
async function selectAttraction(event) {
    event.preventDefault();
    const tableElement = document.getElementById('selectAttractionTable');
    const tableBody = tableElement.querySelector('tbody');

    var whereClauseValue = "";

    let isValid = true;

    for (let i = 1; i <= selectAttractionInputCount; ++i) {
        var inputDropDown = document.getElementById('inputDropDown_' + i);
        var inputValue = inputDropDown.options[inputDropDown.selectedIndex].value;

        var numValue = document.getElementById('numValue_' + i).value;

        if (numValue.trim() === '') {
            isValid = false;
            alert('Please fill in all boxes.');
        }

        var dropDownValue = "";

        if (i > 1) {
            var dropDown = document.getElementById('dropDownInput_' + i);
            dropDownValue = dropDown.options[dropDown.selectedIndex].value;
        }

        whereClauseValue += dropDownValue + " " + inputValue + "=" + numValue;
    }

    if (isValid) {
        const response = await fetch(`/select-attraction?where=${whereClauseValue}`, {
            method: 'GET'
        });

        const responseData = await response.json();
        const tableContent = responseData.result;

        // Always clear old, already fetched data before new fetching process.
        if (tableBody) {
            tableBody.innerHTML = '';
        }

        tableContent.forEach(user => {
            const row = tableBody.insertRow();
            user.forEach((field, index) => {
                const cell = row.insertCell(index);
                cell.textContent = field;
            });
        });

        if (!responseData.success) {
            alert("Error in Division Query");
        }
    }
}

// Finds all Lands that appear in all Disney Resorts
async function findLandsInAllDisneyResorts() {
    const response = await fetch("/find-lands-that-appear-in-all-disney-resorts", {
        method: 'GET'
    });

    const responseData = await response.json();
    const messageElement = document.getElementById('divisionQueryResultMsg');

    if (responseData.success) {
        messageElement.textContent = `The Lands that appear in all Disney Resorts: ${responseData.result}`;
    } else {
        alert("Error in find lands that appear in all Disney Resorts!");
    }
}

// At a specific theme park, find the number of rides with minimumHeight <= x
async function findNumberOfRidesAtThemeParkWithMinimumHeightLessThanOrEqualToHeight(event) {
    event.preventDefault();
    const tableElement = document.getElementById('aggregateWithHavingQueryTable');
    const tableBody = tableElement.querySelector('tbody');

    const themeParkIdValue = document.getElementById('insertThemeParkId').value;
    const heightValue = document.getElementById('insertHeight').value;

    const whereClause = `?themeParkId=${themeParkIdValue}&height=${heightValue}`;

    const response = await fetch("/find-number-of-rides-at-theme-park-with-minimum-height-less-than-or-equal-to-height" + whereClause, {
        method: 'GET'
    });

    const responseData = await response.json();

    const tableContent = responseData.result;

    // Always clear old, already fetched data before new fetching process.
    if (tableBody) {
        tableBody.innerHTML = '';
    }

    tableContent.forEach(user => {
        const row = tableBody.insertRow();
        user.forEach((field, index) => {
            const cell = row.insertCell(index);
            cell.textContent = field;
        });
    });

    if (!responseData.success) {
        alert("Error in Aggregate with Having Query");
    }
}

async function addWhereClauseInput() {
    selectAttractionInputCount++;

    var inputOptions = ["ThemeParkId", "LandId", "AttractionId"];
    var newInputDropDown = document.createElement('select');
    newInputDropDown.id = "inputDropDown_" + selectAttractionInputCount;

    for (var i = 0; i < inputOptions.length; i++) {
        var option = document.createElement('option');
        option.value = inputOptions[i];
        option.text = inputOptions[i];
        newInputDropDown.appendChild(option);
    }

    var numValue = document.createElement('input');
    numValue.type = 'number';
    numValue.id = "numValue_" + selectAttractionInputCount;
    numValue.required = true;

    var options = ["AND", "OR"];
    var newDropdown = document.createElement('select');
    newDropdown.id = "dropDownInput_" + selectAttractionInputCount;

    for (var i = 0; i < options.length; i++) {
        var option = document.createElement('option');
        option.value = options[i];
        option.text = options[i];
        newDropdown.appendChild(option);
    }

    var container = document.getElementById('inputContainer');

    if (selectAttractionInputCount > 1) {
        container.appendChild(newDropdown);
    }
    container.appendChild(newInputDropDown);
    container.appendChild(numValue);
}

async function removeWhereClauseInput() {
    var container = document.getElementById('inputContainer');
    var inputToRemove = document.getElementById('inputDropDown_' + selectAttractionInputCount);
    var numToRemove = document.getElementById('numValue_' + selectAttractionInputCount);
    var dropDownToRemove = document.getElementById('dropDownInput_' + selectAttractionInputCount);

    if (inputToRemove && numToRemove) {
        container.removeChild(inputToRemove);
        container.removeChild(numToRemove);
        selectAttractionInputCount--;
    }

    if (dropDownToRemove) {
        container.removeChild(dropDownToRemove);
    }
}

// Celine's delete selected row from projection code
async function deleteRow() {
    const selectedRow = document.querySelector('tr.selected');
    if (selectedRow) {
        selectedRow.remove();
        
        const response = await fetch("/deleteFromDb", {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: dataIdToDelete,
                myOption: myOption, 
                idColumn: idColumn // The ID column name
             })
        });

    } else {
        alert('Please select a row to delete');
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
    document.getElementById("updateReservation").addEventListener("submit", updateReservation);
    document.getElementById("insertionQuery").addEventListener("submit", insertReservation);
    document.getElementById("selectAttractionButton").addEventListener("click", selectAttraction);
    document.getElementById("divisionQuery").addEventListener("click", findLandsInAllDisneyResorts);
    document.getElementById("aggregateWithHavingQuery").addEventListener("submit", findNumberOfRidesAtThemeParkWithMinimumHeightLessThanOrEqualToHeight);
    document.getElementById("addInputButton").addEventListener("click", addWhereClauseInput);
    document.getElementById("removeInputButton").addEventListener("click", removeWhereClauseInput);
    document.getElementById('projectButtonNew').addEventListener('click', projectSelectedTable); //Celine: projection
    document.getElementById('deleteButton').addEventListener('click', deleteRow); //Celine: deleteRow
    document.getElementById("updateReservation").addEventListener("submit",deleteReservation); //Celine: delete reservation
    
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
