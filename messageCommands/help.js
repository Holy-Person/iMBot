const fs = require("fs");
const { MessageEmbed } = require('discord.js');

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
      const CommandEmbed = new MessageEmbed()
        .setColor('#484C92')
        .setTitle(args[1])
        .addField("Description" , messageCommands[args].description)
        .setTimestamp();
      return message.channel.send({ embeds: [CommandEmbed] });
    }
    const HelpEmbed = new MessageEmbed()
      .setColor('#484C92')
      .setTitle(`Title1`)
      .addField("Field2_1" , `Field2_2`)
      .setTimestamp();
    return message.channel.send({ embeds: [HelpEmbed] });
  }
};

//command.description
//get command from filename
//maybe do embed?