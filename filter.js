// Event listener for uploading image
document.getElementById('imageUpload').addEventListener('change', function(event) {
    var file = event.target.files[0];
    var reader = new FileReader();

    reader.onload = function(e) {
        var img = document.getElementById('imageDisplay');
        img.onload = function() {
            // After the image has loaded, apply the default filter
            applyFilter(currentFilter);
        };
        img.src = e.target.result;
    };

    reader.readAsDataURL(file);
});

// Event listener for selecting filters
document.getElementById('filters').addEventListener('click', function(event) {
    if (event.target.dataset.filter === 'reset') {
        resetFilters();
    } else {
        var filter = event.target.dataset.filter;
        showFilterOptions(filter);
    }
});

// Event listener for applying filter options
document.querySelectorAll('.filterOptions button').forEach(button => {
    button.addEventListener('click', function() {
        var filter = button.dataset.filter;
        applyFilter(filter);
    });
});

// Event listener for changing filter strength
document.getElementById('filterStrength').addEventListener('input', function() {
    var strength = this.value;
    applyFilter(currentFilter, strength);
});

// Function to apply filter to the image
// Function to apply filter to the image
function applyFilter(filter, strength = 100) {
    var image = document.getElementById('imageDisplay');
    switch (filter) {
        case 'none':
            image.style.filter = 'none';
            break;
        case 'fresco':
            image.style.filter = `contrast(${strength / 100}) saturate(${strength / 100})`;
            break;
        case 'belvedere':
            image.style.filter = `brightness(${1 + strength / 200}) contrast(${1 + strength / 200})`;
            break;
        case 'flint':
            image.style.filter = `sepia(${strength / 200}) saturate(${1 + strength / 200})`;
            break;
        case 'luna':
            image.style.filter = `grayscale(${strength / 200}) contrast(${1 + strength / 200})`;
            break;
        case 'aero':
            image.style.filter = `brightness(${1 + strength / 100}) hue-rotate(${strength * 3.6}deg)`;
            break;
        case 'myst':
            image.style.filter = `invert(${strength / 100})`;
            break;
        case 'bali':
            image.style.filter = 'sepia(0.2) contrast(1.2) saturate(1.5)';
            break;
        case 'capri':
            image.style.filter = 'sepia(0.1) contrast(1.3) saturate(1.2)';
            break;
        case 'latte':
            image.style.filter = 'sepia(0.1) contrast(1.1) saturate(1.1)';
            break;
        case 'bronz':
            image.style.filter = 'sepia(0.3) contrast(1.4) saturate(1.3)';
            break;
        case 'sandi':
            image.style.filter = 'sepia(0.2) contrast(1.3) saturate(1.4)';
            break;
        case 'sangri':
            image.style.filter = 'sepia(0.3) contrast(1.2) saturate(1.5)';
            break;
        case 'scandi':
            image.style.filter = 'grayscale(0.8) sepia(0.1) contrast(1.2) brightness(1.2)';
            break;
        case 'nordic':
            image.style.filter = 'grayscale(0.8) sepia(0.2) contrast(1.3) brightness(1.2)';
            break;
        case 'astro':
            image.style.filter = 'grayscale(0.7) sepia(0.2) contrast(1.4) brightness(1.2)';
            break;
        case 'arctic':
            image.style.filter = 'grayscale(0.9) sepia(0.1) contrast(1.3) brightness(1.3)';
            break;
        case 'tundra':
            image.style.filter = 'grayscale(0.8) sepia(0.3) contrast(1.5) brightness(1.4)';
            break;
        case 'chroma':
            image.style.filter = 'brightness(1.2) contrast(1.2) saturate(2)';
            break;
        case 'zeal':
            image.style.filter = 'brightness(1.3) contrast(1.3) saturate(2)';
            break;
        case 'aria':
            image.style.filter = 'brightness(1.2) contrast(1.4) saturate(1.8)';
            break;
        case 'stark':
            image.style.filter = 'brightness(1.3) contrast(1.5) saturate(1.5)';
            break;
        case 'eldar':
            image.style.filter = 'brightness(1.4) contrast(1.6) saturate(1.6)';
            break;
        case 'rustiq':
            image.style.filter = 'brightness(1.5) contrast(1.7) saturate(1.7)';
            break;
        case 'classic':
            image.style.filter = 'grayscale(1) contrast(1.2)';
            break;
        case 'ink':
            image.style.filter = 'grayscale(1) contrast(1.3)';
            break;
        case 'noir':
            image.style.filter = 'grayscale(1) contrast(1.4)';
            break;
        case 'flim':
            image.style.filter = 'grayscale(1) contrast(1.5)';
            break;
        case 'newspaper':
            image.style.filter = 'grayscale(1) contrast(1.6)';
            break;
        case 'slate':
            image.style.filter = 'grayscale(1) contrast(1.7)';
            break;
        case 'outrun':
            image.style.filter = 'sepia(0.5) contrast(1.2) saturate(2) hue-rotate(20deg)';
            break;
        case 'heatwave':
            image.style.filter = 'hue-rotate(90deg) brightness(1.2) contrast(1.2) saturate(1.5)';
            break;
        case 'amethyst':
            image.style.filter = 'hue-rotate(270deg) brightness(0.8) saturate(1.2) contrast(1.2)';
            break;
        case 'minty':
            image.style.filter = 'hue-rotate(145deg) saturate(1.5) contrast(1.2) brightness(1.1)';
            break;
        case 'hibiscus':
            image.style.filter = 'hue-rotate(30deg) saturate(2) contrast(1.5) brightness(1.2)';
            break;
        case 'poster':
            image.style.filter = 'hue-rotate(60deg) saturate(2) contrast(1.5) brightness(1.2)';
            break;
        default:
            // Do nothing for unknown filters
            break;
    }
}


