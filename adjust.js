const fileInput = document.querySelector(".file-input"),
  filterOptions = document.querySelectorAll(".filter button"),
  filterName = document.querySelector(".filter-info .name"),
  filterValue = document.querySelector(".filter-info .value"),
  filterSlider = document.querySelector(".slider input"),
  previewImg = document.querySelector(".preview-img img"),
  resetFilterBtn = document.querySelector(".reset-filter"),
  chooseImgBtn = document.querySelector(".choose-img"),
  saveImgBtn = document.querySelector(".save-img");

let brightness = "100", saturation = "100", inversion = "0", grayscale = "0", temperature = "0", contrast = "100", shadow = "0", sharpness = "100", clarity = "0", vignette = "0", vibrance = "100";
let rotate = 0, flipHorizontal = 1, flipVertical = 1;

const loadImage = () => {
  let file = fileInput.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = function () {
    previewImg.src = reader.result;
    previewImg.onload = () => {
      resetFilterBtn.click();
      document.querySelector(".container").classList.remove("disable");
    };
  }
  reader.readAsDataURL(file);
}

const applyFilter = () => {
  previewImg.style.transform = `rotate(${rotate}deg) scale(${flipHorizontal}, ${flipVertical})`;
  previewImg.style.filter = `brightness(${brightness}%) saturate(${saturation}%) invert(${inversion}%) grayscale(${grayscale}%) contrast(${contrast}%) sepia(${shadow}%) hue-rotate(${temperature}deg) blur(${clarity}px) sepia(${vignette}%) saturate(${vibrance}%)`;
}

filterOptions.forEach(option => {
  option.addEventListener("click", () => {
    document.querySelector(".active").classList.remove("active");
    option.classList.add("active");
    filterName.innerText = option.innerText;

    filterSlider.value = 0;
    filterValue.innerText = "0%";

    if (option.id === "brightness") {
      filterSlider.max = "200";
    } else if (option.id === "saturation") {
      filterSlider.max = "200";
    } else if (option.id === "inversion") {
      filterSlider.max = "100";
    } else if (option.id === "grayscale") {
      filterSlider.max = "100";
    } else if (option.id === "temperature") {
      filterSlider.max = "360";
    } else if (option.id === "contrast") {
      filterSlider.max = "200";
    } else if (option.id === "shadow") {
      filterSlider.max = "100";
    } else if (option.id === "sharpness") {
      filterSlider.max = "200";
    } else if (option.id === "clarity") {
      filterSlider.max = "10";
    } else if (option.id === "vignette") {
      filterSlider.max = "100";
    } else if (option.id === "vibrance") {
      filterSlider.max = "200";
    }
  });
});

const updateFilter = () => {
  filterValue.innerText = `${filterSlider.value}%`;
  const selectedFilter = document.querySelector(".filter .active");

  if (selectedFilter.id === "brightness") {
    brightness = filterSlider.value;
  } else if (selectedFilter.id === "saturation") {
    saturation = filterSlider.value;
  } else if (selectedFilter.id === "inversion") {
    inversion = filterSlider.value;
  } else if (selectedFilter.id === "grayscale") {
    grayscale = filterSlider.value;
  } else if (selectedFilter.id === "temperature") {
    temperature = filterSlider.value;
  } else if (selectedFilter.id === "contrast") {
    contrast = filterSlider.value;
  } else if (selectedFilter.id === "shadow") {
    shadow = filterSlider.value;
  } else if (selectedFilter.id === "sharpness") {
    sharpness = filterSlider.value;
  } else if (selectedFilter.id === "clarity") {
    clarity = filterSlider.value;
  } else if (selectedFilter.id === "vignette") {
    vignette = filterSlider.value;
  } else if (selectedFilter.id === "vibrance") {
    vibrance = filterSlider.value;
  }
  applyFilter();
}

const resetFilter = () => {
  brightness = "100"; saturation = "100"; inversion = "0"; grayscale = "0"; temperature = "0"; contrast = "100"; shadow = "0"; sharpness = "100"; clarity = "0"; vignette = "0"; vibrance = "100";
  rotate = 0; flipHorizontal = 1; flipVertical = 1;
  filterOptions[0].click();
  applyFilter();
}

const saveImage = () => {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  canvas.width = previewImg.naturalWidth;
  canvas.height = previewImg.naturalHeight;

  ctx.filter = `brightness(${brightness}%) saturate(${saturation}%) invert(${inversion}%) grayscale(${grayscale}%) contrast(${contrast}%) sepia(${shadow}%) hue-rotate(${temperature}deg) blur(${clarity}px) sepia(${vignette}%) saturate(${vibrance}%)`;
  ctx.translate(canvas.width / 2, canvas.height / 2);
  if (rotate !== 0) {
    ctx.rotate(rotate * Math.PI / 180);
  }
  ctx.scale(flipHorizontal, flipVertical);
  ctx.drawImage(previewImg, -canvas.width / 2, -canvas.height / 2, canvas.width, canvas.height);

  const link = document.createElement("a");
  link.download = "image.jpg";
  link.href = canvas.toDataURL();
  link.click();
}

filterSlider.addEventListener("input", updateFilter);
resetFilterBtn.addEventListener("click", resetFilter);
saveImgBtn.addEventListener("click", saveImage);
fileInput.addEventListener("change", loadImage);
chooseImgBtn.addEventListener("click", () => fileInput.click());
