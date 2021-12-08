const Config = require('../config.json');
const CommonFunctions = require('../commonFunctions.js');
const CurrencyInteractions = require('../currencyInteractions.js');

module.exports = {
  description: `Description not set.`,
  usage: `Usage not set.`,
  method: async function (message, Bot, args, Database) {
    switch (args[0]) {
      case 'add':
        if (Config.userID.botDevs.find(u => u == message.author.id) ) {
          return message.channel.send(`You do not have permission to use this command.`);
        }

        if (!args[2]) {
          return message.channel.send(`Please define the amount of ${Config.currencyName} you want to add.`);
        }

        let mention = CommonFunctions.getUserFromMention(args[1], Bot);
        if(!mention) { return message.channel.send(`Couldn't find the mentioned user.`); }

        const Target = mention.id;
        const Interaction = await CurrencyInteractions.give(Database, +(args[2]), message.author.id, Target);
        switch (Interaction) {
          case 0:
            return message.channel.send(`Created an entry in the database and added ${args[2]} ${Config.currencyName} to <@${Target}>.`);
          case 1:
            return message.channel.send(`Added ${args[2]} ${Config.currencyName} to <@${Target}>.`);
          case 2:
            return message.channel.send(`Unknown error, couldn't update database entry.`);
          case 3:
            return message.channel.send(`Unknown error, couldn't create an entry in the database.`);
          default:
            return message.channel.send(`Error with the code ${Interaction}. Target is <@${Target}>`);
        }
        break;
      case 'view':
        if (!args[1]) {
          const FoundBalance = await CurrencyInteractions.give(Database, message.author.id);
          if (FoundBalance) {
            return message.channel.send(`You currently have ${FoundBalance} ${Config.currencyName}.`);
          } else {
            return message.channel.send(`You currently seem to have no ${Config.currencyName}.`);
          }
        }

        let mention2 = CommonFunctions.getUserFromMention(args[1], Bot);
        if(!mention2) { return message.channel.send(`Couldn't find the mentioned user.`); }

        const FoundBalance = await CurrencyInteractions.give(Database, mention2.id);
        if (FoundBalance) {
        	return message.channel.send(`<@${mention2.id}> currently has ${FoundBalance} ${Config.currencyName}.`);
        } else {
          return message.channel.send(`That user currently doesn't seem to have any ${Config.currencyName}.`);
        }

        break;
      case 'update':
      //Temp version
        const affectedEntries = await Database.update({ balance: 0.2 }, { where: { user: message.author.id } });

        if (affectedEntries > 0) {
          return message.channel.send(`You now have 0.2 ${Config.currencyName}.`);
        }

        return message.channel.send(`Some random error.`);

        break;
      case 'clear':
      //Temp version
        const rowCount = await Database.destroy({ where: { user: message.author.id } });

        if (!rowCount) return message.channel.send(`You don't have any ${Config.currencyName}.`);

        return message.channel.send(`${Config.currencyName} cleared.`);

        break;
      default:
        return message.channel.send('Please define args like add/view/update/clear.');
    }
  }
};