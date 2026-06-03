// src/js/main.js

import { elements, showToast, hideDownloadLink, showDownloadLink, showResult } from './ui.js';
import { renderPreview, rotateImage90 } from './image-processor.js';
import { padJpegToMinimum } from './jpeg-padder.js';

const presets = {
  photo: {
    width: 420,
    height: 525,
    minKB: 10,
    maxKB: 20,
    filename: "resized-rto-photo",
    buttonText: "Resize RTO Photo",
    instructions: `
      <h2>RTO Photo Requirements</h2>
      <ul>
        <li>Output size: 420 x 525 px</li>
        <li>Final file size: 10KB to 20KB</li>
        <li>JPG/JPEG output format</li>
        <li>Use a light or white background</li>
      </ul>
    `
  },
  signature: {
    width: 256,
    height: 64,
    minKB: 10,
    maxKB: 20,
    filename: "resized-rto-signature",
    buttonText: "Resize RTO Signature",
    instructions: `
      <h2>RTO Signature Requirements</h2>
      <ul>
        <li>Output size: 256 x 64 px</li>
        <li>Final file size: 10KB to 20KB</li>
        <li>JPG/JPEG output format</li>
        <li>Use black or blue ink on plain white paper</li>
      </ul>
    `
  },
  custom: {
    width: 420,
    height: 525,
    minKB: 1,
    maxKB: 20,
    filename: "custom-resized-image",
    buttonText: "Resize Custom Image",
    instructions: `
      <h2>Custom Resize</h2>
      <ul>
        <li>Set exact width and height in pixels</li>
        <li>Set the target maximum file size in KB</li>
        <li>Download a compressed JPG output</li>
        <li>Useful for forms, job portals and online uploads</li>
      </ul>
    `
  }
};

const requestedPreset = new URLSearchParams(window.location.search).get("preset");
let currentPreset = presets[requestedPreset] ? requestedPreset : (document.body.dataset.defaultPreset || "photo");
let sourceImage = null;
let sourceFileSizeKB = 0;
let sourceObjectURL = "";
let downloadObjectURL = "";
let isProcessing = false;

function syncPresetToUrl() {
  const url = new URL(window.location.href);
  url.searchParams.set("preset", currentPreset);
  history.replaceState(null, "", url);
}

function getActivePreset() {
  const preset = presets[currentPreset];
  if (currentPreset !== "custom") return preset;

  return {
    ...preset,
    width: Number.parseInt(elements.customWidth.value, 10),
    height: Number.parseInt(elements.customHeight.value, 10),
    maxKB: Number.parseInt(elements.customKB.value, 10)
  };
}

function isValidPreset(preset) {
  return Number.isFinite(preset.width) &&
    Number.isFinite(preset.height) &&
    Number.isFinite(preset.maxKB) &&
    preset.width > 0 &&
    preset.height > 0 &&
    preset.maxKB > 0;
}

function updatePresetUI() {
  const preset = getActivePreset();

  elements.presetOptions.forEach((option) => {
    const isActive = option.dataset.preset === currentPreset;
    option.classList.toggle("active", isActive);
    option.setAttribute("aria-selected", String(isActive));
  });

  elements.customControls.classList.toggle("visible", currentPreset === "custom");
  elements.instructionBox.innerHTML = presets[currentPreset].instructions;
  elements.processButtonText.textContent = presets[currentPreset].buttonText;

  if (isValidPreset(preset)) {
    elements.previewCanvas.width = preset.width;
    elements.previewCanvas.height = preset.height;
    elements.previewCanvas.style.aspectRatio = `${preset.width} / ${preset.height}`;
    triggerRender();
  }
}

function triggerRender() {
  if (!sourceImage) return;
  const zoom = Number.parseFloat(elements.zoomRange.value);
  const panX = Number.parseFloat(elements.panXRange.value) / 100;
  const panY = Number.parseFloat(elements.panYRange.value) / 100;
  
  elements.zoomOut.textContent = zoom.toFixed(2);
  elements.panXOut.textContent = elements.panXRange.value;
  elements.panYOut.textContent = elements.panYRange.value;

  renderPreview(elements.previewCanvas, sourceImage, getActivePreset(), zoom, panX, panY);
}

