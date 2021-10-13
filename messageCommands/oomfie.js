var fs = require("fs");

module.exports = {
	method: function (message, _Bot) {
		// const variants = ['oomfie', 'coomfie', 'comfie'];
		// better than trying a bunch of variants like above
		if (message.content.includes('mfie')) {
			let reply;
			if (Math.floor(Math.random() * 50) == 0) {
				fs.readFile('oomfie.txt', function (err, data) {
					if (err) throw err;
					let lines = data.toString().split('\n');
					return message.channel.send(lines[Math.floor(Math.random() * lines.length)].toString());
				});
			} else {
				if (Math.floor(Math.random() * 20) == 0) {
					// 1 in 20 chance of replying with "coomfie" instead
					message.channel.send('so true coomfie');
				}
				message.channel.send('so true oomfie');
			}
		}
	}
};