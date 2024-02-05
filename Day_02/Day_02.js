const fs = require('fs').promises;
const path = require('path');
 
async function writeToFile(filePath, content) {
    try {
        await fs.writeFile(filePath, content, 'utf-8');
        console.log(`Data written to ${filePath}`);
    } catch (error) {
        console.error(`Error writing to file: ${error.message}`);
    }
}
 
// Test Cases
writeToFile('Day_02/output1.txt', 'Sample content.');
writeToFile('Day_02/nonexistent-folder/output.txt', 'Content in a non-existent folder.');