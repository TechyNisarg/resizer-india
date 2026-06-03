// src/js/image-processor.js

export function getCropRect(image, preset, zoom, panX, panY) {
  const imageRatio = image.naturalWidth / image.naturalHeight;
  const targetRatio = preset.width / preset.height;
  let baseWidth = image.naturalWidth;
  let baseHeight = image.naturalHeight;

  if (imageRatio > targetRatio) {
    baseWidth = image.naturalHeight * targetRatio;
  } else {
    baseHeight = image.naturalWidth / targetRatio;
  }

  const cropWidth = baseWidth / zoom;
  const cropHeight = baseHeight / zoom;
  const maxX = image.naturalWidth - cropWidth;
  const maxY = image.naturalHeight - cropHeight;
  
  // panX and panY are expected to be between -1 and 1
  return {
    sx: Math.max(0, Math.min(maxX, (maxX / 2) + (panX * maxX / 2))),
    sy: Math.max(0, Math.min(maxY, (maxY / 2) + (panY * maxY / 2))),
    sw: cropWidth,
    sh: cropHeight
  };
}

let renderRequestId = null;

export function renderPreview(canvas, sourceImage, preset, zoom, panX, panY) {
  if (!sourceImage || !preset || !preset.width || !preset.height) return;

  if (renderRequestId !== null) {
    cancelAnimationFrame(renderRequestId);
  }

  renderRequestId = requestAnimationFrame(() => {
    const context = canvas.getContext("2d");
    const rect = getCropRect(sourceImage, preset, zoom, panX, panY);

    context.clearRect(0, 0, preset.width, preset.height);
    context.fillStyle = "#ffffff";
    context.fillRect(0, 0, preset.width, preset.height);
    context.imageSmoothingEnabled = true;
    context.imageSmoothingQuality = "high";
    context.drawImage(
      sourceImage,
      rect.sx,
      rect.sy,
      rect.sw,
      rect.sh,
      0,
      0,
      preset.width,
      preset.height
    );
    
    renderRequestId = null;
  });
}

export async function rotateImage90(sourceImage) {
  if (!sourceImage) return null;

  const width = sourceImage.naturalWidth;
  const height = sourceImage.naturalHeight;
  const canvas = document.createElement("canvas");
  canvas.width = height;
  canvas.height = width;

  const context = canvas.getContext("2d");
  context.fillStyle = "#ffffff";
  context.fillRect(0, 0, canvas.width, canvas.height);
  context.imageSmoothingEnabled = true;
  context.imageSmoothingQuality = "high";
  context.translate(canvas.width / 2, canvas.height / 2);
  context.rotate(Math.PI / 2);
  context.drawImage(sourceImage, -width / 2, -height / 2);

  return new Promise((resolve, reject) => {
    canvas.toBlob(async (blob) => {
      if (blob) {
        const url = URL.createObjectURL(blob);
        const img = new Image();
        img.onload = () => resolve({ image: img, blob, url });
        img.onerror = () => reject(new Error("Could not load rotated image."));
        img.src = url;
      } else {
        reject(new Error("Could not create rotated image blob."));
      }
    }, "image/jpeg", 0.92);
  });
}
