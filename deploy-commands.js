const fs = require("fs");
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");
const Config = require('./config.json'); //Details on config structure in README.md.

const commands = [];
const commandFiles = fs
  .readdirSync("./slashCommands")
  .filter((file) => file.endsWith(".js"));

for (const file of commandFiles) {
  const command = require(`./slashCommands/${file}`);
  commands.push(command.data.toJSON());
}

const rest = new REST({ version: "9" }).setToken(Config.prefix);

rest
  .put(
    Routes.applicationGuildCommands(
      Config.clientID,
      Config.guildID
    ),
    { body: commands }
  )
  .then(() => console.log("Successfully registered application commands."))
  .catch(console.error);