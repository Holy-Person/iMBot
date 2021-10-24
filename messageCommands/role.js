const Config = require('./config.json');

module.exports = {
  description: `Lets users assign and remove roles on themselves.`,
  usage: `Usage \`${Config.prefix}role\`.`,
  method: function (message, Bot, args) {

    let roleNeos = message.guild.roles.cache.find(role => role.id === '855574981048008705');

    if (message.member.roles.cache.has(roleNeos.id)) {
      message.member.roles.remove(roleNeos.id); //message.member gets a member instead of a user, members are unique to guilds while users aren't. ex: message.author
      return message.channel.send(`Removed the "${roleNeos.name}" role.`);
    }

    return message.channel.send(`Could not remove the "${roleNeos.name}" role, you do not have it.`);
  }
};