self.onmessage = async (e) => {
  const { imageBitmap, preset } = e.data;
  
  try {
    const canvas = new OffscreenCanvas(preset.width, preset.height);
    const ctx = canvas.getContext('2d');
    if (!ctx) throw new Error("No 2d context");
    
    // Draw white background
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, preset.width, preset.height);
    
    // Draw the cropped portion
    ctx.drawImage(
      imageBitmap,
      preset.rect.sx, preset.rect.sy, preset.rect.sw, preset.rect.sh,
      0, 0, preset.width, preset.height
    );
    
    const minBytes = (preset.minKB || 0) * 1024;
    const maxBytes = preset.maxKB * 1024;
    
    // Binary Search Algorithm for Quality
    let minQ = 0.01;
    let maxQ = 1.0;
    let quality = 0.5;
    let finalBlob: Blob | null = null;
    let closestBlob: Blob | null = null;
    
    for (let i = 0; i < 15; i++) { // Max 15 iterations
      const blob = await canvas.convertToBlob({ type: 'image/jpeg', quality });
      
      // Track the closest valid blob under max limit
      if (blob.size <= maxBytes) {
        if (!closestBlob || blob.size > closestBlob.size) {
          closestBlob = blob;
        }
      }

      if (blob.size >= minBytes && blob.size <= maxBytes) {
        // Perfect fit
        finalBlob = blob;
        break;
      } else if (blob.size < minBytes) {
        // Too small, increase quality
        minQ = quality;
        quality = (minQ + maxQ) / 2;
      } else {
        // Too big, decrease quality
        maxQ = quality;
        quality = (minQ + maxQ) / 2;
      }
    }
    
    if (finalBlob) {
      self.postMessage({ success: true, blob: finalBlob });
    } else if (closestBlob && closestBlob.size >= minBytes) {
       // We didn't hit the loop break, but the closest valid blob satisfies min requirements
       self.postMessage({ success: true, blob: closestBlob });
    } else {
      // Bottomed out - could not satisfy min/max constraints
      self.postMessage({ success: false, error: "This image has too much detail to make the file this small. Try an image with a simpler background!" });
    }
  } catch (err: any) {
    self.postMessage({ success: false, error: err.message });
  }
};
