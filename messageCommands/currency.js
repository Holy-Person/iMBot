const Config = require('../config.json');
const CommonFunctions = require('../commonFunctions.js');
const CurrencyInteractions = require('../currencyInteractions.js');

module.exports = {
  description: `Description not set.`,
  usage: `Usage not set.`,
  method: async function (message, Bot, args, Database) {
    let mention = CommonFunctions.getUserFromMention(args[1], Bot);
    switch (args[0]) {
      case 'modify':
        if (!Config.userID.discordMods.find(u => u == message.author.id) ) {
          return message.channel.send(`You do not have permission to use this command.`);
        }

        if (!args[2]) {
          return message.channel.send(`Please define a value of ${Config.currencyName} to modify the entry with.`);
        }

        if (!mention) { return message.channel.send(`Couldn't find the mentioned user.`); }

        const Target = mention.id;
        const Interaction = await CurrencyInteractions.modify(Database, +(args[2]), Target);
        switch (Interaction) {
          case 0:
            return message.channel.send(`Created an entry in the database and modified balance by ${args[2]} ${Config.currencyName} for <@${Target}>.`);
          case 1:
            return message.channel.send(`Modified <@${Target}>'s balance by ${args[2]} ${Config.currencyName}.`);
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
          const FoundBalance = await CurrencyInteractions.find(Database, message.author.id);
          if (FoundBalance) {
            return message.channel.send(`You currently have ${FoundBalance} ${Config.currencyName}.`);
          } else {
            return message.channel.send(`You currently seem to have no ${Config.currencyName}.`);
          }
        }

        if (!mention) { return message.channel.send(`Couldn't find the mentioned user.`); }

        const FoundBalance = await CurrencyInteractions.find(Database, mention.id);
        if (FoundBalance) {
        	return message.channel.send(`<@${mention.id}> currently has ${FoundBalance} ${Config.currencyName}.`);
        } else {
          return message.channel.send(`That user currently doesn't seem to have any ${Config.currencyName}.`);
        }
        break;
      case 'send':
        if (!mention) { return message.channel.send(`Couldn't find the mentioned user.`); }

        const Transaction = await CurrencyInteractions.transfer(Database, +(args[2]), message.author.id, mention.id);

        switch (Transaction) {
          case 0:
            return message.channel.send(`Transaction successful.`);
          case 1:
            return message.channel.send(`Transfer value too low.`);
          case 2:
            return message.channel.send(`No entry in the database for operator.`);
          case 3:
            return message.channel.send(`Not enough ${Config.currencyName}.`);
          default:
            return message.channel.send(`Error with the code ${Transaction}. Target is <@${Target}>`);
        }

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