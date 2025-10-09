import { describe, it } from 'node:test';
import { equal, ok } from 'node:assert';
import { generateBarcodes } from './barcode.js';
import { config } from '../config.js';

const { MAX_GENERATE } = config();

describe('barcode service test', () => {
  it('should return correct length', async () => {
    const text =
      'satu dua, tiga \n empat lima, enam, tujuh, delapam,   sembilan sepuluh sebelas duabelas';
    const texts = await generateBarcodes(text);

    ok(texts.length);
    equal(texts.length, MAX_GENERATE);
  });
});
