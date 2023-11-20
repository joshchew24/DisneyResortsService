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

// Fetches data from the demotable and displays it.
async function fetchAndDisplayUsers() {
    const tableElement = document.getElementById('demotable');
    const tableBody = tableElement.querySelector('tbody');

    const response = await fetch('/demotable', {
        method: 'GET'
    });

    const responseData = await response.json();
    const demotableContent = responseData.data;

    // Always clear old, already fetched data before new fetching process.
    if (tableBody) {
        tableBody.innerHTML = '';
    }

    demotableContent.forEach(user => {
        const row = tableBody.insertRow();
        user.forEach((field, index) => {
            const cell = row.insertCell(index);
            cell.textContent = field;
        });
    });

    console.log("fetchAndDisplayUsers is being caled");
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

    console.log("fetchAndDisplayAllTables is being caled");
}




// This function resets or initializes the demotable.
async function resetDemotable() {
    const response = await fetch("/initiate-demotable", {
        method: 'POST'
    });
    const responseData = await response.json();

    if (responseData.success) {
        const messageElement = document.getElementById('resetResultMsg');
        messageElement.textContent = "demotable initiated successfully!";
        fetchTableData();
    } else {
        alert("Error initiating table!");
    }
}

// Celine: This function fetches data from the database and displayes into the foodtable.

async function projectFoodtable() {
    const tableElement = document.getElementById('foodTable');
    const tableBody = tableElement.querySelector('tbody');

    //fetch is fetching from appController.js
    const response = await fetch('/project-foodtable', {
        method: 'GET'
    });

    const responseData = await response.json();
    const demotableContent = responseData.data;

    // Always clear old, already fetched data before new fetching process.
    if (tableBody) {
        tableBody.innerHTML = '';
    }

    demotableContent.forEach(user => {
        const row = tableBody.insertRow();
        user.forEach((field, index) => {
            const cell = row.insertCell(index);
            cell.textContent = field;
        });
    });
}

// Celine: This function fetches data from the database and displayes the selected table.

async function projectSelectedTable() {
    const dropdownElement = document.getElementById('myDropdown');
    const selectedOption = dropdownElement.value; // Get the selected value from the dropdown

    const tableElement = document.getElementById('selectedTable');
    const tableBody = tableElement.querySelector('tbody');

    //fetch is fetching from appController.js
    const response = await fetch('/project-selectedTable', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ tableName: selectedOption })
    });

    const responseData = await response.json();
    const myTableContent = responseData.result;

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
    });
    
    const messageElement = document.getElementById('projectSelectedTableResultMsg');
    if (responseData.success) {
        messageElement.textContent = "selected table projected successfully!";
    } else {
        messageElement.textContent = "selected table projected NOT successfully!";
    }
   
    
}



// Inserts new records into the demotable.
async function insertDemotable(event) {
    event.preventDefault();

    const idValue = document.getElementById('insertId').value;
    const nameValue = document.getElementById('insertName').value;

    const response = await fetch('/insert-demotable', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            id: idValue,
            name: nameValue
        })
    });

    const responseData = await response.json();
    const messageElement = document.getElementById('insertResultMsg');

    if (responseData.success) {
        messageElement.textContent = "Data inserted successfully!";
        fetchTableData();
    } else {
        messageElement.textContent = "Error inserting data!";
    }
}

// Updates names in the demotable.
async function updateNameDemotable(event) {
    event.preventDefault();

    const oldNameValue = document.getElementById('updateOldName').value;
    const newNameValue = document.getElementById('updateNewName').value;

    const response = await fetch('/update-name-demotable', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            oldName: oldNameValue,
            newName: newNameValue
        })
    });

    const responseData = await response.json();
    const messageElement = document.getElementById('updateNameResultMsg');

    if (responseData.success) {
        messageElement.textContent = "Name updated successfully!";
        fetchTableData();
    } else {
        messageElement.textContent = "Error updating name!";
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

// Counts rows in the demotable.
// Modify the function accordingly if using different aggregate functions or procedures.
async function countDemotable() {
    const response = await fetch("/count-demotable", {
        method: 'GET'
    });

    const responseData = await response.json();
    const messageElement = document.getElementById('countResultMsg');

    if (responseData.success) {
        const tupleCount = responseData.count;
        messageElement.textContent = `The number of tuples in demotable: ${tupleCount}`;
    } else {
        alert("Error in count demotable!");
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
    const messageElement = document.getElementById('insertReservationResultMsg');

    if (responseData.success) {
        messageElement.textContent = "Data inserted successfully!";
        fetchTableData();
    } else {
        messageElement.textContent = "Error inserting data!";
    }
}

// Selects attraction based on where clause
async function selectAttraction(event) {
    event.preventDefault();

    const whereClauseValue = document.getElementById('insertWhereClause').value;

    const response = await fetch(`/select-attraction?where=${whereClauseValue}`, {
        method: 'GET'
    });

    const responseData = await response.json();
    const messageElement = document.getElementById('selectAttractionResultMsg');

    if (responseData.success) {
        const result = responseData.result;
        messageElement.textContent = `These attractions are available: ${result.join(', ')}`;

    } else {
        alert("Error in select Attraction!");
    }
}

// Finds all Lands that appear in all Disney Resorts
async function findLandsInAllDisneyResorts() {
    console.log("got here in script.js");
    const response = await fetch("/find-lands-that-appear-in-all-disney-resorts", {
        method: 'GET'
    });

    const responseData = await response.json();
    const messageElement = document.getElementById('findAllLandsResultMsg');

    if (responseData.success) {
        messageElement.textContent = `The Lands that appear in all Disney Resorts: ${responseData.result}`;
    } else {
        alert("Error in find lands that appear in all Disney Resorts!");
    }
}


// ---------------------------------------------------------------
// Initializes the webpage functionalities.
// Add or remove event listeners based on the desired functionalities.
window.onload = function() {
    checkDbConnection();
    fetchTableData();
    document.getElementById("resetDemotable").addEventListener("click", resetDemotable);
    document.getElementById("insertDemotable").addEventListener("submit", insertDemotable);
    document.getElementById("updataNameDemotable").addEventListener("submit", updateNameDemotable);
    document.getElementById("updateReservation").addEventListener("submit", updateReservation);
    document.getElementById("countDemotable").addEventListener("click", countDemotable);
    document.getElementById("insertReservation").addEventListener("submit", insertReservation);
    document.getElementById("selectAttraction").addEventListener("submit", selectAttraction);
    document.getElementById("findAllLands").addEventListener("click", findLandsInAllDisneyResorts);
    document.getElementById('projectButton').addEventListener('click', projectFoodtable); //Celine: projection
    document.getElementById('projectButtonNew').addEventListener('click', projectSelectedTable); //Celine: projection
    
};

// ---------------------------------------------------------------
// Added funcitons by Celine
document.getElementById('myDropdown').addEventListener('change', function() {
    var selectedOption = this.value;
    document.getElementById('displayText').textContent = selectedOption;
});

// General function to refresh the displayed table data. 
// You can invoke this after any table-modifying operation to keep consistency.
function fetchTableData() {
    fetchAndDisplayUsers();
    fetchAndDisplayAllTables();
}
