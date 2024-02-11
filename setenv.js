// Import necessary modules
const { spawn } = require('child_process');
require('dotenv').config({ path: process.argv[2] });

// Extract the command to execute from the command line arguments
const commandToExecute = process.argv.slice(3).join(' ');

// Split the command into the command part and the arguments part
const [cmd, ...args] = commandToExecute.split(' ');

// Use spawn to execute the command
const childProcess = spawn(cmd, args, { stdio: 'inherit', shell: true });

// Handle the child process events
childProcess.on('close', (code) => {
  console.log(`Child process exited with code ${code}`);
  process.exit(code);
});

childProcess.on('error', (error) => {
  console.error(`Failed to start child process: ${error}`);
  process.exit(1);
});
