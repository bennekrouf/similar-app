require('dotenv').config({ path: process.argv[2] });

const exec = require('child_process').exec;
const command = process.argv.slice(3).join(' ');

exec(command, (err, stdout, stderr) => {
  console.log(stdout);
  console.error(stderr);
  if (err) {
    process.exit(err.code);
  }
});
