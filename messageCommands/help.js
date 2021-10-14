const fs = require("fs");
const { MessageEmbed } = require('discord.js');
require("dotenv").config();

const messageCommandFiles = fs
  .readdirSync("./messageCommands")
  .filter((file) => file.endsWith(".js"));

var messageCommands = new Array();

for (const file of messageCommandFiles) {
  const command = require(`../messageCommands/${file}`);
  const {
    name: name = file.split('.js')[0],
    description: description = "foo",
    usage: usage = "bar"
  } = command;

  let messageCommand = {
    "name": name,
    "description": description,
    "usage": usage
  };
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
    if(commandObject) {
      const CommandEmbed = new MessageEmbed()
        .setTitle(args[0])
        .addField("Description" , `test: `+commandObject.description);
      CommandEmbed.setColor('#484C92');
      return message.channel.send({ embeds: [CommandEmbed] });
    }
    const HelpEmbed = new MessageEmbed()
      .setColor('#484C92')
      .setTitle(`Command List`)
    return message.channel.send({ embeds: [HelpEmbed] });
  }
};