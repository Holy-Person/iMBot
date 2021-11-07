const fs = require("fs");
const { Client, Collection, Intents } = require("discord.js");
const _commonFunctions = require('./commonFunctions.js');
const Config = require('./config.json'); //Details on config structure in README.md.

let messageCommands = {}; //Object of message-based commands.

const Bot = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});

Bot.commands = new Collection();
const slashCommandFiles = fs
  .readdirSync("./slashCommands")
  .filter((file) => file.endsWith(".js"));
const messageCommandFiles = fs
  .readdirSync("./messageCommands")
  .filter((file) => file.endsWith(".js"));

//Generate all slash commands and put them in a Discord Collection.
for (const file of slashCommandFiles) {
  const command = require(`./slashCommands/${file}`);
  Bot.commands.set(command.data.name, command);
}

//Generate all message-based commands and push them into the messageCommands object.
for (const file of messageCommandFiles) {
  const command = require(`./messageCommands/${file}`);
  const name = file.slice(0, -3);
  messageCommands[name] = command;
}

//Notify console once the bot is ready.
Bot.once("ready", () => {
  console.log(
    `Ready and logged in as ${Bot.user.tag}!\nThe current prefix is [${Config.prefix}].`
  );
  Bot.user.setActivity("for the next [[BIG SHOT!!!]]", { type: "WATCHING" });
});

//Process slash commands.
Bot.on("interactionCreate", async (interaction) => {
  if (!interaction.isCommand()) return;

  const command = Bot.commands.get(interaction.commandName);

  if (!command) return;

  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(error);
    return interaction.reply({
      content: "There was an error while executing this command!",
      ephemeral: true,
    });
  }
});

//Process message-based commands.
Bot.on("messageCreate", (message) => {
  if (message.author.bot) return; //Ignore messages with bot authors.

  const oomfie = messageCommands["oomfie"];
  if (typeof oomfie != "undefined") oomfie.method(message, Bot); //Checks if message has 'oomfie'.

  if (!message.content.startsWith(Config.prefix)) return; //Ignore messages that don't start with the prefix.

  //Make string lowercase and split up all args into an array.
  const args = message.content
    .toLowerCase()
    .slice(Config.prefix.length)
    .trim()
    .split(/ +/g);
  const commandName = args.shift();

  const command = messageCommands[commandName];
  if (typeof command != "undefined")
    //Check if the command exists.
    command.method(message, Bot, args); //pass message, botClient and all arguements to the command.
});

Bot.login(Config.token); //Discord login for bot.