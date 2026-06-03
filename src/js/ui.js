// src/js/ui.js

export const elements = {
  toast: document.getElementById("toast"),
  imageInput: document.getElementById("imageInput"),
  previewContainer: document.getElementById("previewContainer"),
  previewCanvas: document.getElementById("previewCanvas"),
  processButton: document.getElementById("processButton"),
  processButtonText: document.getElementById("processButtonText"),
  clearButton: document.getElementById("clearButton"),
  downloadLink: document.getElementById("downloadLink"),
  resultCard: document.getElementById("resultCard"),
  instructionBox: document.getElementById("instructionBox"),
  dropArea: document.getElementById("dropArea"),
  customControls: document.getElementById("customControls"),
  customWidth: document.getElementById("customWidth"),
  customHeight: document.getElementById("customHeight"),
  customKB: document.getElementById("customKB"),
  resetCustomButton: document.getElementById("resetCustomButton"),
  presetOptions: document.querySelectorAll(".preset-option"),
  zoomRange: document.getElementById("zoomRange"),
  panXRange: document.getElementById("panXRange"),
  panYRange: document.getElementById("panYRange"),
  zoomOut: document.getElementById("zoomOut"),
  panXOut: document.getElementById("panXOut"),
  panYOut: document.getElementById("panYOut"),
  rotateButton: document.getElementById("rotateButton"),
  resetSliders: document.querySelectorAll(".reset-slider")
};

let toastTimeout;
export function showToast(message) {
  elements.toast.textContent = message;
  elements.toast.classList.add("show");
  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => {
    elements.toast.classList.remove("show");
  }, 2800);
}

export function hideDownloadLink() {
  elements.downloadLink.hidden = true;
  elements.downloadLink.setAttribute("aria-hidden", "true");
  elements.downloadLink.removeAttribute("href");
  elements.downloadLink.removeAttribute("download");
}

export function showDownloadLink(href, filename) {
  elements.downloadLink.href = href;
  elements.downloadLink.download = filename;
  elements.downloadLink.hidden = false;
  elements.downloadLink.removeAttribute("aria-hidden");
}

export function showResult(sourceFileSizeKB, finalSizeKB, preset) {
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

  elements.resultCard.className = `result-card ${statusClass}`;
  elements.resultCard.innerHTML = `
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
  elements.resultCard.style.display = "block";
}
