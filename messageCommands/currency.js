const Config = require('../config.json');
const commonFunctions = require('../commonFunctions.js');
const CurrencyInteractions = require('../currencyInteractions.js');

module.exports = {
  description: `Description not set.`,
  usage: `Usage not set.`,
  method: async function (message, Bot, args, Database) {
    switch (args[0]) {
      case 'add':
        if (Config.userID.botDevs.find(u => u == message.author.id) ) {
          const mentionedUser = commonFunctions.getUserFromMention(args[1], Bot);
          if (!args[2]) {
            return message.channel.send(`Please define the amount of currency you want to add.`);
          }
          var Target = message.author.id;
          if(mentionedUser) { Target = mentionedUser.id; }
          const Interaction = CurrencyInteractions.give(Database, +(args[2]), message.author.id, Target);
          switch (Interaction) {
            case 0:
              message.channel.send(`Created an entry in the database and added ${args[2]} ${Config.currencyName} to <@${Target}>.`);
            break;
            case 1:
              message.channel.send(`Added ${args[2]} ${Config.currencyName} to <@${Target}>.`);
            break;
          }
        }
        break;
      case 'view':
        const test = await Database.findOne({ where: { user: message.author.id } });

        if (test) {
        	return message.channel.send(`<@${test.user}> currently has ${test.balance} currency.`);
        }

        return message.channel.send(`Could not find your money. Are you poor?`);

        break;
      case 'update':
        const affectedEntries = await Database.update({ balance: 0.2 }, { where: { user: message.author.id } });

        if (affectedEntries > 0) {
          return message.channel.send(`You now have 0.2 currency.`);
        }

        return message.channel.send(`Some random error.`);

        break;
      case 'clear':
        const rowCount = await Database.destroy({ where: { user: message.author.id } });

        if (!rowCount) return message.channel.send(`You don't have any currency.`);

        return message.channel.send(`Currency cleared.`);

        break;
      default:
        return message.channel.send('Please define args like add/view/update/clear.');
    }
  }
};