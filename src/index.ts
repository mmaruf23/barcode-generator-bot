import { Hono } from 'hono';
import { bot } from './bot.js';
import { setWebhook } from './services/webhook.js';

const app = new Hono();

if (process.env.NODE_ENV == 'development') {
  console.log('Running in development mode (polling)');
  bot.launch();
} else {
  app.get('/', (c) => {
    return c.text('bot is runnin');
  });

  app.post('/webhook', async (c) => {
    const req = await c.req.json();
    await bot.handleUpdate(req);
    return c.status(200);
  });

  // set webhook
  setWebhook();
}

export default app;
