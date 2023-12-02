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

// This fuction fetches all the table name from db and displays it in the dropdwon options.
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
        
        // Create and add the default disabled option
        const defaultOption = document.createElement('option');
        defaultOption.textContent = 'Select an option';
        defaultOption.value = "";
        defaultOption.disabled = true;
        defaultOption.selected = true;
        dropdownElement.appendChild(defaultOption);
    }

    // Loop through each table name and create an option element for it
    tableNames.forEach(tableName => {
        const option = document.createElement('option'); //create an <option> element
        option.value = tableName;
        option.textContent = tableName;
        dropdownElement.appendChild(option); //append to the dropdownElement
    });
}

async function displayAttributesToDisplay(selectedOption){

    const tableDescriptionResponse = await fetch(`/selectedTable-description?selectedOption=${selectedOption}`, {
        method: 'GET'
    });
    
    // Parse the response to JSON
    const responseData = await tableDescriptionResponse.json();
    const attributes = responseData.result; // Assuming the response has an 'attributes' field

    const container = document.getElementById('checkboxContainer');
    container.innerHTML = ''; // Clear previous checkboxes

    attributes.forEach(attr => {
        const pairContainer = document.createElement('div');
        pairContainer.classList.add('checkbox-pair');
    
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.id = attr;
        checkbox.name = attr;
        checkbox.value = attr;
        checkbox.classList.add('attribute-checkbox'); // Add this line to assign the class
    
        const label = document.createElement('label');
        label.htmlFor = attr;
        label.appendChild(document.createTextNode(attr));
    
        pairContainer.appendChild(checkbox);
        pairContainer.appendChild(label);
    
        container.appendChild(pairContainer);
    });

}

/*
// This function fetches data from the database and displayes the selected table.
async function projectSelectedTable() {
    const dropdownElement = document.getElementById('myDropdown');
    const selectedOption = dropdownElement.value; // Get the selected value from the dropdown


    const tableElement = document.getElementById('selectedTable');
    const tableRow = tableElement.querySelector('tr');
    const tableBody = tableElement.querySelector('tbody');

    //Getting
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
*/

// Thought Process
// All the Helper function I need:
// 1. Get all the selected attributes from checkboxes
// 2. Create table header
// 3. Create table body 

async function projectSelectedTable() {
    const selectedTable = document.getElementById('myDropdown').value;
    const tableRow = document.getElementById('selectedTable').querySelector('tr');
    const tableBody = document.getElementById('selectedTable').querySelector('tbody');

    const selectedAttributes = getSelectedAttributes(); //helper fucntion #1

    if (selectedAttributes.length === 0) return; 

    // Fetch data for selected attributes (special appaorch )
    // Reference: https://stackoverflow.com/questions/486896/adding-a-parameter-to-the-url-with-javascript
    const queryParams = new URLSearchParams({ selectedTable, attributes: selectedAttributes.join(',') });
    const response = await fetch(`/project-selectedTable?${queryParams.toString()}`, { method: 'GET' });
    const responseData = await response.json();

    if (!responseData.success) {
        console.error('Error fetching table data');
        return;
    }

    createTableHeader(tableRow, selectedAttributes); //helper fucntion #2
    fillTableBody(tableBody, responseData.result); //helper fucntion #3

    document.getElementById('projectSelectedTableResultMsg').textContent = "Selected table projected successfully!";
}

//Helper Function 3
function fillTableBody(tableBody, data) {
    tableBody.innerHTML = ''; 

    data.forEach(rowData => {
        const row = tableBody.insertRow();

        rowData.forEach(cellData => {
            const cell = row.insertCell();
            cell.textContent = cellData; 
        });
    });
}

//Helper Function 2
function createTableHeader(tableRow, attributes) {
    tableRow.innerHTML = ''; // Clear existing headers
    attributes.forEach(attr => {
        const cell = tableRow.insertCell();
        cell.textContent = attr;
    });
}

