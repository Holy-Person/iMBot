# iMBot

[![Discord](https://img.shields.io/discord/359374635680399363?color=%235865F2&label=Discord&logo=discord&logoColor=%23FFFFFF&style=for-the-badge)](https://discord.gg/JpcBxZv6bF)
[![GitHub last commit](https://img.shields.io/github/last-commit/Holy-Person/iMBot?style=for-the-badge)](https://github.com/Holy-Person/iMBot)
[![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/Holy-Person/iMBot?style=for-the-badge)](https://github.com/Holy-Person/iMBot)
[![GitHub](https://img.shields.io/github/license/Holy-Person/iMBot?style=for-the-badge)](https://github.com/Holy-Person/iMBot)

---

This is a community bot for the iM Discord server.

## Setup

This bot uses a config.json file to store important information.<br>
Here is an example config.

```json
{
	"clientID": 111111111111111111,
	"guildID": 111111111111111111,
	"prefix": "iM!",
	"token": "T0T4LLy.A.R3al_ToK3n",
	"userID": {
		"botDevs": [
      330341087099224064,
      330341087099224063
    ],
    "discordMods": [
      330341087099224064,
      330341087099224063
    ]
	}
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
const Config = require('./config.json');

module.exports = {
  description: `Sends back "Pong!".`, //Description and usage for the help command.
  usage: `Usage \`${Config.prefix}ping\`.`,
  method: function (message, _Bot, _args) { //Variables with _ are not being used at the moment.
    //Command function here, example with pong below.
    return message.channel.send(`Pong!`);
  }
};
```

</details>

## License

> [Here's](https://github.com/Holy-Person/iMBot/blob/main/LICENSE) the full license.

This project is licensed under the terms of the **MIT** license.
