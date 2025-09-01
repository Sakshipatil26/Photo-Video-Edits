const fileInput = document.getElementById('fileInput');
const compressBtn = document.getElementById('compressBtn');
const originalVideo = document.getElementById('originalVideo');
const compressedVideo = document.getElementById('compressedVideo');

fileInput.addEventListener('change', async (event) => {
    const file = event.target.files[0];
    if (file) {
        originalVideo.src = URL.createObjectURL(file);
        originalVideo.play();
    }
});

compressBtn.addEventListener('click', async () => {
    const file = fileInput.files[0];
    if (!file) {
        alert('Please select a video file first.');
        return;
    }

    const ffmpeg = createFFmpeg({ log: true });
    await ffmpeg.load();

    ffmpeg.FS('writeFile', 'input.mp4', await fetchFile(file));

    await ffmpeg.run('-i', 'input.mp4', '-vf', 'scale=640:-1', '-c:v', 'libx264', '-preset', 'superfast', '-crf', '28', 'output.mp4');

    const compressedData = ffmpeg.FS('readFile', 'output.mp4');
    const compressedBlob = new Blob([compressedData.buffer], { type: 'video/mp4' });
    compressedVideo.src = URL.createObjectURL(compressedBlob);
    compressedVideo.play();

    await ffmpeg.FS('unlink', 'input.mp4');
    await ffmpeg.FS('unlink', 'output.mp4');
});

function fetchFile(file) {
    return new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsArrayBuffer(file);
        reader.onload = () => {
            resolve(reader.result);
        };
    });
}
