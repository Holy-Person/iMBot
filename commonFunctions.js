module.exports = {
  getUserFromMention: function(mention, Bot) {
    if (!mention) return;

    const validate = new RegExp(/([0-9])+/g);

    if (mention.startsWith('<@') && mention.endsWith('>')) {
      return Bot.users.cache.get(validate.exec(mention)[0]); //Returns undefined if user cannot be found.
    }
  },
  betterRound: function(number, decimalPlaces) {
    const powTen = Math.pow(10, decimalPlaces);
    return Math.round(number * powTen) / powTen;
  }
}