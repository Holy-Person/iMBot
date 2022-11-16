export default (class {
  constructor(client) {
    this.client = client;
  }
  async run(...args) {
    this.client.logger.error('An error event was sent by Discord.js', ...args);
  }
});
