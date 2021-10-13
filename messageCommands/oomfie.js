module.exports = {
	method: function (message, _Bot) {
		// const variants = ['oomfie', 'coomfie', 'comfie'];
		// better than trying a bunch of variants like above
		if (message.content.includes('mfie')) {
			// 1 in 20 chance of replying with "coomfie" instead
			const reply = (Math.floor(Math.random() * 20) > 0) ? 'oomfie' : 'coomfie';
			return message.channel.send(`so true ${reply}`);
		}

		return;
	}
};