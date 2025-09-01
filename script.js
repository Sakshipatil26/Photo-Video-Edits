document.getElementById('uploadButton').addEventListener('click', function() {
    const mediaInput = document.getElementById('mediaInput');
    const mediaContainer = document.getElementById('mediaContainer');
  
    if (mediaInput.files && mediaInput.files[0]) {
      const file = mediaInput.files[0];
      const reader = new FileReader();
  
      reader.onload = function(e) {
        const mediaType = file.type.split('/')[0];
        if (mediaType === 'image') {
          mediaContainer.innerHTML = `<img src="${e.target.result}" alt="Uploaded Image">`;
        } else if (mediaType === 'video') {
          mediaContainer.innerHTML = `<video controls><source src="${e.target.result}" type="${file.type}">Your browser does not support the video tag.</video>`;
        } else {
          alert('Unsupported media type');
        }
      };
  
      reader.readAsDataURL(file);
    } else {
      alert('Please select a file');
    }
  });
  
  document.getElementById('editButton').addEventListener('click', function() {
    // Implement editing functionality
    alert('Editing functionality will be implemented here');
  });
  