function resetAdjustments() {
  elements.zoomRange.value = "1";
  elements.panXRange.value = "0";
  elements.panYRange.value = "0";
  triggerRender();
}

function revokeObjectURL(url) {
  if (url) URL.revokeObjectURL(url);
}

function loadImage(file) {
  if (!file) return;

  if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
    showToast("Please upload a JPG, PNG or WebP image.");
    return;
  }

  revokeObjectURL(sourceObjectURL);
  sourceObjectURL = URL.createObjectURL(file);
  sourceFileSizeKB = file.size / 1024;

  const image = new Image();
  image.onload = () => {
    sourceImage = image;
    elements.previewContainer.hidden = false;
    elements.processButton.disabled = false;
    elements.clearButton.disabled = false;
    elements.rotateButton.disabled = false;
    hideDownloadLink();
    elements.resultCard.style.display = "none";
    resetAdjustments();
    updatePresetUI();
  };
  image.onerror = () => {
    showToast("Could not read this image. Please try another file.");
    revokeObjectURL(sourceObjectURL);
    sourceObjectURL = "";
  };
  image.src = sourceObjectURL;
}

function clearImage() {
  sourceImage = null;
  elements.imageInput.value = "";
  elements.previewContainer.hidden = true;
  elements.processButton.disabled = true;
  elements.clearButton.disabled = true;
  elements.rotateButton.disabled = true;
  hideDownloadLink();
  elements.resultCard.style.display = "none";
  elements.resultCard.innerHTML = "";
  revokeObjectURL(sourceObjectURL);
  revokeObjectURL(downloadObjectURL);
  sourceObjectURL = "";
  downloadObjectURL = "";
}

// Bind Events
elements.presetOptions.forEach((option) => {
  option.addEventListener("click", () => {
    currentPreset = option.dataset.preset;
    updatePresetUI();
    syncPresetToUrl();
  });
});

elements.resetCustomButton.addEventListener("click", () => {
  elements.customWidth.value = "420";
  elements.customHeight.value = "525";
  elements.customKB.value = "20";
  updatePresetUI();
});

[elements.customWidth, elements.customHeight, elements.customKB].forEach((input) => {
  input.addEventListener("input", updatePresetUI);
});

[elements.zoomRange, elements.panXRange, elements.panYRange].forEach((input) => {
  input.addEventListener("input", triggerRender);
});

elements.resetSliders.forEach(btn => {
  btn.addEventListener("click", (e) => {
    const targetId = e.currentTarget.dataset.target;
    const defaultVal = e.currentTarget.dataset.default;
    document.getElementById(targetId).value = defaultVal;
    triggerRender();
  });
});

elements.imageInput.addEventListener("change", (event) => {
  loadImage(event.target.files[0]);
});

["dragenter", "dragover", "dragleave", "drop"].forEach((eventName) => {
  elements.dropArea.addEventListener(eventName, (event) => {
    event.preventDefault();
    event.stopPropagation();
  });
});

["dragenter", "dragover"].forEach((eventName) => {
  elements.dropArea.addEventListener(eventName, () => {
    elements.dropArea.classList.add("dragover");
  });
});

["dragleave", "drop"].forEach((eventName) => {
  elements.dropArea.addEventListener(eventName, () => {
    elements.dropArea.classList.remove("dragover");
  });
});

elements.dropArea.addEventListener("drop", (event) => {
  loadImage(event.dataTransfer.files[0]);
});

elements.clearButton.addEventListener("click", clearImage);

