const Config = require('../config.json');
const { MessageEmbed } = require('discord.js');

module.exports = {
  description: `Lets users assign and remove roles on themselves.`,
  usage: `\`${Config.prefix}role [roleName]\`.`,
  method: function (message, _Bot, args) {

    if (!args[0]) {
      const ListEmbed = new MessageEmbed()
        .setColor('#484C92')
        .setTitle(`Available Selfroles`);
      for (const role of Config.selfRoles) {
        ListEmbed.addField(`header here`, `<@&${role.id}> - ${role.name}`);
      };
      return message.channel.send({ embeds: [ListEmbed] });
      //This is a very temporary solution.
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
      if (foundRoleObject.blockedUsers.includes(message.author.id) ) { //You can block certain users from obtaining a role via their UserID in the config. This will only stop them from getting the role, not removing it.
        return message.channel.send(`Sorry, you are currently not eligible to recieve this role.`);
      }
      message.member.roles.add(foundRole.id);
      return message.channel.send(`Added the "${foundRole.name}" role.`);
    }
  }
};