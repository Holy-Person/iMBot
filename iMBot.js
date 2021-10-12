const fs = require('fs');
const { Client, Collection, Intents } = require('discord.js');
require('dotenv').config();

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

client.commands = new Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.data.name, command);
}

client.once('ready', () => {
	console.log(`Ready and logged in as ${client.user.id}!`);
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
	if(message.author.bot) return;

	if(!message.content.startsWith(process.env.BOT_PREFIX)) return;

	const args = message.content.slice(process.env.BOT_PREFIX).trim().split(/ +/g);
	const command = args.shift().toLowerCase();

  if(command === 'ping') {
    message.channel.send('pong');
  }
});

client.login(process.env.DISCORD_TOKEN);
