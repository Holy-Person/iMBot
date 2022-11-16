export default (class {
  constructor(client) {
    this.client = client;
  }
  async run() {
    this.client.logger.warn('Reconnecting', 'The client is reconnecting...');
  }
});
