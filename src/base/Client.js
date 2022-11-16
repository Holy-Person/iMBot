import { Client as DiscordClient } from 'discord.js';
import Handler from '../helpers/Handler.js';
import config from '../config/index.js';
import logger from '../helpers/Logger.js';
import Database from '../providers/sqlite/Database.js';

class Client extends DiscordClient {
  constructor(options) {
    super(options);

    this.token = config.discordToken;

    this.logger = logger;

    this.readyToExecute = false;

    this.config = config;

    this.handler = new Handler(this);

    this.database = new Database(this);

    this.wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  }

  async start() {
    await this.handler.loadEvents();
    await this.handler.loadInteractions();

    try {
      await super.login(this.token);
    } catch (error) {
      this.logger.error(error);
      process.exit(1);
    }
  }
}
export default Client;
