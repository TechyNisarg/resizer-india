self.onmessage = async (e) => {
  const { imageBitmap, preset } = e.data;
  
  try {
    const canvas = new OffscreenCanvas(preset.width, preset.height);
    const ctx = canvas.getContext('2d');
    if (!ctx) throw new Error("No 2d context");
    
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, preset.width, preset.height);
    
    ctx.drawImage(
      imageBitmap,
      preset.rect.sx, preset.rect.sy, preset.rect.sw, preset.rect.sh,
      0, 0, preset.width, preset.height
    );
    
    let quality = 0.95;
    let finalBlob: Blob | null = null;
    let minDiff = Infinity;
    const maxBytes = preset.maxKB * 1024;
    
    while (quality >= 0.1) {
      const blob = await canvas.convertToBlob({ type: 'image/jpeg', quality });
      if (blob.size <= maxBytes) {
        const diff = maxBytes - blob.size;
        if (diff < minDiff) {
          minDiff = diff;
          finalBlob = blob;
        }
        if (diff < 2048) break;
      }
      quality -= 0.05;
    }
    
    if (finalBlob) {
      self.postMessage({ success: true, blob: finalBlob });
    } else {
      self.postMessage({ success: false });
    }
  } catch (err) {
    self.postMessage({ success: false });
  }
};
