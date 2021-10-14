const fs = require("fs");
const { Discord } = require("discord.js");

module.exports = {
  description: `Lists all help commands.`,
  method: function (message, _Bot, args) {
    const messageCommandFiles = fs
      .readdirSync("./messageCommands")
      .filter((file) => file.endsWith(".js"));

    let messageCommands = {};

    for (const file of messageCommandFiles) {
      const command = require(`../messageCommands/${file}`);
      const name = file.slice(0, -3);
      messageCommands[name] = command;
    }
    if(messageCommands[args]) {
      return message.channel.send(messageCommands[args].description);
    }
    const HelpEmbed = new Discord.RichEmbed()
      HelpEmbed.setColor('#484C92');
      HelpEmbed.setTitle(`Title1`);
      HelpEmbed.addField("Field2_1" , `Field2_2`);
      HelpEmbed.setTimestamp();
    return message.channel.send(HelpEmbed);
  }
};

//command.description
//get command from filename
//maybe do embed?