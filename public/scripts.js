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
    const messageElement = document.getElementById('findAllLandsResultMsg');

    if (responseData.success) {
        messageElement.textContent = `The Lands that appear in all Disney Resorts: ${responseData.result}`;
    } else {
        alert("Error in find lands that appear in all Disney Resorts!");
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


// ---------------------------------------------------------------
// Initializes the webpage functionalities.
// Add or remove event listeners based on the desired functionalities.88
window.onload = function () {
    selectAttractionInputCount = 0;
    checkDbConnection();
    fetchTableData();
    document.getElementById("resetDemotable").addEventListener("click", resetDemotable);
    document.getElementById("insertDemotable").addEventListener("submit", insertDemotable);
    document.getElementById("updataNameDemotable").addEventListener("submit", updateNameDemotable);
    document.getElementById("updateReservation").addEventListener("submit", updateReservation);
    document.getElementById("countDemotable").addEventListener("click", countDemotable);
    document.getElementById("insertReservation").addEventListener("submit", insertReservation);
    document.getElementById("selectAttractionButton").addEventListener("click", selectAttraction);
    document.getElementById("findAllLands").addEventListener("click", findLandsInAllDisneyResorts);
    document.getElementById("addInputButton").addEventListener("click", addWhereClauseInput);
    document.getElementById("removeInputButton").addEventListener("click", removeWhereClauseInput);
};

// General function to refresh the displayed table data. 
// You can invoke this after any table-modifying operation to keep consistency.
function fetchTableData() {
    fetchAndDisplayUsers();
}
