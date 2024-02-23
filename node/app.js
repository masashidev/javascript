const fs = require('fs');
const path = require('path');
const readline = require('readline');

const jsonPath = path.join(__dirname, 'keywords.json');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Function to ask for input
function askForKeyword() {
  rl.question('Enter a keyword (or type "exit" to finish): ', (keyword) => {
    if (keyword === 'exit') { // Check for the ending keyword
      console.log('Exiting...');
      rl.close(); // Close the readline interface
    } else {
      // Read the current keywords, add the new one, and write back to the file
      fs.readFile(jsonPath, 'utf8', (err, data) => {
        if (err) {
          console.error('Error:', err);
          return;
        }

        const keywords = JSON.parse(data);

        if (keywords.includes(keyword)) {
          console.log('This keyword is already in the list');
          askForKeyword(); // Ask for another keyword
        } else {
        keywords.push(keyword);

        fs.writeFile(jsonPath, JSON.stringify(keywords, null, 2), (err) => {
          if (err) {
            console.error('Error:', err);
            return;
          }
          console.log('Keyword added successfully');
          askForKeyword(); // Ask for another keyword
        });
        }
      });
    }
  });
}

// Initial call to start the loop
askForKeyword();
