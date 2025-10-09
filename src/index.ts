import { Hono } from 'hono';
import { bot } from './bot.js';
import { setWebhook } from './services/webhook.js';
// import { validateTelegramRequest } from './middleware/index.js';

const app = new Hono();

console.log('service berjalan!');

if (process.env.NODE_ENV == 'development') {
  console.log('Running in development mode (polling)');
  bot.launch();
} else {
  app.get('/', async (c) => {
    await setWebhook();
    return c.text('bot is runnin and webhook was set');
  });

  app.post('/webhook', async (c) => {
    console.log('request dari telegram masuk');
    const req = await c.req.json();
    console.log('coba akses body', req);
    await bot.handleUpdate(req);
    console.log('balikkan status 200');
    return c.text('OK', 200);
  });
}

export default app;
