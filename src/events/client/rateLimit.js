export default (class {
  constructor(client) {
    this.client = client;
  }
  async run(...args) {
    this.client.logger.warn('The client is hit by ratelimit', ...args);
  }
});
