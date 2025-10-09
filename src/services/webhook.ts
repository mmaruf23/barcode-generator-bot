import 'dotenv/config';
import { config } from '../config.js';

const { BOT_TOKEN, SECRET_TOKEN, WEBHOOK_URL } = config();

export const setWebhook = async () => {
  try {
    const result = await fetch(
      `https://api.telegram.org/bot${BOT_TOKEN}/setWebhook?url=${WEBHOOK_URL}/webhook&secret_token=${SECRET_TOKEN}`
    );
    if (!result.ok) {
      console.error('fail set webhook : ', result.body);
      return;
    }
  } catch (error) {
    console.error('fail set webhook :', error);
  }

  console.log('webhok was set');
  return;
};

export const deleteWebhook = async () => {
  try {
    const result = await fetch(
      `https://api.telegram.org/bot${BOT_TOKEN}/deleteWebhook`
    );
    if (!result.ok) {
      console.error('fail delete webhook : ', result.body);
      return;
    }
  } catch (error) {
    console.error('fail delete webhook :', error);
  }
};
