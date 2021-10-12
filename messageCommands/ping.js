module.exports = {
    method: function(message, args) {
      return message.channel.send(`This is a test ${args}`);
    }
};