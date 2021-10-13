module.exports = {
  getUserFromMention: function(mention, Bot) {
    if (!mention) return;

    if (mention.startsWith('<@') && mention.endsWith('>')) {
      mention = mention.slice(2, -1);
        if (mention.startsWith('!')) {
          mention = mention.slice(1);
        }
      return Bot.users.cache.get(mention); //Returns undefined if user cannot be found.
    }
  }
}