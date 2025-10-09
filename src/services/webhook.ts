import 'dotenv/config';

const webhook_url = process.env.WEBHOOK_URL;
const token = process.env.BOT_TOKEN;
const secret = process.env.SECRET_TOKEN;

if (!webhook_url || !token || !secret) {
  throw new Error('env not set properly');
}

export const setWebhook = async () => {
  try {
    const result = await fetch(
      `https://api.telegram.org/bot${token}/setWebhook?url=${webhook_url}&secret_token=${secret}`
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
