document.getElementById('videoFile').addEventListener('change', function(event) {
  var file = event.target.files[0];
  var videoPlayer = document.getElementById('videoPlayer');
  videoPlayer.src = URL.createObjectURL(file);
});

document.getElementById('saveButton').addEventListener('click', function() {
  var videoPlayer = document.getElementById('videoPlayer');
  var startTime = document.getElementById('startTime').value;
  var endTime = document.getElementById('endTime').value;

  if (!videoPlayer.src || !startTime || !endTime) {
      alert('Please select a video and specify start/end times.');
      return;
  }

  // You can add code here to save the trimmed video locally
  alert('Video saved successfully.');
});



document.getElementById('saveButton').addEventListener('click', function() {
  var videoPlayer = document.getElementById('videoPlayer');
  var startTime = document.getElementById('startTime').value;
  var endTime = document.getElementById('endTime').value;

  if (!videoPlayer.src || !startTime || !endTime) {
      alert('Please select a video and specify start/end times.');
      return;
  }

  // You can add code here to save the trimmed video locally
  var downloadLink = document.getElementById('downloadLink');
  downloadLink.href = videoPlayer.src;
  downloadLink.style.display = 'block';
  alert('Video saved successfully. Click the download link below to download the video.');
});
