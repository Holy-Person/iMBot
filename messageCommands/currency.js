const Config = require('../config.json');
const commonFunctions = require('../commonFunctions.js');

module.exports = {
  description: `Description not set.`,
  usage: `Usage not set.`,
  method: function (message, Bot, args, Database) {
		try {
			const test = await Database.create({
				user: message.author.id,
        balance: 0.1,
			});

			return interaction.reply(`You now have 0.1 currency.`);
		} catch (error) {
			if (error.name === 'SequelizeUniqueConstraintError') {
				return interaction.reply('Already got currency.');
			}

			return interaction.reply('Something else went wrong.');
		}
  }
};