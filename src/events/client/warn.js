export default (class {
  constructor(client) {
    this.client = client;
  }
  async run(...args) {
    this.client.logger.warn(...args);
  }
});
