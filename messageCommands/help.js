const fs = require("fs");

module.exports = {
  description: `Lists all help commands.`,
  method: function (message, _Bot, _args) {
    /*const messageCommandFiles = fs
      .readdirSync("./messageCommands")
      .filter((file) => file.endsWith(".js"));

    let messageCommands = {};

    for (const file of messageCommandFiles) {
      const command = require(`../messageCommands/${file}`);
      const name = file.slice(0, -3);
      messageCommands[name] = command;
    }*/

    return message.channel.send(module.exports.description);
  }
};

//command.description
//get command from filename
//maybe do embed?