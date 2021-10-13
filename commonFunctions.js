module.exports = {
  getUserFromMention: function(mention, Bot) {
    if (!mention) return;

    const validate = new RegExp(/([0-9])+/g);
    return Bot.users.cache.get(validate.exec(mention)[0]); //Returns undefined if user cannot be found.
  }
}