const fs = require("fs");
const { MessageEmbed } = require('discord.js');
require("dotenv").config();

const messageCommandFiles = fs
  .readdirSync("./messageCommands")
  .filter((file) => file.endsWith(".js"));

const messageCommands = new Array();

/*messageCommands.sort(function(a, b){
    return a.name - b.name;
});*/ //Use sorting for paging

module.exports = {
  description: `Shows general help for a given command.`,
  usage: `Usage \`${process.env.BOT_PREFIX}help [command name]\`.`,
  method: function (message, _Bot, args) {
    for (const file of messageCommandFiles) {
      const command = require(`../messageCommands/${file}`);
      const {
        name: name = file.split('.js')[0],
        description: description = "No description provided.",
        usage: usage = "No usage provided."
      } = command;

      let messageCommand = {
        "name": name,
        "description": description,
        "usage": usage
      };

    	messageCommands.push(messageCommand);
    } //There's probably 50000 ways to do this more optimized but I'm at my limit for today.

    const commandObject = messageCommands.find(x => x.name === args[0]);
    if(typeof commandObject != 'undefined') {
      const CommandEmbed = new MessageEmbed()
        .setColor('#484C92');
        .setTitle(args[0])
        .addField("Description", commandObject.description);
        .addField("Usage", commandObject.usage);
      return message.channel.send({ embeds: [CommandEmbed] });
    }
    const HelpEmbed = new MessageEmbed()
      .setTitle(`Command List`);
    HelpEmbed.setColor('#484C92');//This also works btw, use for filling pages.
    return message.channel.send({ embeds: [HelpEmbed] });
  }
};