elements.rotateButton.addEventListener("click", async () => {
  if (!sourceImage || isProcessing) return;
  isProcessing = true;
  elements.rotateButton.disabled = true;
  
  try {
    const result = await rotateImage90(sourceImage);
    sourceFileSizeKB = result.blob.size / 1024;
    revokeObjectURL(sourceObjectURL);
    sourceObjectURL = result.url;
    sourceImage = result.image;
    hideDownloadLink();
    elements.resultCard.style.display = "none";
    resetAdjustments();
    triggerRender();
    showToast("Image rotated.");
  } catch (err) {
    showToast("Could not rotate this image.");
  } finally {
    isProcessing = false;
    elements.rotateButton.disabled = false;
  }
});

// Process image using Web Worker
elements.processButton.addEventListener("click", async () => {
  if (!sourceImage || isProcessing) return;
  const preset = getActivePreset();
  if (!isValidPreset(preset)) {
    showToast("Please enter valid width, height and KB values.");
    return;
  }

  isProcessing = true;
  elements.processButton.disabled = true;
  elements.processButton.setAttribute("aria-busy", "true");
  elements.processButtonText.textContent = "Processing...";

  // Prepare data for worker
  const zoom = Number.parseFloat(elements.zoomRange.value);
  const panX = Number.parseFloat(elements.panXRange.value) / 100;
  const panY = Number.parseFloat(elements.panYRange.value) / 100;
  
  // Calculate crop rect before sending
  const imageRatio = sourceImage.naturalWidth / sourceImage.naturalHeight;
  const targetRatio = preset.width / preset.height;
  let baseWidth = sourceImage.naturalWidth;
  let baseHeight = sourceImage.naturalHeight;

  if (imageRatio > targetRatio) baseWidth = sourceImage.naturalHeight * targetRatio;
  else baseHeight = sourceImage.naturalWidth / targetRatio;

  const cropWidth = baseWidth / zoom;
  const cropHeight = baseHeight / zoom;
  const maxX = sourceImage.naturalWidth - cropWidth;
  const maxY = sourceImage.naturalHeight - cropHeight;
  
  const rect = {
    sx: Math.max(0, Math.min(maxX, (maxX / 2) + (panX * maxX / 2))),
    sy: Math.max(0, Math.min(maxY, (maxY / 2) + (panY * maxY / 2))),
    sw: cropWidth,
    sh: cropHeight
  };

  const presetForWorker = { ...preset, rect };

  // Generate ImageBitmap for the worker
  const bitmap = await createImageBitmap(sourceImage);

  const worker = new Worker('/js/worker.js');
  
  worker.onmessage = async (e) => {
    worker.terminate();
    let finalBlob = e.data.blob;
    
    if (!e.data.success || !finalBlob) {
      elements.processButton.disabled = false;
      elements.processButton.removeAttribute("aria-busy");
      elements.processButtonText.textContent = presets[currentPreset].buttonText;
      isProcessing = false;
      showToast("Could not compress below the target size.");
      return;
    }

    finalBlob = await padJpegToMinimum(finalBlob, preset);

    revokeObjectURL(downloadObjectURL);
    downloadObjectURL = URL.createObjectURL(finalBlob);
    const finalSizeKB = finalBlob.size / 1024;

    showDownloadLink(
      downloadObjectURL,
      `${preset.filename}-${finalSizeKB.toFixed(2)}KB.jpg`
    );
    showResult(sourceFileSizeKB, finalSizeKB, preset);
    elements.downloadLink.scrollIntoView({ behavior: "smooth", block: "nearest" });

    elements.processButton.disabled = false;
    elements.processButton.removeAttribute("aria-busy");
    elements.processButtonText.textContent = presets[currentPreset].buttonText;
    isProcessing = false;
  };

  worker.onerror = () => {
    worker.terminate();
    showToast("Error processing image.");
    elements.processButton.disabled = false;
    elements.processButton.removeAttribute("aria-busy");
    elements.processButtonText.textContent = presets[currentPreset].buttonText;
    isProcessing = false;
  };

  worker.postMessage({ imageBitmap: bitmap, preset: presetForWorker }, [bitmap]);
});

// Init
updatePresetUI();
