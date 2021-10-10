# iMBot
Community Bot

## Adding commands
To add commands, in the `commands` folder make a new .js file named like your command and paste this template
```js
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('NAME-OF-COMMAND-HERE')
		.setDescription('DESCRIPTION'),
	async execute(interaction) {
		// Here is the actual code for the command
	},
};
```

## Testing commands on a private server
[Make a new bot here](https://discord.com/developers/applications), copy the `sampledotenv` file, rename to `.env` and change the lines accoringly.  
After adding the command, run `node deploy-commands.js` to register your commands.