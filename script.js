// Function to create a promise that resolves after a random time between 1 and 3 seconds
function createPromise(index) {
    return new Promise((resolve) => {
        const timeToResolve = Math.random() * (3 - 1) + 1; // Random time between 1 and 3 seconds
        setTimeout(() => {
            resolve({ promise: `Promise ${index}`, time: timeToResolve.toFixed(3) });
        }, timeToResolve * 1000); // Convert to milliseconds
    });
}

// Generate three promises
const promises = [createPromise(1), createPromise(2), createPromise(3)];

// Update table with results after all promises resolve
Promise.all(promises).then((results) => {
    const table = document.getElementById('promise-table');
    const loadingRow = document.getElementById('loading');

    // Remove the "Loading..." row
    if (loadingRow) {
        loadingRow.remove();
    }

    // Calculate total time
    let totalTime = 0;

    // Append each promise result to the table
    results.forEach(result => {
        totalTime += parseFloat(result.time);

        const row = document.createElement('tr');
        const promiseCell = document.createElement('td');
        const timeCell = document.createElement('td');

        promiseCell.textContent = result.promise;
        timeCell.textContent = result.time;

        row.appendChild(promiseCell);
        row.appendChild(timeCell);
        table.appendChild(row);
    });

    // Add the total time row
    const totalRow = document.createElement('tr');
    const totalLabelCell = document.createElement('td');
    const totalTimeCell = document.createElement('td');

    totalLabelCell.textContent = 'Total';
    totalTimeCell.textContent = totalTime.toFixed(3); // Total time rounded to 3 decimal places

    totalRow.appendChild(totalLabelCell);
    totalRow.appendChild(totalTimeCell);
    table.appendChild(totalRow);
});
