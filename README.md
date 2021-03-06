# iMBot

[![Discord](https://img.shields.io/discord/359374635680399363?color=%235865F2&label=Discord&logo=discord&logoColor=%23FFFFFF&style=for-the-badge)](https://discord.gg/JpcBxZv6bF)
[![GitHub last commit](https://img.shields.io/github/last-commit/Holy-Person/iMBot?style=for-the-badge)](https://github.com/Holy-Person/iMBot)
[![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/Holy-Person/iMBot?style=for-the-badge)](https://github.com/Holy-Person/iMBot)
[![GitHub](https://img.shields.io/github/license/Holy-Person/iMBot?style=for-the-badge)](https://github.com/Holy-Person/iMBot)

---

This is a community bot for the iM Discord server.

## Stuff We Use

- **Node.js** v16.11.0
- **discord.js** v13.2.0
- **npm** v8.0.0
- **pm2** v5.1.2

## Setup

This bot uses a config.json file to store important information.<br>
Here is an example config you can copy.

```json
{
	"clientID": 111111111111111111,
	"guildID": 111111111111111111,
	"prefix": "!",
	"token": "T0T4LLy.A.R3al_ToK3n",
	"userID": {
		"botDevs": [
      111111111111111111,
      111111111111111111
    ],
    "discordMods": [
      111111111111111111,
      111111111111111111
    ]
	},
	"selfRoles": [
		{
			"name": "roleName1",
			"id": "111111111111111111",
			"blockedUsers": [
				"111111111111111111"
			]
		},
		{
			"name": "roleName2",
			"id": "222222222222222222",
			"blockedUsers": [
				"222222222222222222"
			]
		}
	]
}
```

## Adding Commands

<details>
<summary><strong>Slash Commands</strong></summary>

To add a new command, add a new .js file in the `slashCommands` folder, please use the template below.

```js
const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("COMMAND_NAME")
    .setDescription("COMMAND_DESCRIPTION"),
  async execute(interaction) {
    //Command function here, example with pong below.
    return interaction.reply("Pong!");
  }
};
```

</details>

<details>
<summary><strong>Message Commands</strong></summary>

To add a new command, add a new .js file in the `messageCommands` folder, please use the template below.<br>
Name your file the way you want the command to be named.

```js
const Config = require('../config.json');

module.exports = {
  description: `Sends back "Pong!".`, //Description and usage for the help command.
  usage: `\`${Config.prefix}ping\`.`,
  method: function (message, _Bot, _args) { //Variables with _ are not being used at the moment.
    //Command function here, example with pong below.
    return message.channel.send(`Pong!`);
  }
};
```

</details>

## Branches
- [main](https://github.com/Holy-Person/iMBot/tree/main)
  - The default branch.
  - Great to fork your own bot from.
  - Recommended if you want a nice template to start from.
- [canary](https://github.com/Holy-Person/iMBot/tree/canary)
  - The experimental branch.
  - This is where we test new/unfinished things before merging them into [main](https://github.com/Holy-Person/iMBot/tree/main).
  - Usually safe to fork for your own bot.
  - Recommended if you want the most up-to-date experience.
- [kromer rework](https://github.com/Holy-Person/iMBot/tree/kromer-rework)
  - Old currency test branch.
  - Will probably get removed soon.

## License

> [Here's](https://github.com/Holy-Person/iMBot/blob/main/LICENSE) the full license.

This project is licensed under the terms of the **MIT** license.