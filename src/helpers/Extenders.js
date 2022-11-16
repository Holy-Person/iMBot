import { default as path } from 'node:path';
import { fileURLToPath } from 'node:url';
import logger from './Logger.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

process.on('uncaughtException', (error) => {
  const message = error.stack.replace(new RegExp(`${__dirname}/`, 'g'), './');
  logger.error('Uncaught Exception:', message);
  process.exit(1);
});

process.on('unhandledRejection', (error) => {
  const message = error.stack.replace(new RegExp(`${__dirname}/`, 'g'), './');
  logger.error('Unhandled Rejection:', message);
});

process.on('SIGINT', async () => {
  logger.info('SIGINT signal received.');
  logger.info('Bot shutting down.');
  await process.exit(0);
});
