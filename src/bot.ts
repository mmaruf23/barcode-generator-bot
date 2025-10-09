import { Telegraf } from 'telegraf';
import 'dotenv/config';
import { generateBarcode } from './utils/barcode.js';

if (!process.env.BOT_TOKEN) {
  throw new Error('ENV nya ngab belom ada ini.');
}

export const bot = new Telegraf(process.env.BOT_TOKEN!);

bot.start((ctx) => ctx.reply('Halo! Kirim teks untuk kubuat jadi barcode.'));
bot.on('text', async (ctx) => {
  // const texts = ctx.message.text.split(/, |s+|\n+/);
  // const results = texts.map((s) => generateBarcode(s));

  // const settled = await Promise.allSettled(results);

  // settled.forEach(async (s) => {
  //   if (s.status == 'fulfilled') {
  //     await ctx.replyWithPhoto({
  //       source: s.value,
  //       // filename: Date.now().toString() + '.png',
  //     });
  //   } else {
  //     console.error(s.reason);
  //   }
  // });

  ctx.reply('sorry');
});
