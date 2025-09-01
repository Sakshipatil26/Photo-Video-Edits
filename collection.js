document.addEventListener('DOMContentLoaded', function() {
    displayImages();
});

function displayImages() {
    var savedImages = JSON.parse(localStorage.getItem('savedImages')) || [];
    var collectionElement = document.getElementById('collection');

    savedImages.forEach(function(imageUrl, index) {
        var imageContainer = document.createElement('div');
        var imgElement = document.createElement('img');
        var deleteButton = document.createElement('button');

        imgElement.src = imageUrl;
        deleteButton.textContent = 'Delete';
        deleteButton.dataset.index = index;
        deleteButton.addEventListener('click', function() {
            deleteImage(index);
        });

        imageContainer.appendChild(imgElement);
        imageContainer.appendChild(deleteButton);
        collectionElement.appendChild(imageContainer);
    });
}

function deleteImage(index) {
    var savedImages = JSON.parse(localStorage.getItem('savedImages')) || [];
    savedImages.splice(index, 1);
    localStorage.setItem('savedImages', JSON.stringify(savedImages));
    location.reload(); // Refresh the page to reflect the changes
}





