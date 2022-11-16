export default (class {
  constructor(client) {
    this.client = client;
  }
  async run() {
    this.client.logger.warn('Disconnecting', 'The client is disconnecting...');
  }
});
