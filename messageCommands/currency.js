const Config = require('../config.json');
const commonFunctions = require('../commonFunctions.js');

module.exports = {
  description: `Description not set.`,
  usage: `Usage not set.`,
  method: function (message, Bot, args) {
    return message.channel.send(`Currently unavailable.`);
  }
};