const toast = document.getElementById("toast");
const imageInput = document.getElementById("imageInput");
const previewContainer = document.getElementById("previewContainer");
const previewCanvas = document.getElementById("previewCanvas");
const processButton = document.getElementById("processButton");
const processButtonText = document.getElementById("processButtonText");
const clearButton = document.getElementById("clearButton");
const downloadLink = document.getElementById("downloadLink");
const resultCard = document.getElementById("resultCard");
const instructionBox = document.getElementById("instructionBox");
const dropArea = document.getElementById("dropArea");
const customControls = document.getElementById("customControls");
const customWidth = document.getElementById("customWidth");
const customHeight = document.getElementById("customHeight");
const customKB = document.getElementById("customKB");
const resetCustomButton = document.getElementById("resetCustomButton");
const presetOptions = document.querySelectorAll(".preset-option");
const zoomRange = document.getElementById("zoomRange");
const panXRange = document.getElementById("panXRange");
const panYRange = document.getElementById("panYRange");
const rotateButton = document.getElementById("rotateButton");

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
let currentPreset = presets[requestedPreset]
  ? requestedPreset
  : document.body.dataset.defaultPreset || "photo";
let sourceImage = null;
let sourceFileSizeKB = 0;
let sourceObjectURL = "";
let downloadObjectURL = "";

function hideDownloadLink() {
  downloadLink.hidden = true;
  downloadLink.setAttribute("aria-hidden", "true");
  downloadLink.removeAttribute("href");
  downloadLink.removeAttribute("download");
}

function showDownloadLink(href, filename) {
  downloadLink.href = href;
  downloadLink.download = filename;
  downloadLink.hidden = false;
  downloadLink.removeAttribute("aria-hidden");
}

function syncPresetToUrl() {
  const url = new URL(window.location.href);
  url.searchParams.set("preset", currentPreset);
  history.replaceState(null, "", url);
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toast.hideTimeout);
  toast.hideTimeout = setTimeout(() => {
    toast.classList.remove("show");
  }, 2800);
}

