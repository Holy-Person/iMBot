import { runningInProduction } from '../../config/index.js';
export default (class {
  constructor(client) {
    this.client = client;
  }
  async run(...args) {
    if (!runningInProduction) this.client.logger.debug(...args);
  }
});
