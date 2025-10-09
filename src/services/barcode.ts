import { createCanvas } from 'canvas';
import JsBarcode from 'jsbarcode';

export async function generateBarcodes(text: string) {
  const texts = text.split(/[,\s]+/).slice(0, 10);

  if (!texts.length) return [];
  console.log(texts);

  const barcodes = texts.map((t) => {
    const canvas = createCanvas(400, 150);
    JsBarcode(canvas, t, { format: 'CODE128', text: t });
    const buffer = canvas.toBuffer('image/png');
    return buffer;
  });

  return barcodes;
}
