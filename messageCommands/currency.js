const Config = require('../config.json');
const commonFunctions = require('../commonFunctions.js');

module.exports = {
  description: `Description not set.`,
  usage: `Usage not set.`,
  method: async function (message, Bot, args, Database) {
    switch (args[0]) {
      case 'add':
        try {
          const test = await Database.create({
            user: message.author.id,
            balance: 0.1,
          });

          return message.channel.send(`You now have 0.1 currency.`);
        } catch (error) {
          if (error.name === 'SequelizeUniqueConstraintError') {
            return message.channel.send('Already got currency.');
          }

          return message.channel.send('Something else went wrong.');
        }
        break;
      case 'view':
        const test = await Database.findOne({ where: { user: message.author.id } });

        if (test) {
        	return message.channel.send(`<@${test.user}> currently has ${test.balance} currency.`);
        }

        return message.channel.send(`Could not find your money. Are you poor?`);

        break;
      default:
        return message.channel.send('Please define args like add/view.');
    }

  }
};