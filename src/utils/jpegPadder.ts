export const JPEG_SOI = [0xFF, 0xD8];
export const APP0_MARKER = [0xFF, 0xE0];
export const APP1_MARKER = [0xFF, 0xE1];
export const COM_MARKER = [0xFF, 0xFE];
export const PADDING_MARKER = [0xFF, 0xEA];

export async function setJpegDpi(blob: Blob, dpi: number): Promise<Blob> {
  const buffer = await blob.arrayBuffer();
  const data = new Uint8Array(buffer);
  
  if (data.length < 18 || data[0] !== JPEG_SOI[0] || data[1] !== JPEG_SOI[1]) {
    return blob; // Not a valid JPEG
  }

  // Look for APP0 JFIF
  let offset = 2;
  while (offset < data.length - 4) {
    if (data[offset] === 0xFF) {
      if (data[offset + 1] === 0xE0) {
        // Found APP0, check if it's JFIF
        if (data[offset + 4] === 0x4A && data[offset + 5] === 0x46 && data[offset + 6] === 0x49 && data[offset + 7] === 0x46) {
          // It's JFIF!
          // Offset 11 is Units. Set to 1 (pixels per inch)
          data[offset + 11] = 1;
          // Offset 12,13 is X density
          data[offset + 12] = (dpi >> 8) & 0xFF;
          data[offset + 13] = dpi & 0xFF;
          // Offset 14,15 is Y density
          data[offset + 14] = (dpi >> 8) & 0xFF;
          data[offset + 15] = dpi & 0xFF;
          break;
        }
      }
      
      // Move to next segment
      const segmentLength = (data[offset + 2] << 8) | data[offset + 3];
      offset += 2 + segmentLength;
    } else {
      break;
    }
  }

  return new Blob([data], { type: 'image/jpeg' });
}

export async function padJpegToMinimum(blob: Blob, minKB: number): Promise<Blob> {
  const minBytes = minKB * 1024;
  if (blob.size >= minBytes) return blob;
  const buffer = await blob.arrayBuffer();
  const data = new Uint8Array(buffer);
  
  if (data.length < 2 || data[0] !== JPEG_SOI[0] || data[1] !== JPEG_SOI[1]) {
    return blob; 
  }
  
  const bytesNeeded = minBytes - blob.size;
  const numPaddingSegments = Math.ceil(bytesNeeded / 65533);
  let insertIndex = 2;
  
  if (data.length >= 4) {
    if ((data[2] === APP0_MARKER[0] && data[3] === APP0_MARKER[1]) ||
        (data[2] === APP1_MARKER[0] && data[3] === APP1_MARKER[1]) ||
        (data[2] === COM_MARKER[0] && data[3] === COM_MARKER[1])) {
        const segLen = (data[4] << 8) | data[5];
        insertIndex = 4 + segLen;
    }
  }
  
  const totalNewSize = blob.size + bytesNeeded;
  const newData = new Uint8Array(totalNewSize);
  newData.set(data.subarray(0, insertIndex), 0);
  
  let currentOffset = insertIndex;
  let remainingBytes = bytesNeeded;
  
  for (let i = 0; i < numPaddingSegments; i++) {
    const segmentSize = Math.min(remainingBytes, 65533);
    const segmentData = new Uint8Array(segmentSize + 4);
    segmentData[0] = PADDING_MARKER[0];
    segmentData[1] = PADDING_MARKER[1];
    segmentData[2] = ((segmentSize + 2) >> 8) & 0xFF;
    segmentData[3] = (segmentSize + 2) & 0xFF;
    
    newData.set(segmentData, currentOffset);
    currentOffset += segmentData.length;
    remainingBytes -= segmentSize;
  }
  
  newData.set(data.subarray(insertIndex), currentOffset);
  return new Blob([newData], { type: 'image/jpeg' });
}
