const { spawn } = require('child_process');
module.exports = {
  method: function(message, Bot, args) {
    const ls = spawn('pm2 stop all && git pull && npm start', {
      shell: true
    });

    ls.stdout.on('data', (data) => {
      console.log(`stdout: ${data}`);
    });

    ls.stderr.on('data', (data) => {
      console.error(`stderr: ${data}`);
    });

    ls.on('close', (code) => {
      console.log(`child process exited with code ${code}`);
    });
    return message.channel.send(`Test text.`);
  }
};