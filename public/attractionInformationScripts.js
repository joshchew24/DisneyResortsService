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

        if (tableContent.length == 0) {
            document.getElementById('selectAttractionResultMsg').textContent = "No Result";
            return;
        } else {
            document.getElementById('selectAttractionResultMsg').textContent = "";
        }

        tableContent.forEach(user => {
            const row = tableBody.insertRow();
            user.forEach((field, index) => {
                const cell = row.insertCell(index);
                cell.textContent = field;
            });
        });

        if (!responseData.success) {
            alert("Error in query");
        }
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

    if (tableContent.length == 0) {
        document.getElementById('aggregateWithHavingQueryResultMsg').textContent = "No Result";
        return;
    } else {
        document.getElementById('aggregateWithHavingQueryResultMsg').textContent = "";
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
    numValue.placeholder = "Enter ID";
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

    document.getElementById("selectAttractionButton").addEventListener("click", selectAttraction);
    document.getElementById("aggregateWithHavingQuery").addEventListener("submit", findNumberOfRidesAtThemeParkWithMinimumHeightLessThanOrEqualToHeight);
    document.getElementById("addInputButton").addEventListener("click", addWhereClauseInput);
    document.getElementById("removeInputButton").addEventListener("click", removeWhereClauseInput);
};