//Helper Function 1
function getSelectedAttributes() {
    const checkboxes = document.querySelectorAll('.attribute-checkbox:checked');
    return Array.from(checkboxes).map(checkbox => checkbox.value);
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

// refreshes reservation table
async function refreshRidesTable() {
    const response = await fetch(`/get-all-rides`, {
        method: 'GET'
    });
    const responseData = await response.json();
    const ridesTuples = responseData.result;

    const tableElement = document.getElementById('ridesTable');
    const tableBody = tableElement.querySelector('tbody');
    // Always clear old, already fetched data before new fetching process.
    if (tableBody) {
        tableBody.innerHTML = '';
    }
    ridesTuples.forEach((ride) => {
        const row = tableBody.insertRow();
        ride.forEach((field, index) => {
            const cell = row.insertCell(index);
            cell.textContent = field;
        });
    });
}

async function populateUpdateForm(event) {
    // for some reason, we can only click cells and not the row
    if (event.target.tagName === "TD") {
        const updateForm = document.getElementById("updateRide");

        // get the clicked cell's parent row, then all the sibling cells
        const clickedRow = event.target.parentNode;
        const cells = clickedRow.getElementsByTagName("td");

        // get the values from the cells
        const attractionId = cells[0].textContent;
        const avgWaitTime = cells[2].textContent;

        // populate update form with the values
        updateForm.querySelector("#attractionId").value = attractionId;
        updateForm.querySelector("#newAvgWaitTime").value = avgWaitTime;
        
    
        updateForm.scrollIntoView(
            {
                behaviour: "smooth",
                block: "start",
            }
        )
    }
}

async function getAllMinimumHeights() {
    const dropdownElement = document.getElementById('heightDropDown')

    const response = await fetch('/get-minimumHeights', {
        method: 'GET'
    });

    const responseData = await response.json();
    const tableNames = responseData.data; //responseData.data is an array of table names

    console.log("heights: " + tableNames);

    // Clear old options before adding new ones
    if (dropdownElement) {
        dropdownElement.innerHTML = '';
        
        // Create and add the default disabled option
        const defaultOption = document.createElement('option');
        defaultOption.textContent = 'Select an option';
        defaultOption.value = "";
        defaultOption.disabled = true;
        defaultOption.selected = true;
        dropdownElement.appendChild(defaultOption);
    }

    // Loop through each table name and create an option element for it
    tableNames.forEach(tableName => {
        const option = document.createElement('option'); //create an <option> element
        option.value = tableName;
        option.textContent = tableName;
        dropdownElement.appendChild(option); //append to the dropdownElement
    });
}


async function updateRide(event) {
    event.preventDefault();

    const attractionId = document.getElementById('attractionId').value;
    const newMinimumHeight = document.getElementById('heightDropDown').value;
    const newAvgWaitTime = document.getElementById('newAvgWaitTime').value;

    // console.log("attractionId: " + attractionId + " minimumHeight: " + newMinimumHeight + " avgWaitTime: " + newAvgWaitTime);

    const response = await fetch('/update-ride-minimumHeight-and-avgWaitTime', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            attractionId: attractionId,
            newMinimumHeight: newMinimumHeight,
            newAvgWaitTime: newAvgWaitTime
        })
    });

    const responseData = await response.json();
    const messageElement = document.getElementById('updateRideResultMsg');

    if (responseData.success) {
        messageElement.textContent = "Ride updated successfully!";
    } else {
        messageElement.textContent = "Error updating ride!";
    }
    refreshRidesTable();
}

// ---------------------------------------------------------------
// Initializes the webpage functionalities.
// Add or remove event listeners based on the desired functionalities.88
window.onload = async function () {
    checkDbConnection();
    await fetchTableData();
    await refreshRidesTable();
    await getAllMinimumHeights();

    document.getElementById('projectButtonNew').addEventListener('click', projectSelectedTable); //Celine: projection
    document.getElementById("deleteAccount").addEventListener("submit", deleteAccount); 
    document.getElementById("ridesTable").addEventListener("click", populateUpdateForm);
    document.getElementById("updateRide").addEventListener("submit", updateRide);

};

// ---------------------------------------------------------------
// Added funcitons by Celine
document.getElementById('myDropdown').addEventListener('change', function () {
    var selectedOption = this.value;
    document.getElementById('selectedDisplayTableName').textContent = selectedOption;
    // console.log("reached here");
    displayAttributesToDisplay(selectedOption);
});




// General function to refresh the displayed table data.
// You can invoke this after any table-modifying operation to keep consistency.
async function fetchTableData() {
    await fetchAndDisplayAllTables();
}
