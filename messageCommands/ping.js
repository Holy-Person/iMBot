module.exports = {
	method: function (message, _Bot, _args) {
		return message.channel.send(`Pong!`);
	}
};