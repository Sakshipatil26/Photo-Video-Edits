const originalCanvas = document.getElementById('originalCanvas');
const originalCtx = originalCanvas.getContext('2d');
const editedCanvas = document.getElementById('editedCanvas');
const editedCtx = editedCanvas.getContext('2d');
const fileInput = document.getElementById('fileInput');

fileInput.addEventListener('change', handleFile);

function handleFile(event) {
  const file = event.target.files[0];
  const reader = new FileReader();
  reader.onload = function(event) {
    const img = new Image();
    img.onload = function() {
      originalCanvas.width = img.width;
      originalCanvas.height = img.height;
      editedCanvas.width = img.width;
      editedCanvas.height = img.height;

      originalCtx.drawImage(img, 0, 0);
      editedCtx.drawImage(img, 0, 0);

      enhanceImage();
    };
    img.src = event.target.result;
  };
  reader.readAsDataURL(file);
}

function enhanceImage() {
  const imageData = editedCtx.getImageData(0, 0, editedCanvas.width, editedCanvas.height);
  const data = imageData.data;

  // Example enhancement: increase contrast
  for (let i = 0; i < data.length; i += 4) {
    data[i] = Math.min(255, data[i] * 1.2); // R channel
    data[i + 1] = Math.min(255, data[i + 1] * 1.2); // G channel
    data[i + 2] = Math.min(255, data[i + 2] * 1.2); // B channel
  }

  editedCtx.putImageData(imageData, 0, 0);
}
