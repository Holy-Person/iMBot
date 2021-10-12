# iMBot
[![Discord Shield](https://img.shields.io/discord/762333294201143307?color=7289da&label=Discord&logo=discord&logoColor=white&style=flat-square)](https://discord.gg/invites/JpcBxZv6bF)
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