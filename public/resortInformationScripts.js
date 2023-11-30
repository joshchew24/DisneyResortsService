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

// Nested Aggregation with Group BY Query
async function findMinAvgWaitTime(event) {
    event.preventDefault();

    const themeParkId = document.getElementById('minAvgWTId').value;
    const findLandParam = new URLSearchParams();
    findLandParam.append('themeParkId', themeParkId);

    const response = await fetch(`/find-min-avg-wt?${findLandParam}`, {
        method: 'GET'
    });

    const responseData = await response.json();
    const landTuples = responseData.result;

    const tableElement = document.getElementById('minAvgWTTable');
    const tableBody = tableElement.querySelector('tbody');
    // Always clear old, already fetched data before new fetching process.
    if (tableBody) {
        tableBody.innerHTML = '';
    }

    landTuples.forEach((land) => {
        const row = tableBody.insertRow();
        land.forEach((field, index) => {
            // some stores don't belong to a land
            if (index == 0 && field == null) {
                field = "N/A";
            }
            console.log(index + ": " + field);
            const cell = row.insertCell(index);
            cell.textContent = field;
        });
    });

    if (!responseData.success) {
        alert("Error in Nested Aggregation with Group By Query");
    }
}


// ---------------------------------------------------------------
// Initializes the webpage functionalities.
// Add or remove event listeners based on the desired functionalities.88
window.onload = function () {
    checkDbConnection();
    document.getElementById("divisionQuery").addEventListener("click", findLandsInAllDisneyResorts);
    document.getElementById("minAvgWTButton").addEventListener("click", findMinAvgWaitTime);
};
