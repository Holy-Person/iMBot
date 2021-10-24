const Config = require('../config.json');

module.exports = {
  description: `Sends back "Pong!".`, //Description and usage for the help command.
  usage: `Usage \`${Config.prefix}ping\`.`,
  method: function (message, _Bot, _args) { //Variables with _ are not being used at the moment.
    return message.channel.send(`Pong!`);
  }
};