const { exec } = require('child_process');
 
function executeCommand(command) {
    exec(command, (error, stdout, stderr) => {
        if (error || stderr) {
            console.error(`Error executing command: ${error || stderr}`);
            return;
        }
 
        console.log('Command Output:');
        console.log(stdout);
    });
}
 
// Test Cases
executeCommand('ls -la');
executeCommand('echo "Hello, Node.js!"');