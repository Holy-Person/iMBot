import { default as config } from './config/index.js';
import iMBot from './base/Client.js';

const client = new iMBot(config.discord);

(async () => {
  await client.start();
})();
