const fs = require('fs').promises;
 
async function readFileContent(filePath) {
    try {
        const content = await fs.readFile(filePath, 'utf-8');
        console.log(content);
    } catch (error) {
        console.error(`Error reading file: ${error.message}`);
    }
}
 
// Test Cases
readFileContent('Day_01/file1.txt');
readFileContent('Day_01/empty-file.txt');
readFileContent('/Users/KI20449224/Desktop/NodeJS/nonexistent-file.txt');