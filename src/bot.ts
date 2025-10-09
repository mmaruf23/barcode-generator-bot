import { Telegraf } from 'telegraf';
import { config } from './config.js';
import { generateBarcodes } from './services/barcode.js';
import type { Message } from 'telegraf/types';

export const bot = new Telegraf(config().BOT_TOKEN);

bot.start((ctx) => ctx.reply('Halo! Kirim teks untuk kubuat jadi barcode.'));
bot.on('text', async (ctx) => {
  const barcodes = await generateBarcodes(ctx.message.text);
  const replies: Promise<Message.PhotoMessage | Message.TextMessage>[] =
    barcodes.map(async (b) => {
      return ctx.replyWithPhoto({ source: b });
    });
  await Promise.allSettled(replies);
  ctx.reply('done');
});
