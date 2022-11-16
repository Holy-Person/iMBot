import { ApplicationCommand, Collection } from 'discord.js';
import { readdirSync } from 'node:fs';
import { join, resolve } from 'node:path';

import Interaction from '../base/Interaction.js';

export default class Handler {
  constructor(client) {
    this.client = client;
    this.logger = client.logger;
    this.commands = new Collection();
  }

  async loadInteractions() {
    const directory = readdirSync(join(resolve('src/interactions')));
    this.logger.info(`Loading a total of ${directory.length} interaction categories.`);
    directory.forEach((dir) => {
      let files = readdirSync(join(resolve(`src/interactions/${dir}/`)));
      files
        .filter((file) => file.indexOf('.js') > -1)
        .forEach(async (file) => {
          const interaction = new (await import(join(resolve(`src/interactions/${dir}`, file)))).default(this.client);
          try {
            if (!(interaction instanceof Interaction)) {
              this.logger.error(`Interaction ${file} doesn't belong in the interactions directory.`);
              return false;
            }
            this.logger.info(`Loading interaction: ${interaction.help.name}`);
            await this.commands.set(interaction.help.name, interaction);
            delete require.cache[require.resolve(join(resolve(`src/interactions/${dir}`, interaction)))];
            return false;
          } catch (error) {
            return `Unable to load interaction ${file}: ${error}`;
          }
        });
    });
  }

  async loadEvents() {
    const directory = readdirSync(join(resolve('src/events')));
    this.logger.info(`Loading a total of ${directory.length} event categories.`);
    directory.forEach((dir) => {
      let files = readdirSync(join(resolve(`src/events/${dir}/`)));
      files
        .filter((file) => file.indexOf('.js') > -1)
        .forEach(async (file) => {
          const event = new (await import(join(resolve(`src/events/${dir}`, file)))).default(this.client);
          try {
            const name = file.split('.')[0];
            this.logger.info(`Loading event: ${name}`);
            if (event.once) {
              this.client.once(name, (...args) => event.run(...args));
            } else {
              this.client.on(name, (...args) => event.run(...args));
            }
            delete require.cache[require.resolve(join(resolve(`src/events/${dir}`, event)))];
            return false;
          } catch (error) {
            return `Unable to load event ${file}: ${error}`;
          }
        });
    });
  }

  async synchronizeInteractions() {
    const ready = this.client.readyAt
      ? Promise.resolve()
      : new Promise((resolve) => this.client.once('ready', resolve));
    await ready;
    const currentInteractions = await this.client.application.commands.fetch();
    this.logger.info('Synchronizing interactions.');
    const interactions = this.commands
      .filter((interaction) => interaction.configuration.enabled)
      .map((interaction) => {
        const { name, description, options } = interaction.help;
        const { defaultMemberPermissions } = interaction.configuration;
        return {
          name,
          description,
          options,
          defaultMemberPermissions,
          dmPermission: false,
        };
      });
    const newInteractions = interactions.filter(
      (interaction) => !currentInteractions.some((i) => i.name === interaction.name)
    );
    for (let newInteraction of newInteractions) {
      await this.client.application.commands.create(newInteraction);
    }
    if (newInteractions.length > 0) this.logger.info(`Created ${newInteractions.length} interaction(s).`);
    const deletedInteractions = currentInteractions
      .filter((interaction) => !interactions.some((i) => i.name === interaction.name))
      .toJSON();
    for (let deletedInteraction of deletedInteractions) {
      await deletedInteraction.delete();
    }
    if (deletedInteractions.length > 0) this.logger.info(`Deleted ${deletedInteractions.length} interaction(s).`);
    const updatedInteractions = interactions.filter((interaction) =>
      currentInteractions.some((i) => i.name === interaction.name)
    );
    let updatedInteractionsCount = 0;
    for (let updatedInteraction of updatedInteractions) {
      const newInteraction = updatedInteraction;
      const previousInteraction = currentInteractions.find((i) => i.name === updatedInteraction.name);
      let modified = false;
      if (previousInteraction.description !== newInteraction.description) modified = true;
      if (!ApplicationCommand.optionsEqual(previousInteraction.options, newInteraction.options)) modified = true;
      if (previousInteraction.defaultMemberPermissions !== newInteraction.defaultMemberPermissions) modified = true;
      if (previousInteraction.dmPermission !== newInteraction.dmPermission) modified = true;
      if (modified) {
        await previousInteraction.edit(newInteraction);
        updatedInteractionsCount++;
      }
    }
    if (updatedInteractionsCount > 0) this.logger.info(`Updated ${updatedInteractionsCount} interaction(s).`);
    this.logger.ready('Interactions synchronized.');
    return false;
  }
}