// Event listener for saving the image
document.getElementById('saveButton').addEventListener('click', function() {
    saveImage();
});

// Event listener for opening the collection page
document.getElementById('collectionButton').addEventListener('click', function() {
    window.location.href = 'collection.html';
});

// Function to save the image to device and collection
function saveImage() {
    var image = document.getElementById('imageDisplay');
    
    // Save edited image to device
    saveImageToDevice(image);
    
    // Save edited image to collection
    saveImageToCollection(image);
}

// Function to save the image to the device
function saveImageToDevice(image) {
    var canvas = document.createElement('canvas');
    var ctx = canvas.getContext('2d');
    canvas.width = image.width;
    canvas.height = image.height;

    // Apply current filter to the canvas
    applyFilter(currentFilter);

    // Draw the image onto the canvas
    ctx.drawImage(image, 0, 0);

    // Trigger download
    var a = document.createElement('a');
    a.href = canvas.toDataURL(); // Convert canvas to data URL
    a.download = 'filtered_image.png'; // Set the desired file name here
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}

// Function to save the image to the collection
function saveImageToCollection(image) {
    // Save to collection
    var savedImages = JSON.parse(localStorage.getItem('savedImages')) || [];
    savedImages.push(image.src);
    localStorage.setItem('savedImages', JSON.stringify(savedImages));
}

// Function to show filter options
function showFilterOptions(filter) {
    document.querySelectorAll('.filterOptions').forEach(option => {
        option.classList.add('hidden');
    });

    var filterOption = document.getElementById(filter + 'Filters');
    if (filterOption) {
        filterOption.classList.remove('hidden');
    }
}

// Function to reset filters
function resetFilters() {
    var image = document.getElementById('imageDisplay');
    image.style.filter = 'none';
    document.querySelectorAll('.filterOptions').forEach(option => {
        option.classList.add('hidden');
    });
    currentFilter = 'none';
}

// Initialize current filter
var currentFilter = 'none';
