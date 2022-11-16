export default (class {
  constructor(client) {
    this.client = client;
  }
  async run(interaction) {
    if (!interaction || !this.client.readyToExecute) return;

    const { commandName } = interaction;

    const context = {};

    context.config = this.client.config;
    context.interaction = interaction;

    const command = this.client.handler.commands.get(commandName);

    if (!interaction.isSelectMenu() && !command) return;

    if (interaction.isChatInputCommand()) {
      if (command.configuration.ownerOnly && !process.env.OWNERS.split(',').includes(interaction.author.id)) {
        return interaction.reply('You are not allowed to use this command.');
      }

      if (command.configuration.isDeferred && !interaction.replied) {
        await interaction.deferReply({
          ephemeral: command.configuration.isEphemeral ? true : false,
        });
      }

      this.client.logger.interaction(command, 'has been ran.');

      try {
        await command.run(interaction, context);
      } catch (error) {
        this.client.logger.errorInteraction(command, error);
        return interaction.reply({
          content: 'Something went wrong D:',
          ephemeral: true,
        });
      }
    }
  }
});
