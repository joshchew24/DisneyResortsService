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
    } else {
        messageElement.textContent = responseData.errorMessage;
    }
}

// // Delete reservations in the table
// async function deleteReservation(event) {
//     event.preventDefault();

//     const accountIdValue = document.getElementById('toDeleteAccountId').value;
//     const restaurantIdValue = document.getElementById('toDeleteRestaurantId').value;
//     console.log("account id to delete: " + accountIdValue);
//     console.log("restaruant id to delete: " + restaurantIdValue);
//     const response = await fetch('/delete-reservation', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({
//             accountId: accountIdValue,
//             restaurantId: restaurantIdValue,
//         })
//     });

//     const responseData = await response.json();
//     const messageElement = document.getElementById('deleteReservationResultMsg');

//     if (responseData.success) {
//         messageElement.textContent = "Data deleted successfully!";
//     } else {
//         messageElement.textContent = "Error deleting data!";
//     }
// }


// ---------------------------------------------------------------
// Initializes the webpage functionalities.
// Add or remove event listeners based on the desired functionalities.88
window.onload = function () {
    checkDbConnection();
    document.getElementById("updateReservation").addEventListener("submit", updateReservation);
    document.getElementById("insertionQuery").addEventListener("submit", insertReservation);
    // document.getElementById("deleteReservation").addEventListener("submit",deleteReservation); //Celine: delete reservation
};
