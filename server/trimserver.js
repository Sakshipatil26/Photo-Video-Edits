const express = require('express');
const bodyParser = require('body-parser');
const { exec } = require('child_process');
const path = require('path');



const app = express();
const port = 3004;

app.use(express.static('public'));
app.use(bodyParser.json());

app.post('/trim-video', (req, res) => {
    const { videoUrl, startTime, endTime } = req.body;
    const outputFilename = 'trimmed_video.mp4';

    // Trim video using FFmpeg
    const command = `ffmpeg -i "${videoUrl}" -ss ${startTime} -to ${endTime} -c copy "${outputFilename}"`;

    exec(command, (error, stdout, stderr) => {
        if (error) {
            console.error(`FFmpeg error: ${error.message}`);
            res.status(500).json({ error: 'Video trimming failed' });
            return;
        }
        if (stderr) {
            console.error(`FFmpeg stderr: ${stderr}`);
            res.status(500).json({ error: 'Video trimming failed' });
            return;
        }
        console.log(`Video trimming successful. Output file: ${outputFilename}`);
        const filePath = path.join(__dirname, outputFilename);
        res.download(filePath, outputFilename, (err) => {
            if (err) {
                console.error(`Download error: ${err.message}`);
                res.status(500).json({ error: 'Download failed' });
            } else {
                console.log('Download successful');
            }
        });
    });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});



