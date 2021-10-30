const Config = require('../config.json');

module.exports = {
  description: `Lets users assign and remove roles on themselves.`,
  usage: `\`${Config.prefix}role [roleName]\`.`,
  method: function (message, _Bot, args) {

    if (!args[0]) {
      return message.channel.send(`Please provide a role name you want to add/remove.\nUsage: ${Config.prefix}role [roleName]`);
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
      if (foundRoleObject.blockedUsers.includes(message.author.id) ) {
        return message.channel.send(`Sorry, you are currently not eligible to recieve this role.`);
      }
      message.member.roles.add(foundRole.id);
      return message.channel.send(`Added the "${foundRole.name}" role.`);
    }
  }
};