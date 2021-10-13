module.exports = {
	method: function (message, Bot, args) {
		let reply;

		if (args.length < 2) {
			return message.channel.send('Usage is: `iM!kromer [add/remove] [user ping] [amount of kromer]`');
		}

		const user = args[1].split('@!')[1].split('>')[0]; // gets user ID from ping
		// we save the ID instead of user for the database

		if (args[0] === 'add') {
			reply = `Added ${args[2]} kromer to ${Bot.users.cache.get(user)}`;
		}
		else if (args[0] === 'remove') {
			reply = `Removed ${args[2]} kromer from ${Bot.users.cache.get(user)}`;
		}
		else {
			return message.channel.send('invalid command');
			// here we return directly to stop
			// execution if the command is bad
		}

		return message.channel.send(reply);
	}
};