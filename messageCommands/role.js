require("dotenv").config();
const commonFunctions = require('../commonFunctions.js');

module.exports = {
  description: `Lets users assign and remove roles on themselves.`,
  usage: `Usage \`${process.env.BOT_PREFIX}role\`.`,
  method: function (message, Bot, args) {
    let roleNeos = message.guild.roles.cache.find(role => role.id === '855574981048008705');

    let user = commonFunctions.getUserFromMention(args[1], Bot);

    if (!user) {
      return message.channel.send(`Couldn't find that role, try checking the name again.`);
    }

    user.roles.remove(roleNeos.id);
    return message.channel.send(`Removed the ${roleNeos.name} role.`);
  }
};