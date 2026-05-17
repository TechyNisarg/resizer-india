const toast =
  document.getElementById(
    "toast"
  );

const selectedPresetText =
  document.getElementById(
    "selectedPresetText"
  );

const imageInput =
  document.getElementById(
    "imageInput"
  );

const previewImage =
  document.getElementById(
    "previewImage"
  );

const processButton =
  document.getElementById(
    "processButton"
  );

const clearButton =
  document.getElementById(
    "clearButton"
  );

const downloadLink =
  document.getElementById(
    "downloadLink"
  );

const resultCard =
  document.getElementById(
    "resultCard"
  );

const instructionBox =
  document.getElementById(
    "instructionBox"
  );

const dropArea =
  document.getElementById(
    "dropArea"
  );

const customControls =
  document.getElementById(
    "customControls"
  );

const customWidth =
  document.getElementById(
    "customWidth"
  );

const customHeight =
  document.getElementById(
    "customHeight"
  );

const customKB =
  document.getElementById(
    "customKB"
  );

const resetCustomButton =
  document.getElementById(
    "resetCustomButton"
  );

const dropdownBtn =
  document.querySelector(
    ".dropdown-btn"
  );

const dropdownContent =
  document.querySelector(
    ".dropdown-content"
  );

const presetOptions =
  document.querySelectorAll(
    ".preset-option"
  );

const emptyState =
  document.getElementById(
    "emptyState"
  );

let cropper = null;

let currentPreset = "photo";

let originalFileSizeKB = 0;


/* =========================
   PRESETS
========================= */

const presets = {

  photo: {

    width: 420,

    height: 525,

    minKB: 10,

    maxKB: 20,

    filename:
      "resized-rto-photo",

    buttonText:
      "Resize RTO Photo (420×525)",

    instructions: `

      <strong>
        RTO Photo Requirements
      </strong>

      • Passport-style color photo

      <br>

      • Light or white background

      <br>

      • Face should be clearly visible

      <br>

      • JPG/JPEG output format

      <br>

      • Final size:
      10KB to 20KB

    `

  },

  signature: {

    width: 256,

    height: 64,

    minKB: 10,

    maxKB: 20,

    filename:
      "resized-rto-signature",

    buttonText:
      "Resize RTO Signature (256×64)",

    instructions: `

      <strong>
        RTO Signature Requirements
      </strong>

      • Use black or blue pen on white paper

      <br>

      • Signature should be clearly visible

      <br>

      • JPG/JPEG output format

      <br>

      • Final size:
      10KB to 20KB

    `

  },

  custom: {

    width: 420,

    height: 525,

    minKB: 1,

    maxKB: 20,

    filename:
      "custom-resized-image",

    buttonText:
      "Resize Custom Image",

    instructions: `

      <strong>
        Custom Resize
      </strong>

      • Set custom dimensions

      <br>

      • Set target file size

      <br>

      • JPG/JPEG output format

      <br>

      • Works for forms & uploads

    `

  }

};


/* =========================
   TOAST
========================= */

function showToast(message) {

  toast.textContent = message;

  toast.classList.add(
    "show"
  );

  clearTimeout(
    toast.hideTimeout
  );

  toast.hideTimeout =
    setTimeout(() => {

      toast.classList.remove(
        "show"
      );

    }, 2600);

}


/* =========================
   UPDATE UI
========================= */

function updateButtonText() {

  document.getElementById(
    "processButtonText"
  ).textContent =

    presets[currentPreset]
      .buttonText;

}

function updateInstructions() {

  instructionBox.innerHTML =

    presets[currentPreset]
      .instructions;

}

updateButtonText();

updateInstructions();


/* =========================
   DROPDOWN
========================= */

dropdownBtn.addEventListener(
  "click",
  function (e) {

    e.stopPropagation();

    dropdownContent.classList.toggle(
      "show"
    );

  }
);

document.addEventListener(
  "click",
  function () {

    dropdownContent.classList.remove(
      "show"
    );

  }
);

presetOptions.forEach((option) => {

  option.addEventListener(
    "click",
    function () {

      const preset =
        this.dataset.preset;

      presetOptions.forEach(
        (item) => {

          item.classList.remove(
            "active"
          );

        }
      );

      this.classList.add(
        "active"
      );

      currentPreset = preset;

      selectedPresetText.textContent =
        this.textContent.trim();

      updateButtonText();

      updateInstructions();

      if (preset === "custom") {

        customControls.style.display =
          "block";

      } else {

        customControls.style.display =
          "none";

      }

      if (cropper) {

        cropper.setAspectRatio(

          presets[preset].width /

          presets[preset].height

        );

      }

      dropdownContent.classList.remove(
        "show"
      );

    }
  );

});


