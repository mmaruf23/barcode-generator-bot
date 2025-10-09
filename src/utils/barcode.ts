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
  return buffer;
}
