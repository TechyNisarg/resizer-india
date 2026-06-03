// src/js/worker.js

self.onmessage = async function(e) {
  const { imageBitmap, preset } = e.data;
  
  const canvas = new OffscreenCanvas(preset.width, preset.height);
  const context = canvas.getContext("2d");

  context.fillStyle = "#ffffff";
  context.fillRect(0, 0, preset.width, preset.height);
  context.imageSmoothingEnabled = true;
  context.imageSmoothingQuality = "high";
  
  context.drawImage(
    imageBitmap,
    preset.rect.sx,
    preset.rect.sy,
    preset.rect.sw,
    preset.rect.sh,
    0,
    0,
    preset.width,
    preset.height
  );

  let minQuality = 0.1;
  let maxQuality = 1.0;
  let finalBlob = null;

  for (let i = 0; i < 14; i += 1) {
    const quality = (minQuality + maxQuality) / 2;
    const blob = await canvas.convertToBlob({ type: "image/jpeg", quality });
    const sizeKB = blob.size / 1024;

    if (sizeKB > preset.maxKB) {
      maxQuality = quality;
    } else {
      finalBlob = blob;
      minQuality = quality;
    }
  }

  if (finalBlob) {
    self.postMessage({ success: true, blob: finalBlob });
  } else {
    self.postMessage({ success: false });
  }
};
