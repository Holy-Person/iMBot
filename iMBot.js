const fs = require('fs');
const { Client, Collection, Intents } = require('discord.js');
require('dotenv').config(); //Config contains DISCORD_TOKEN, BOT_PREFIX, GUILD_ID, CLIENT_ID and ADMIN_USERS(array).
var messageCommands = new Array(); //Array of message-based commands.

const Bot = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

Bot.commands = new Collection();
const slashCommandFiles = fs.readdirSync('./slashCommands').filter(file => file.endsWith('.js'));
const messageCommandFiles = fs.readdirSync('./messageCommands').filter(file => file.endsWith('.js'));

//Generate all slash commands and put them in a Discord Collection.
for (const file of slashCommandFiles) {
	const command = require(`./slashCommands/${file}`);
	Bot.commands.set(command.data.name, command);
}

//Generate all message-based commands and push them into the messageCommands array.
for (const file of messageCommandFiles) {
	const command = require(`./messageCommands/${file}`);
	let messageCommand = {
	 "name": file.split('.js')[0],
	 "module": command
 	};
	messageCommands.push(messageCommand);
}

//Notify console once the bot is ready.
Bot.once('ready', () => {
	console.log(`Ready and logged in as ${Bot.user.tag}!\nThe current prefix is [${process.env.BOT_PREFIX}].`);
	Bot.user.setActivity("for the next [[BIG SHOT!!!]]", { type: "WATCHING" });
});

//Process slash commands.
Bot.on('interactionCreate', async interaction => {
	if(!interaction.isCommand()) return;

	const command = Bot.commands.get(interaction.commandName);

	if(!command) return;

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		return interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}
});

//Process message-based commands.
Bot.on('messageCreate', message => {
	if(!message.content.startsWith(process.env.BOT_PREFIX)) return; //Ignore messages that don't start with the prefix.

	if(message.author.bot) return; //Ignore messages with bot authors.

	//make string lowercase and split up all args into an array
	const args = message.content.slice(process.env.BOT_PREFIX.length).trim().split(/ +/g);
	const command = args.shift().toLowerCase();

	const commandObject = messageCommands.find(x => x.name === command); //Check if the command exists.

	if(typeof commandObject == 'undefined') return; //Ignore if the command doesn't exist.

	commandObject.module.method(message, Bot, args); //pass message, botClient and all arguements to the command.
});

Bot.login(process.env.DISCORD_TOKEN); //Discord login for bot.