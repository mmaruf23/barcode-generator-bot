import 'dotenv/config';

interface Config {
  BOT_TOKEN: string;
  SECRET_TOKEN: string;
  WEBHOOK_URL: string;
  MAX_GENERATE: number;
  NODE_ENV: string;
}

let cached: Config | undefined;

export const config = (): Config => {
  if (cached) return cached;

  const {
    BOT_TOKEN,
    SECRET_TOKEN,
    WEBHOOK_URL,
    MAX_GENERATE,
    NODE_ENV = 'production',
  } = process.env;

  if (!BOT_TOKEN || !SECRET_TOKEN || !WEBHOOK_URL) {
    throw new Error(
      'Missing required environment variables. Please check your .env file!'
    );
  }

  const maxGenerateNumber = MAX_GENERATE ? parseInt(MAX_GENERATE, 10) : 10;
  if (isNaN(maxGenerateNumber)) {
    throw new Error('MAX_GENERATE must be a valid number.');
  }

  const final: Config = {
    BOT_TOKEN,
    SECRET_TOKEN,
    WEBHOOK_URL,
    MAX_GENERATE: maxGenerateNumber,
    NODE_ENV,
  };

  cached = final;

  return final;
};
