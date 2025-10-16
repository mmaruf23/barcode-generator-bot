import { Resvg } from '@resvg/resvg-js';
import JsBarcode from 'jsbarcode';
import { JSDOM } from 'jsdom';
const dom = new JSDOM();

const document = dom.window.document;
const XMLSerializer = dom.window.XMLSerializer;
export async function generateBarcodes(text: string) {
  const serializer = new XMLSerializer();

  const texts = text.split(/[,\s]+/).slice(0, 10);

  if (!texts.length) return [];
  console.log(texts);

  const stringOfBarcodes = texts.map((t) => {
    const svgNode = document.createElementNS(
      'http://www.w3.org/2000/svg',
      'svg'
    );
    JsBarcode(svgNode, t, {
      xmlDocument: document,
    });

    return serializer.serializeToString(svgNode);
  });

  const pngBuffers = await Promise.all(
    stringOfBarcodes.map(async (s) => {
      const resvg = new Resvg(s, {
        fitTo: { mode: 'width', value: 900 },
      });

      const pngData = resvg.render();
      return pngData.asPng();
    })
  );

  return pngBuffers;
}