/* =========================
   RESET CUSTOM
========================= */

resetCustomButton.addEventListener(
  "click",
  function () {

    customWidth.value = 420;

    customHeight.value = 525;

    customKB.value = 20;

  }
);


/* =========================
   LOAD IMAGE
========================= */

function loadImage(file) {

  if (!file) return;

  if (
    !file.type.startsWith(
      "image/"
    )
  ) {

    showToast(
      "Please upload an image file."
    );

    return;

  }

  originalFileSizeKB =

    (
      file.size / 1024
    ).toFixed(2);

  emptyState.style.display =
    "none";

  const imageURL =
    URL.createObjectURL(file);

  if (cropper) {

    cropper.destroy();

    cropper = null;

  }

  previewImage.src =
    imageURL;

  previewImage.style.display =
    "block";

  processButton.disabled =
    false;

}


/* =========================
   FILE INPUT
========================= */

imageInput.addEventListener(
  "change",
  function (event) {

    const file =
      event.target.files[0];

    loadImage(file);

  }
);


/* =========================
   DRAG & DROP
========================= */

[
  "dragenter",
  "dragover",
  "dragleave",
  "drop"
].forEach((eventName) => {

  dropArea.addEventListener(
    eventName,
    (e) => {

      e.preventDefault();

      e.stopPropagation();

    }
  );

});

[
  "dragenter",
  "dragover"
].forEach((eventName) => {

  dropArea.addEventListener(
    eventName,
    () => {

      dropArea.classList.add(
        "dragover"
      );

    }
  );

});

[
  "dragleave",
  "drop"
].forEach((eventName) => {

  dropArea.addEventListener(
    eventName,
    () => {

      dropArea.classList.remove(
        "dragover"
      );

    }
  );

});

dropArea.addEventListener(
  "drop",
  function (e) {

    const file =
      e.dataTransfer.files[0];

    loadImage(file);

  }
);


/* =========================
   IMAGE LOAD
========================= */

previewImage.addEventListener(
  "load",
  function () {

    cropper = new Cropper(

      previewImage,

      {

        aspectRatio:

          presets[currentPreset]
            .width /

          presets[currentPreset]
            .height,

        viewMode: 1,

        dragMode: "move",

        autoCropArea: 1,

        responsive: true,

        background: false,

        movable: true,

        zoomable: true,

        scalable: false,

        rotatable: false,

      }

    );

  }
);


/* =========================
   PROCESS BUTTON
========================= */

processButton.addEventListener(
  "click",
  function () {

    if (!cropper) {

      showToast(
        "Please upload image first."
      );

      return;

    }

    if (
      currentPreset ===
      "custom"
    ) {

      presets.custom.width =
        parseInt(
          customWidth.value
        );

      presets.custom.height =
        parseInt(
          customHeight.value
        );

      presets.custom.maxKB =
        parseInt(
          customKB.value
        );

      if (

        isNaN(
          presets.custom.width
        ) ||

        isNaN(
          presets.custom.height
        ) ||

        isNaN(
          presets.custom.maxKB
        ) ||

        presets.custom.width <= 0 ||

        presets.custom.height <= 0 ||

        presets.custom.maxKB <= 0

      ) {

        showToast(
          "Please enter valid custom values."
        );

        return;

      }

      cropper.setAspectRatio(

        presets.custom.width /

        presets.custom.height

      );

    }

    setProcessingState(true);

    const canvas =

      cropper.getCroppedCanvas({

        width:
          presets[currentPreset]
            .width,

        height:
          presets[currentPreset]
            .height,

        imageSmoothingEnabled:
          true,

        imageSmoothingQuality:
          "high",

      });

    compressImage(canvas);

  }
);


/* =========================
   PROCESSING STATE
========================= */

function setProcessingState(
  isProcessing
) {

  if (isProcessing) {

    processButton.disabled =
      true;

    document.getElementById(
      "processButtonText"
    ).textContent =
      "Processing...";

  } else {

    processButton.disabled =
      false;

    updateButtonText();

  }

}


/* =========================
   CLEAR BUTTON
========================= */

