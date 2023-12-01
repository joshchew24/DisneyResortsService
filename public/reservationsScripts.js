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

// refreshes reservation table
async function refreshReservationsTable() {
    const response = await fetch(`/get-all-reservations`, {
        method: 'GET'
    });
    const responseData = await response.json();
    const reservationTuples = responseData.result;

    const tableElement = document.getElementById('reservationsTable');
    const tableBody = tableElement.querySelector('tbody');
    // Always clear old, already fetched data before new fetching process.
    if (tableBody) {
        tableBody.innerHTML = '';
    }

    let time = "";
    reservationTuples.forEach((reservation) => {
        const row = tableBody.insertRow();
        reservation.forEach((field, index) => {
            if (index == 3) {
                let datetime = field.split(" ");
                field = datetime[0];
                time = datetime[1];
            }
            const cell = row.insertCell(index);
            cell.textContent = field;
            if (index == 3) {
                const timeCell = row.insertCell(4);
                timeCell.textContent = time;
            }
        });
    });
}

async function populateUpdateForm(event) {
    // for some reason, we can only click cells and not the row
    if (event.target.tagName === "TD") {
        const updateForm = document.getElementById("updateReservation");

        // get the clicked cell's parent row, then all the sibling cells
        const clickedRow = event.target.parentNode;
        const cells = clickedRow.getElementsByTagName("td");

        // get the values from the cells
        const accountId = cells[0].textContent;
        const restaurantId = cells[1].textContent;
        const partySize = cells[2].textContent;
        const date = cells[3].textContent;
        const time = cells[4].textContent;

        // populate update form with the values
        updateForm.querySelector("#accountId").value = accountId;
        updateForm.querySelector("#restaurantId").value = restaurantId;
        updateForm.querySelector("#newPartySize").value = partySize;
        updateForm.querySelector("#newDate").value = date;
        updateForm.querySelector("#newTime").value = time.substring(0,5);
        
    
        updateForm.scrollIntoView(
            {
                behaviour: "smooth",
                block: "start",
            }
        )
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
    } else {
        messageElement.textContent = "Error updating reservation!";
    }
    refreshReservationsTable();
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
    refreshReservationsTable();
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
    refreshReservationsTable();
    document.getElementById("reservationsTable").addEventListener("click", populateUpdateForm);
    document.getElementById("updateReservation").addEventListener("submit", updateReservation);
    document.getElementById("insertionQuery").addEventListener("submit", insertReservation);
    // document.getElementById("deleteReservation").addEventListener("submit",deleteReservation); //Celine: delete reservation
};
