const { exec } = require('child_process');
const os = require('os');

const isMac = os.platform() === 'darwin';
const isLinux = os.platform() === 'linux';

if (isMac) {
    // Run the iOS command
    exec('rm -Rf ~/Library/Developer/Xcode/DerivedData && ENVFILE=.env.local yarn ios', (error, stdout, stderr) => {
        if (error) {
            console.error(`Error: ${error.message}`);
            return;
        }
        if (stderr) {
            console.error(`Stderr: ${stderr}`);
            return;
        }
        console.log(`Stdout: ${stdout}`);
    });
} else if (isLinux) {
    // Run the Android command
    exec('ENVFILE=.env.local yarn android', (error, stdout, stderr) => {
        if (error) {
            console.error(`Error: ${error.message}`);
            return;
        }
        if (stderr) {
            console.error(`Stderr: ${stderr}`);
            return;
        }
        console.log(`Stdout: ${stdout}`);
    });
} else {
    console.error('Unsupported OS');
}
