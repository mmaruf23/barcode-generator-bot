import type { Handler } from 'hono';

import 'dotenv/config';

const secret = process.env.SECRET_TOKEN!;

export const validateTelegramRequest: Handler = async (c, next) => {
  const auth = c.req.header('x-telegram-bot-api-secret-token');

  if (!auth || auth !== secret) {
    return c.text('invalid authorization token', 200);
  }

  await next();
};
