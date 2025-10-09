import { createCanvas, registerFont } from 'canvas';
import JsBarcode from 'jsbarcode';
import path from 'node:path';

const fontpath = path.join(
  process.cwd(),
  'assets',
  'fonts',
  'RobotoMono-Regular.ttf'
);

const customFontFamilyName = 'MyRoboto';

try {
  registerFont(fontpath, {
    family: customFontFamilyName,
  });
} catch (error) {
  console.warn('failed register font ', error);
}
export async function generateBarcodes(text: string) {
  const texts = text.split(/[,\s]+/).slice(0, 10);

  if (!texts.length) return [];
  console.log(texts);

  const barcodes = texts.map((t) => {
    const canvas = createCanvas(400, 150);
    JsBarcode(canvas, t, {
      format: 'CODE128',
      text: t,
      font: customFontFamilyName,
    });
    const buffer = canvas.toBuffer('image/png');
    return buffer;
  });

  return barcodes;
}