function getActivePreset() {
  const preset = presets[currentPreset];

  if (currentPreset !== "custom") {
    return preset;
  }

  return {
    ...preset,
    width: Number.parseInt(customWidth.value, 10),
    height: Number.parseInt(customHeight.value, 10),
    maxKB: Number.parseInt(customKB.value, 10)
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

  presetOptions.forEach((option) => {
    const isActive = option.dataset.preset === currentPreset;
    option.classList.toggle("active", isActive);
    option.setAttribute("aria-selected", String(isActive));
  });

  customControls.classList.toggle("visible", currentPreset === "custom");
  instructionBox.innerHTML = presets[currentPreset].instructions;
  processButtonText.textContent = presets[currentPreset].buttonText;

  if (isValidPreset(preset)) {
    setPreviewShape(preset);
    renderPreview();
  }
}

function setPreviewShape(preset) {
  previewCanvas.width = preset.width;
  previewCanvas.height = preset.height;
  previewCanvas.style.aspectRatio = `${preset.width} / ${preset.height}`;
}

function resetAdjustments() {
  zoomRange.value = "1";
  panXRange.value = "0";
  panYRange.value = "0";
}

function getCropRect(image, preset) {
  const imageRatio = image.naturalWidth / image.naturalHeight;
  const targetRatio = preset.width / preset.height;
  let baseWidth = image.naturalWidth;
  let baseHeight = image.naturalHeight;

  if (imageRatio > targetRatio) {
    baseWidth = image.naturalHeight * targetRatio;
  } else {
    baseHeight = image.naturalWidth / targetRatio;
  }

  const zoom = Number.parseFloat(zoomRange.value);
  const cropWidth = baseWidth / zoom;
  const cropHeight = baseHeight / zoom;
  const maxX = image.naturalWidth - cropWidth;
  const maxY = image.naturalHeight - cropHeight;
  const panX = Number.parseFloat(panXRange.value) / 100;
  const panY = Number.parseFloat(panYRange.value) / 100;

  return {
    sx: Math.max(0, Math.min(maxX, (maxX / 2) + (panX * maxX / 2))),
    sy: Math.max(0, Math.min(maxY, (maxY / 2) + (panY * maxY / 2))),
    sw: cropWidth,
    sh: cropHeight
  };
}

function renderPreview() {
  if (!sourceImage) {
    return;
  }

  const preset = getActivePreset();

  if (!isValidPreset(preset)) {
    return;
  }

  const context = previewCanvas.getContext("2d");
  const rect = getCropRect(sourceImage, preset);

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
}

function loadImage(file) {
  if (!file) {
    return;
  }

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
    previewContainer.hidden = false;
    processButton.disabled = false;
    clearButton.disabled = false;
    rotateButton.disabled = false;
    hideDownloadLink();
    resultCard.style.display = "none";
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

function rotateImage90() {
  if (!sourceImage) {
    return;
  }

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

  const rotated = new Image();
  rotated.onload = () => {
    sourceImage = rotated;
    hideDownloadLink();
    resultCard.style.display = "none";
    resetAdjustments();
    renderPreview();
    showToast("Image rotated.");
  };
  rotated.onerror = () => {
    showToast("Could not rotate this image.");
  };
  rotated.src = canvas.toDataURL("image/jpeg", 0.92);
}

function clearImage() {
  sourceImage = null;
  imageInput.value = "";
  previewContainer.hidden = true;
  processButton.disabled = true;
  clearButton.disabled = true;
  rotateButton.disabled = true;
  hideDownloadLink();
  resultCard.style.display = "none";
  resultCard.innerHTML = "";
  revokeObjectURL(sourceObjectURL);
  revokeObjectURL(downloadObjectURL);
  sourceObjectURL = "";
  downloadObjectURL = "";
}

function revokeObjectURL(url) {
  if (url) {
    URL.revokeObjectURL(url);
  }
}

function createOutputCanvas(preset) {
  const outputCanvas = document.createElement("canvas");
  outputCanvas.width = preset.width;
  outputCanvas.height = preset.height;

  const context = outputCanvas.getContext("2d");
  const rect = getCropRect(sourceImage, preset);

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

  return outputCanvas;
}

async function compressImage(canvas, preset) {
  let minQuality = 0.1;
  let maxQuality = 1;
  let finalBlob = null;

  for (let i = 0; i < 14; i += 1) {
    const quality = (minQuality + maxQuality) / 2;
    const blob = await canvasToBlob(canvas, quality);
    const sizeKB = blob.size / 1024;

    if (sizeKB > preset.maxKB) {
      maxQuality = quality;
    } else {
      finalBlob = blob;
      minQuality = quality;
    }
  }

  return finalBlob;
}

function canvasToBlob(canvas, quality) {
  return new Promise((resolve) => {
    canvas.toBlob(resolve, "image/jpeg", quality);
  });
}

async function processImage() {
  if (!sourceImage) {
    showToast("Please upload an image first.");
    return;
  }

  const preset = getActivePreset();

  if (!isValidPreset(preset)) {
    showToast("Please enter valid width, height and KB values.");
    return;
  }

  processButton.disabled = true;
  processButton.setAttribute("aria-busy", "true");
  processButtonText.textContent = "Processing...";

  const canvas = createOutputCanvas(preset);
  let finalBlob = await compressImage(canvas, preset);

  if (!finalBlob) {
    processButton.disabled = false;
    processButton.removeAttribute("aria-busy");
    processButtonText.textContent = presets[currentPreset].buttonText;
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
  showResult(finalBlob, preset);
  downloadLink.scrollIntoView({ behavior: "smooth", block: "nearest" });

  processButton.disabled = false;
  processButton.removeAttribute("aria-busy");
  processButtonText.textContent = presets[currentPreset].buttonText;
}

function showResult(blob, preset) {
  const finalSizeKB = blob.size / 1024;
  const sizeChangePercent = sourceFileSizeKB > 0
    ? Math.abs(((sourceFileSizeKB - finalSizeKB) / sourceFileSizeKB) * 100)
    : 0;
  const sizeChangeLabel = finalSizeKB > sourceFileSizeKB ? "Increased by" : "Reduced by";
  let statusClass = "pass";
  let statusText = "Ready for upload";
  let note = "The file is inside the target size range for this preset.";

  if (finalSizeKB < preset.minKB) {
    statusClass = "warning";
    statusText = "Check before upload";
    note = "The file is below the usual minimum size. It may still upload, but some portals expect a minimum KB value.";
  }

  if (finalSizeKB > preset.maxKB) {
    statusClass = "error";
    statusText = "Still too large";
    note = "Try increasing crop, using a simpler background or lowering custom dimensions.";
  }

  resultCard.className = `result-card ${statusClass}`;
  resultCard.innerHTML = `
    <div class="result-title">${statusText}</div>
    <div class="result-grid">
      <div class="result-label">Dimensions</div>
      <div class="result-value">${preset.width} x ${preset.height}px</div>
      <div class="result-label">Format</div>
      <div class="result-value">JPG</div>
      <div class="result-label">Original size</div>
      <div class="result-value">${sourceFileSizeKB.toFixed(2)} KB</div>
      <div class="result-label">Final size</div>
      <div class="result-value">${finalSizeKB.toFixed(2)} KB</div>
      <div class="result-label">${sizeChangeLabel}</div>
      <div class="result-value">${sizeChangePercent.toFixed(1)}%</div>
    </div>
    <p class="result-note">${note}</p>
  `;
  resultCard.style.display = "block";
}

async function padJpegToMinimum(blob, preset) {
  const minBytes = Math.ceil(preset.minKB * 1024);
  const maxBytes = Math.floor(preset.maxKB * 1024);

  if (blob.size >= minBytes || minBytes >= maxBytes) {
    return blob;
  }

  const targetBytes = Math.min(maxBytes, minBytes + 256);
  let extraBytes = targetBytes - blob.size;

  if (extraBytes < 4) {
    return blob;
  }

  const input = new Uint8Array(await blob.arrayBuffer());
  const eoiIndex = input[input.length - 2] === 0xff && input[input.length - 1] === 0xd9
    ? input.length - 2
    : input.length;
  const chunks = [input.slice(0, eoiIndex)];

  while (extraBytes >= 4) {
    const segmentSize = Math.min(extraBytes, 65537);
    const payloadSize = segmentSize - 4;
    const lengthValue = payloadSize + 2;
    const segment = new Uint8Array(segmentSize);

    segment[0] = 0xff;
    segment[1] = 0xfe;
    segment[2] = (lengthValue >> 8) & 0xff;
    segment[3] = lengthValue & 0xff;
    segment.fill(0x20, 4);
    chunks.push(segment);
    extraBytes -= segmentSize;
  }

  chunks.push(input.slice(eoiIndex));
  return new Blob(chunks, { type: "image/jpeg" });
}

presetOptions.forEach((option) => {
  option.addEventListener("click", () => {
    currentPreset = option.dataset.preset;
    updatePresetUI();
    syncPresetToUrl();
  });
});

rotateButton.addEventListener("click", rotateImage90);

resetCustomButton.addEventListener("click", () => {
  customWidth.value = "420";
  customHeight.value = "525";
  customKB.value = "20";
  updatePresetUI();
});

[customWidth, customHeight, customKB].forEach((input) => {
  input.addEventListener("input", updatePresetUI);
});

[zoomRange, panXRange, panYRange].forEach((input) => {
  input.addEventListener("input", renderPreview);
});

imageInput.addEventListener("change", (event) => {
  loadImage(event.target.files[0]);
});

["dragenter", "dragover", "dragleave", "drop"].forEach((eventName) => {
  dropArea.addEventListener(eventName, (event) => {
    event.preventDefault();
    event.stopPropagation();
  });
});

["dragenter", "dragover"].forEach((eventName) => {
  dropArea.addEventListener(eventName, () => {
    dropArea.classList.add("dragover");
  });
});

["dragleave", "drop"].forEach((eventName) => {
  dropArea.addEventListener(eventName, () => {
    dropArea.classList.remove("dragover");
  });
});

dropArea.addEventListener("drop", (event) => {
  loadImage(event.dataTransfer.files[0]);
});

processButton.addEventListener("click", processImage);
clearButton.addEventListener("click", clearImage);

updatePresetUI();
