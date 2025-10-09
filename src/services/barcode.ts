import { createCanvas, registerFont } from 'canvas';
import JsBarcode from 'jsbarcode';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

registerFont(path.join(__dirname, '.../assets/fonts/RobotoMono-Regular.ttf'), {
  family: 'RobotoMono',
});

export async function generateBarcodes(text: string) {
  const texts = text.split(/[,\s]+/).slice(0, 10);

  if (!texts.length) return [];
  console.log(texts);

  const barcodes = texts.map((t) => {
    const canvas = createCanvas(400, 150);
    JsBarcode(canvas, t, {
      format: 'CODE128',
      text: t,
      font: 'RobotoMono',
    });
    const buffer = canvas.toBuffer('image/png');
    return buffer;
  });

  return barcodes;
}
