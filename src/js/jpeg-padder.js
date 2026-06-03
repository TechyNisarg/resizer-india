// src/js/jpeg-padder.js

const JPEG_SOI = [0xff, 0xd8];
const JPEG_EOI = [0xff, 0xd9];
const PADDING_MARKER = [0xff, 0xfe]; // COM marker
const PADDING_FILL = 0x20; // Space character

export async function padJpegToMinimum(blob, preset) {
  const minBytes = Math.ceil(preset.minKB * 1024);
  const maxBytes = Math.floor(preset.maxKB * 1024);

  if (blob.size >= minBytes || minBytes >= maxBytes) {
    return blob;
  }

  // Target just a bit over the minimum
  const targetBytes = Math.min(maxBytes, minBytes + 256);
  let extraBytes = targetBytes - blob.size;

  if (extraBytes < 4) {
    return blob;
  }

  const input = new Uint8Array(await blob.arrayBuffer());
  const eoiIndex = input[input.length - 2] === JPEG_EOI[0] && input[input.length - 1] === JPEG_EOI[1]
    ? input.length - 2
    : input.length;
  const chunks = [input.slice(0, eoiIndex)];

  while (extraBytes >= 4) {
    const segmentSize = Math.min(extraBytes, 65537);
    const payloadSize = segmentSize - 4;
    const lengthValue = payloadSize + 2;
    const segment = new Uint8Array(segmentSize);

    segment[0] = PADDING_MARKER[0];
    segment[1] = PADDING_MARKER[1];
    segment[2] = (lengthValue >> 8) & 0xff;
    segment[3] = lengthValue & 0xff;
    segment.fill(PADDING_FILL, 4);
    chunks.push(segment);
    extraBytes -= segmentSize;
  }

  chunks.push(input.slice(eoiIndex));
  return new Blob(chunks, { type: "image/jpeg" });
}