clearButton.addEventListener(
  "click",
  function () {

    previewImage.classList.add(
      "fade-out"
    );

    resultCard.classList.add(
      "fade-out"
    );

    downloadLink.classList.add(
      "fade-out"
    );

    setTimeout(() => {

      if (cropper) {

        cropper.destroy();

        cropper = null;

      }

      imageInput.value = "";

      previewImage.src = "";

      previewImage.style.display =
        "none";

      emptyState.style.display =
        "block";

      downloadLink.style.display =
        "none";

      downloadLink.removeAttribute(
        "href"
      );

      downloadLink.removeAttribute(
        "download"
      );

      resultCard.style.display =
        "none";

      resultCard.innerHTML = "";

      previewImage.classList.remove(
        "fade-out"
      );

      resultCard.classList.remove(
        "fade-out"
      );

      downloadLink.classList.remove(
        "fade-out"
      );

      processButton.disabled =
        true;

    }, 230);

  }
);


/* =========================
   COMPRESS IMAGE
========================= */

async function compressImage(
  canvas
) {

  const maxSizeKB =

    presets[currentPreset]
      .maxKB;

  let minQuality = 0.1;

  let maxQuality = 1.0;

  let finalBlob = null;

  for (
    let i = 0;
    i < 12;
    i++
  ) {

    const quality =

      (
        minQuality +
        maxQuality
      ) / 2;

    const blob =
      await canvasToBlob(
        canvas,
        quality
      );

    const sizeKB =
      blob.size / 1024;

    const tolerance = 0.5;

    if (

      sizeKB <= maxSizeKB &&

      sizeKB >=
      maxSizeKB - tolerance

    ) {

      finalBlob = blob;

      break;

    }

    if (
      sizeKB > maxSizeKB
    ) {

      maxQuality = quality;

    } else {

      finalBlob = blob;

      minQuality = quality;

    }

  }

  if (!finalBlob) {

    setProcessingState(false);

    showToast(
      "Could not compress image properly."
    );

    return;

  }

  const finalSizeKB =

    (
      finalBlob.size / 1024
    ).toFixed(2);

  const downloadURL =

    URL.createObjectURL(
      finalBlob
    );

  downloadLink.href =
    downloadURL;

  downloadLink.download =

    `${presets[currentPreset]
      .filename}-${finalSizeKB}KB.jpg`;

  setTimeout(() => {

    setProcessingState(false);

    showResult(finalBlob);

  }, 350);

}


/* =========================
   CANVAS TO BLOB
========================= */

function canvasToBlob(
  canvas,
  quality
) {

  return new Promise(
    (resolve) => {

      canvas.toBlob(

        (blob) => {

          resolve(blob);

        },

        "image/jpeg",

        quality

      );

    }
  );

}


/* =========================
   SHOW RESULT
========================= */

function showResult(blob) {

  const sizeKB =

    (
      blob.size / 1024
    ).toFixed(2);

  const width =
    presets[currentPreset]
      .width;

  const height =
    presets[currentPreset]
      .height;

  const reductionPercent =

    (
      (
        (
          originalFileSizeKB -
          sizeKB
        ) /

        originalFileSizeKB
      ) * 100
    ).toFixed(1);

  let statusClass =
    "pass";

  let message = `

    <div class="result-title">
      Validation Result
    </div>

    <div class="result-grid">

      <div class="result-label">
        Dimensions
      </div>

      <div class="result-value">
        ${width} × ${height}px
      </div>

      <div class="result-label">
        Format
      </div>

      <div class="result-value">
        JPG
      </div>

      <div class="result-label">
        Original File Size
      </div>

      <div class="result-value">
        ${originalFileSizeKB} KB
      </div>

      <div class="result-label">
        Final File Size
      </div>

      <div class="result-value">
        ${sizeKB} KB
      </div>

      <div class="result-label">
        Reduced By
      </div>

      <div class="result-value">
        ${reductionPercent}%
      </div>

    </div>

  `;

  if (

    sizeKB <
    presets[currentPreset]
      .minKB

  ) {

    statusClass =
      "warning";

  }

  if (

    sizeKB >
    presets[currentPreset]
      .maxKB

  ) {

    statusClass =
      "error";

  }

  resultCard.className =
    statusClass;

  resultCard.innerHTML =
    message;

  resultCard.style.display =
    "block";

  downloadLink.style.display =
    "flex";

}