module.exports = {
  method: function(message, Bot, args) {
    return message.channel.send(`Pong!`);
  }
};