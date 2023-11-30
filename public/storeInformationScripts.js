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

    storeTuples.forEach((store) => {
        const row = tableBody.insertRow();
        store.forEach((field, index) => {
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
        alert("Error in Join Query");
    }
}

// Aggregation with Group BY Query
// async function findAvgPrices(event) {
//     event.preventDefault();

//     const themeParkId = document.getElementById('joinThemeParkId').value;
//     const findStoreParam = new URLSearchParams();
//     findStoreParam.append('themeParkId', themeParkId);

//     const response = await fetch(`/find-avg-prices?${findStoreParam}`, {
//         method: 'GET'
//     });
// }

// ---------------------------------------------------------------
// Initializes the webpage functionalities.
// Add or remove event listeners based on the desired functionalities.88
window.onload = function () {
    checkDbConnection();
    document.getElementById("findStoresButton").addEventListener("click", findStoresInThemePark);
};