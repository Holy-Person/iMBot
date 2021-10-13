const { spawn } = require('child_process');
const idList = require('../idList.js');
require('../dotenv').config();

module.exports = {
  method: function(message, Bot, args) {

    if(!process.env.ADMIN_USERS.split(",").includes(message.author.id)) {return message.channel.send(`Sorry ${message.author.username}, you're not allowed to use that command.`); }
    
    const reboot = spawn('sudo git pull && pm2 start deploy-commands.js --no-autorestart && pm2 restart iMBot.js', {
      shell: true
    });

    reboot.on('close', (code) => {
      console.log(`child process exited with code ${code}./nBot was rebooted via Discord.`);
    });
    return message.channel.send(`I'm rebooting... please wait.`);
  }
};