const { spawn } = require("child_process");
const Config = require('../config.json');

module.exports = {
  description: `Reboots the bot pulls the newest code from the canary branch.`,
  usage: `\`${Config.prefix}reboot\`.`,
  method: function (message, _Bot, _args) {
    if (!Config.userID.botDevs.find(u => u == message.author.id) ) {
      return message.channel.send(
        `Sorry ${message.author.username}, you're not allowed to use that command.`
      );
    }

    const reboot = spawn(
      "sudo git pull origin canary && pm2 start deploy-commands.js --no-autorestart && pm2 restart iMBot.js",
      {
        shell: true,
      }
    );

    reboot.on("close", (code) => {
      console.log(
        `child process exited with code ${code}./nBot failed to reboot via Discord.`
      );
    });
    return message.channel.send(`I'm rebooting... please wait.`);
  }
};