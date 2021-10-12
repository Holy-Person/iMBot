const fs = require('fs');
const { Client, Collection, Intents } = require('discord.js');
require('dotenv').config();
var messageCommands = new Array();

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

client.commands = new Collection();
const slashCommandFiles = fs.readdirSync('./slashCommands').filter(file => file.endsWith('.js'));
const messageCommandFiles = fs.readdirSync('./messageCommands').filter(file => file.endsWith('.js'));

for (const file of slashCommandFiles) {
	const command = require(`./slashCommands/${file}`);
	client.commands.set(command.data.name, command);
}

for (const file of messageCommandFiles) {
	const command = require(`./messageCommands/${file}`);
	let messageCommand = {
	 "name": file.split('.js')[0],
	 "module": command
 	};
	messageCommands.push(messageCommand);
}

client.once('ready', () => {
	console.log(`Ready and logged in as ${client.user.tag}!`);
});

client.on('interactionCreate', async interaction => {
	if(!interaction.isCommand()) return;

	const command = client.commands.get(interaction.commandName);

	if(!command) return;

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		return interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}
});

client.on('messageCreate', message => {
	if(!message.content.startsWith(process.env.BOT_PREFIX)) return;

	if(message.author.bot) return;

	const args = message.content.slice(process.env.BOT_PREFIX.length).trim().split(/ +/g);
	const command = args.shift().toLowerCase();

	const commandObject = messageCommands.find(x => x.name === command);
	
	if(typeof commandObject == 'undefined') return;

	commandObject.module.method(message, args);
});

client.login(process.env.DISCORD_TOKEN);
