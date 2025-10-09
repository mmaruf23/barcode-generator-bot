import { Hono } from 'hono';
import { bot } from './bot.js';
import { setWebhook, deleteWebhook } from './services/webhook.js';
import { validateTelegramRequest } from './middleware/index.js';
import { config } from './config.js';

const app = new Hono();
const { NODE_ENV } = config();

if (NODE_ENV == 'development') {
  console.log('Running in development mode (polling)');
  bot.launch();
} else {
  app.get('/', async (c) => {
    return c.text('bot is running');
  });
  app.get('/set', async (c) => {
    await setWebhook();
    return c.text('webhook was set');
  });
  app.get('/unset', async (c) => {
    await deleteWebhook();
    return c.text('webhook was deletd');
  });

  app.post('/webhook', validateTelegramRequest, async (c) => {
    console.log('request dari telegram masuk');
    const req = await c.req.json();
    console.log('coba akses body', req);
    await bot.handleUpdate(req);
    console.log('balikkan status 200');
    return c.text('OK', 200);
  });
}

export default app;
