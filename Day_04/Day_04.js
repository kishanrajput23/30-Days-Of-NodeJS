const path = require('path');
 
function resolvePath(relativePath) {
    const absolutePath = path.resolve(__dirname, relativePath);
    console.log(`Resolved Path: ${absolutePath}`);
}
 
// Test Cases
resolvePath('file.txt');
resolvePath('Day_01/empty-file.txt');