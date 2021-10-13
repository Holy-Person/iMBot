# iMBot
[![Discord](https://img.shields.io/discord/359374635680399363?color=%235865F2&label=Discord&logo=discord&logoColor=%23FFFFFF&style=for-the-badge)](https://discord.gg/JpcBxZv6bF)
[![GitHub last commit](https://img.shields.io/github/last-commit/Holy-Person/iMBot?style=for-the-badge)](https://github.com/Holy-Person/iMBot)
[![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/Holy-Person/iMBot?style=for-the-badge)](https://github.com/Holy-Person/iMBot)
[![GitHub](https://img.shields.io/github/license/Holy-Person/iMBot?style=for-the-badge)](https://github.com/Holy-Person/iMBot)
---
This is a community bot for the iM Discord server.

## Adding Commands
<details>
<summary><strong>Slash Commands</strong></summary>

To add a new command, add a new .js file in the `slashCommands` folder, please use the template below.

```js
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('COMMAND_NAME')
		.setDescription('COMMAND_DESCRIPTION'),
	async execute(interaction) {
		//Command function here, example with pong below.
		return interaction.reply('Pong!');
	},
};
```

</details>

<details>
<summary><strong>Message Commands</strong></summary>

To add a new command, add a new .js file in the `messageCommands` folder, please use the template below.<br>
Name your file the way you want the command to be named.

```js
module.exports = {
  method: function(message, Bot, args) {
    //Command function here, example with pong below.
    return message.channel.send(`Pong!`);
  }
};
```

</details>

## License
>[Here's](https://github.com/Holy-Person/iMBot/blob/main/LICENSE) the full license.

This project is licensed under the terms of the **MIT** license.
