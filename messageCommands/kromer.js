const Config = require('./config.json');
const commonFunctions = require('../commonFunctions.js');

module.exports = {
  description: `Lets users assign and remove roles on themselves.`,
  usage: `Usage \`${Config.prefix}kromer [add/remove] [user ping] [amount of kromer]\`.`,
  method: function (message, Bot, args) {
    let reply;

    if (args.length < 2) {
      return message.channel.send(
        "Usage is: `iM!kromer [add/remove] [user ping] [amount of kromer]`"
      );
    }

    const user = commonFunctions.getUserFromMention(args[1], Bot); // gets user ID from ping
		if(!user) return message.channel.send(`Undefined user.`);
    // we save the ID instead of user for the database

    const amount = parseFloat(args[2]);

    if (isNaN(amount))
      return message.channel.send(
        "https://tenor.com/view/oomfie-twitter-mya-birdy-moots-gif-21657254"
      );
    // die oomfie gif

    if (args[0] === "add") {
      reply = `Added ${amount} kromer to ${user}`;
    } else if (args[0] === "remove") {
      reply = `Removed ${amount} kromer from ${user}`;
    } else {
      return message.channel.send("invalid command");
      // here we return directly to stop
      // execution if the command is bad
    }

    return message.channel.send(reply);
  }
};