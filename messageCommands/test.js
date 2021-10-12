module.exports = {
  method: function(message, Bot, args) {
    var test = message.author.tag;
    return message.channel.send(`This is a test by ${test}: ${args}`);
  }
};