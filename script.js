// Function to create a promise that resolves after a random time between 1 and 3 seconds
function createPromise(id) {
    return new Promise(resolve => {
        const time = (Math.random() * 2 + 1).toFixed(3); // Random time between 1 and 3 seconds
        setTimeout(() => resolve({ id, time }), time * 1000);
    });
}

// Create 3 promises
const promises = [createPromise(1), createPromise(2), createPromise(3)];

// Insert a row with "Loading..." spanning two columns in the table
const table = document.getElementById('promise-table');
const loadingRow = document.createElement('tr');
const loadingCell = document.createElement('td');
loadingCell.colSpan = 2;
loadingCell.textContent = 'Loading...';
loadingRow.appendChild(loadingCell);
table.appendChild(loadingRow);

// Handle all promises with Promise.all
Promise.all(promises).then(results => {
    // Remove the loading row
    loadingRow.remove();

    let totalTime = 0;

    // Populate the table with each promise's result
    results.forEach(result => {
        const row = document.createElement('tr');
        const promiseCell = document.createElement('td');
        const timeCell = document.createElement('td');

        promiseCell.textContent = `Promise ${result.id}`;
        timeCell.textContent = result.time;

        row.appendChild(promiseCell);
        row.appendChild(timeCell);
        table.appendChild(row);

        // Accumulate total time
        totalTime += parseFloat(result.time);
    });

    // Add the total time row
    const totalRow = document.createElement('tr');
    const totalLabelCell = document.createElement('td');
    const totalTimeCell = document.createElement('td');

    totalLabelCell.textContent = 'Total';
    totalTimeCell.textContent = totalTime.toFixed(3); // Display total time to 3 decimal places

    totalRow.appendChild(totalLabelCell);
    totalRow.appendChild(totalTimeCell);
    table.appendChild(totalRow);
});

