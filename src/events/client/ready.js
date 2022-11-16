export default (class {
  constructor(client) {
    this.client = client;
    this.once = true;
  }
  async run() {
    await this.client.handler.synchronizeInteractions();
    await this.client.database.users.sync();

    this.client.readyToExecute = true;

    this.client.logger.ready(`${this.client.user.tag}, ready to serve ${this.client.guilds.cache.size} servers.`);
  }
});
