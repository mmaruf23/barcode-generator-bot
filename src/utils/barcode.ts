import JsBarcode from 'jsbarcode';
import { createCanvas } from 'canvas';
import fs from 'fs';
import path from 'path';

/**
 *
 * @param text string to barcode
 * @returns
 */
export async function generateBarcode(text: string) {
  const canvas = createCanvas(400, 150);
  JsBarcode(canvas, text, { format: 'CODE128' });
  const buffer = canvas.toBuffer('image/png');
  const filePath = path.resolve(`barcode-${Date.now()}.png`);
  fs.writeFileSync(filePath, buffer);
  return filePath;
}
