require("dotenv").config();

module.exports = {
  description: `Lets users assign and remove roles on themselves.`,
  usage: `Usage \`${process.env.BOT_PREFIX}role\`.`,
  method: function (message, Bot, args) {
    let roleNeos = message.guild.roles.cache.find(role => role.id === '855574981048008705');

    message.author.roles.remove(roleNeos.id);
    return message.channel.send(`Removed the ${roleNeos.name} role.`);
  }
};