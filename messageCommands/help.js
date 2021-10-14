const fs = require("fs");
const { MessageEmbed } = require('discord.js');
require("dotenv").config();

const messageCommandFiles = fs
  .readdirSync("./messageCommands")
  .filter((file) => file.endsWith(".js"));

var messageCommands = new Array();

for (const file of messageCommandFiles) {
  const command = require(`../messageCommands/${file}`);
  console.log(command.module.name, command.module.description, command.module.usage);
  const {
    module.name: name = file.split('.js')[0],
    module.description: description = "No description provided.",
    module.usage: usage = "No usage provided."
  } = command;

  console.log(name, description, usage);

  let messageCommand = {
    "name": name,
    "description": description,
    "usage": usage
  };

  console.log(messageCommand.name, messageCommand.description, messageCommand.usage);

	messageCommands.push(messageCommand);
}

/*messageCommands.sort(function(a, b){
    return a.name - b.name;
});*/

module.exports = {
  description: `Shows general help for a given command.`,
  usage: `Usage \`${process.env.BOT_PREFIX}help [command name]\`.`,
  method: function (message, _Bot, args) {
    const commandObject = messageCommands.find(x => x.name === args[0]);
    console.log(args[0], commandObject, commandObject.description);
    if(commandObject) {
      const CommandEmbed = new MessageEmbed()
        .setTitle(args[0])
        .addField("Description" , commandObject.description);
      CommandEmbed.setColor('#484C92');
      return message.channel.send({ embeds: [CommandEmbed] });
    }
    const HelpEmbed = new MessageEmbed()
      .setColor('#484C92')
      .setTitle(`Command List`)
    return message.channel.send({ embeds: [HelpEmbed] });
  }
};