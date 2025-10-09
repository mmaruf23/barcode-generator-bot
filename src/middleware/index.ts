import type { MiddlewareHandler } from 'hono';

import 'dotenv/config';

const secret = process.env.SECRET_TOKEN!;

export const validateTelegramRequest: MiddlewareHandler = async (c, next) => {
  const auth = c.req.header('x-telegram-bot-api-secret-token');

  if (!auth) {
    return c.json({
      auth: 'missing authorization token',
    });
  }

  if (auth !== secret) {
    return c.json({
      auth: 'invalid authorization token',
    });
  }

  await next();
};
