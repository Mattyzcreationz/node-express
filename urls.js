const fs = require('fs');
const path = require('path');
const http = require('http');
const https = require('https');
const { URL } = require('url');

// Get filename from command line argument
const inputFile = process.argv[2];
if (!inputFile) {
  console.error("Usage: node urls.js FILENAME");
  process.exit(1);
}

// Read URLs from the specified file
fs.readFile(inputFile, 'utf8', async (err, data) => {
  if (err) {
    console.error("Error reading file:", err.message);
    process.exit(1);
  }

  const urls = data.split('\n').filter(url => url.trim());

  for (const urlString of urls) {
    try {
      const url = new URL(urlString);
      const hostname = url.hostname;

      // Fetch the page content
      const html = await fetchHtml(urlString);

      // Save HTML to a file named after the hostname
      const outputFilePath = path.join(__dirname, hostname);
      fs.writeFile(outputFilePath, html, (err) => {
        if (err) {
          console.error(`Error writing to file ${hostname}:`, err.message);
        } else {
          console.log(`Wrote to ${hostname}`);
        }
      });
    } catch (error) {
      console.error(`Couldn't download ${urlString}:`, error.message);
    }
  }
});

// Function to fetch HTML content of a URL
function fetchHtml(url) {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith('https') ? https : http;
    protocol.get(url, (response) => {
      if (response.statusCode !== 200) {
        reject(new Error(`Failed to load, status code: ${response.statusCode}`));
        return;
      }
      let data = '';
      response.on('data', (chunk) => data += chunk);
      response.on('end', () => resolve(data));
    }).on('error', (err) => reject(err));
  });
}
