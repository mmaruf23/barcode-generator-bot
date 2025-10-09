import { describe, it } from 'node:test';
import { equal, ok } from 'node:assert';
import { generateBarcodes } from './barcode.js';
import { config } from '../config.js';
import { existsSync, mkdirSync, writeFileSync } from 'node:fs';
import path from 'node:path';

import { fileURLToPath } from 'url';
import { dirname } from 'path';

// Dapatkan jalur direktori yang setara dengan __dirname
const { MAX_GENERATE } = config();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

describe('barcode service test', () => {
  it('should return correct length', async () => {
    const text =
      'satu dua, tiga \n empat lima, enam, tujuh, delapam,   sembilan sepuluh sebelas duabelas';
    const texts = await generateBarcodes(text);
    ok(texts.length);
    equal(texts.length, MAX_GENERATE);
  });

  it('should generate barcode correctly (manualy test)', async () => {
    const barcodes = await generateBarcodes('huawei');
    const outDir = path.join(__dirname, 'barcode');
    if (!existsSync(outDir)) {
      mkdirSync(outDir); // Buat folder jika belum ada
    }

    barcodes.forEach((b, i) => {
      const name = `barcode-${i + 1}.png`;
      const filepath = path.join(outDir, name);

      writeFileSync(filepath, b);
    });

    console.log('done');

    ok(true);
  });
});
