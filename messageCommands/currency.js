const Config = require('../config.json');
const commonFunctions = require('../commonFunctions.js');

module.exports = {
  description: `Description not set.`,
  usage: `Usage not set.`,
  method: async function (message, Bot, args, Database) {
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
  }
};