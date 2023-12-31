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

// join query
async function findStoresInThemePark(event) {
    event.preventDefault();

    const themeParkId = document.getElementById('joinThemeParkId').value;
    const findStoreParam = new URLSearchParams();
    findStoreParam.append('themeParkId', themeParkId);

    const response = await fetch(`/find-stores?${findStoreParam}`, {
        method: 'GET'
    });

    const responseData = await response.json();
    const storeTuples = responseData.result;

    const tableElement = document.getElementById('findStoresTable');
    const tableBody = tableElement.querySelector('tbody');
    // Always clear old, already fetched data before new fetching process.
    if (tableBody) {
        tableBody.innerHTML = '';
    }

    if (storeTuples.length == 0) {
        document.getElementById('joinQueryResultMsg').textContent = "No Result";
        return;
    } else {
        document.getElementById('joinQueryResultMsg').textContent = "";
    }

    storeTuples.forEach((store) => {
        const row = tableBody.insertRow();
        store.forEach((field, index) => {
            // some stores don't belong to a land
            if (index == 0 && field == null) {
                field = "N/A";
            }
            const cell = row.insertCell(index);
            cell.textContent = field;
        });
    });

    if (!responseData.success) {
        alert("Error!");
    }
}

// Aggregation with Group BY Query
async function findAvgPrices(event) {
    event.preventDefault();

    const themeParkId = document.getElementById('avgPriceThemeParkId').value;
    const findStoreParam = new URLSearchParams();
    findStoreParam.append('themeParkId', themeParkId);

    const response = await fetch(`/find-avg-prices?${findStoreParam}`, {
        method: 'GET'
    });

    const responseData = await response.json();
    const storeTuples = responseData.result;

    const tableElement = document.getElementById('avgPricesTable');
    const tableBody = tableElement.querySelector('tbody');
    // Always clear old, already fetched data before new fetching process.
    if (tableBody) {
        tableBody.innerHTML = '';
    }

    if (storeTuples.length == 0) {
        document.getElementById('avgPriceResultMsg').textContent = "No Result";
        return;
    } else {
        document.getElementById('avgPriceResultMsg').textContent = "";
    }

    storeTuples.forEach((store) => {
        const row = tableBody.insertRow();
        store.forEach((field, index) => {
            // console.log(index + ": " + field);
            const cell = row.insertCell(index);
            cell.textContent = field;
        });
    });

    if (!responseData.success) {
        alert("Error!");
    }
}

async function insertMerch(event) {
    event.preventDefault();
    const storeId = document.getElementById('insertMerchStoreId').value;
    const sku = document.getElementById('insertMerchSku').value;
    const name = document.getElementById('insertMerchName').value;
    const price = document.getElementById('insertMerchPrice').value;

    const response = await fetch('/insert-merchandise', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            storeId: storeId,
            sku: sku,
            name: name,
            price: price
        })
    });

    const responseData = await response.json();
    const messageElement = document.getElementById('insertMerchResultMsg');

    if (responseData.success) {
        messageElement.textContent = "New merchandise added successfully!";
    } else {
        messageElement.textContent = responseData.errorMessage;
    }
}

// ---------------------------------------------------------------
// Initializes the webpage functionalities.
// Add or remove event listeners based on the desired functionalities.88
window.onload = function () {
    checkDbConnection();
    document.getElementById("findStoresButton").addEventListener("click", findStoresInThemePark);
    document.getElementById("avgPriceButton").addEventListener("click", findAvgPrices);
    document.getElementById("insertMerchButton").addEventListener("click", insertMerch);
};