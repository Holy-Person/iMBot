const Config = require('../config.json');

module.exports = {
  description: `Lets users assign and remove roles on themselves.`,
  usage: `Usage \`${Config.prefix}role\`.`,
  method: function (message, _Bot, args) {

    if (!args[0]) {
      return message.channel.send(`Default help text due to no args`);
    }

    const foundRoleObject = Config.selfRoles.find(x => x.name.toLowerCase() === args[0]);

    if (typeof foundRoleObject == 'undefined') {
      return message.channel.send(`Sorry, I couldn't find that role.`);
    }

    let foundRole = message.guild.roles.cache.find(r => r.id === foundRoleObject.id);



    if (message.member.roles.cache.has(foundRole.id)) {
      message.member.roles.remove(foundRole.id); //message.member gets a member instead of a user, members are unique to guilds while users aren't. ex: message.author
      return message.channel.send(`Removed the "${foundRole.name}" role.`);
    } else {
      message.member.roles.add(foundRole.id);
      return message.channel.send(`Added the "${foundRole.name}" role.`);
    }
  }
};