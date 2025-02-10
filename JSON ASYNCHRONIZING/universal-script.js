// Universal Script for Browser and Terminal

(async function () {
    // Environment Detection
    const isBrowser = typeof window !== 'undefined' && typeof window.document !== 'undefined';

    // Common function to process JSON data
    function processData(jsonData) {
        if (isBrowser) {
            displayDataInTable(jsonData);
        } else {
            console.log("Fetched JSON Data:", jsonData);
        }
    }

    // Fetch JSON Data
    async function fetchJson() {
        try {
            if (isBrowser) {
                console.log("Fetching JSON from:", window.location.origin + "/sample2.json");
                const response = await fetch("sample2.json");
                if (!response.ok) throw new Error(`HTTP Error! Status: ${response.status}`);
                const jsonData = await response.json();
                processData(jsonData);
            } else {
                const fs = require('fs/promises');
                const path = require('path');
                const filePath = path.join(__dirname, 'sample2.json');
                const data = await fs.readFile(filePath, 'utf-8');
                const jsonData = JSON.parse(data);
                processData(jsonData);
            }
        } catch (error) {
            if (isBrowser) {
                console.error("Network Error:", error);
                document.getElementById("data-container").innerHTML = "<p style='color:red;'>Network error. Try again later.</p>";
            } else {
                console.error("Error reading JSON file:", error);
            }
        }
    }

    // Browser-specific function to display data in a table
    function displayDataInTable(jsonData) {
        const container = document.getElementById("data-container") || document.body;

        // Handle both single object and array of objects
        const dataArray = Array.isArray(jsonData) ? jsonData : [jsonData];

        if (dataArray.length === 0) {
            container.innerHTML = "<p style='color:red;'>No data available to display.</p>";
            return;
        }

        let html = "<table border='1'><tr>";

        // Add headers dynamically
        Object.keys(dataArray[0]).forEach(key => {
            html += `<th>${key}</th>`;
        });
        html += "</tr>";

        // Add data rows
        dataArray.forEach(item => {
            html += "<tr>";
            Object.values(item).forEach(value => {
                if (typeof value === 'object' && value !== null) {
                    html += `<td>${JSON.stringify(value)}</td>`;
                } else {
                    html += `<td>${value}</td>`;
                }
            });
            html += "</tr>";
        });

        html += "</table>";
        container.innerHTML = html;
    }

    // Execute
    await fetchJson();
})();