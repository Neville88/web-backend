// Universal Asynchronous JSON Fetcher (Callbacks, Promises, Async/Await)

(function () {
    // Check if the environment is a browser
    const isBrowser = typeof window !== 'undefined' && typeof window.document !== 'undefined';

    // Set the file path based on the environment
    const filePath = isBrowser ? 'sample2.json' : require('path').join(__dirname, 'sample2.json');

    // Display function for both environments
    function displayData(data) {
        if (isBrowser) {
            // Display data in the browser using a preformatted text block
            const container = document.getElementById("data-container") || document.body;
            container.innerHTML = `<pre>${JSON.stringify(data, null, 2)}</pre>`;
        } else {
            // Display data in the terminal console
            console.log("Fetched JSON Data:", data);
        }
    }

    // 1. Callback-based function to fetch JSON data
    function fetchJsonDataCallback(callback) {
        if (isBrowser) {
            // Fetch JSON data using fetch API in the browser
            fetch(filePath)
                .then(response => response.json())
                .then(data => callback(null, data)) // Pass data to callback
                .catch(error => callback(error, null)); // Handle errors
        } else {
            // Fetch JSON data using fs module in Node.js
            const fs = require('fs/promises');
            fs.readFile(filePath, 'utf-8')
                .then(data => callback(null, JSON.parse(data))) // Parse JSON and pass to callback
                .catch(error => callback(error, null)); // Handle errors
        }
    }

    // 2. Promise-based function to fetch JSON data
    function fetchJsonDataPromise() {
        if (isBrowser) {
            // Fetch JSON data using Promises in the browser
            return fetch(filePath)
                .then(response => response.json()) // Parse response as JSON
                .then(data => displayData(data)) // Display the data
                .catch(error => console.error("Promise Error:", error)); // Handle errors
        } else {
            // Fetch JSON data using Promises in Node.js
            const fs = require('fs/promises');
            return fs.readFile(filePath, 'utf-8')
                .then(data => displayData(JSON.parse(data))) // Parse JSON and display
                .catch(error => console.error("Promise Error:", error)); // Handle errors
        }
    }

    // 3. Async/Await function to fetch JSON data
    async function fetchJsonDataAsync() {
        try {
            if (isBrowser) {
                // Fetch JSON data using Async/Await in the browser
                const response = await fetch(filePath);
                if (!response.ok) throw new Error(`HTTP Error! Status: ${response.status} `);
                const data = await response.json();
                displayData(data); // Display the data
            } else {
                // Fetch JSON data using Async/Await in Node.js
                const fs = require('fs/promises');
                const data = await fs.readFile(filePath, 'utf-8');
                displayData(JSON.parse(data)); // Parse JSON and display
            }
        } catch (error) {
            // Handle errors for both environments
            console.error("Async/Await Error:", error);
        }
    }

    // Execute all three methods
    console.log("Fetching data using Callback:");
    fetchJsonDataCallback((error, data) => {
        if (error) return console.error("Callback Error:", error); // Handle callback error
        displayData(data); // Display the data
    });

    console.log("Fetching data using Promises:");
    fetchJsonDataPromise(); // Execute Promise-based fetch

    console.log("Fetching data using Async/Await:");
    fetchJsonDataAsync(); // Execute Async/Await-based fetch
})();