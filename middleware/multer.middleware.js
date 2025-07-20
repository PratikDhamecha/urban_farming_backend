const multer = require('multer');
const fs = require('fs');
const path = require('path');

// Ensure the directory exists
const tempDir = path.join(__dirname, '..', 'public', 'temp');
console.log(`Checking if directory exists: ${tempDir}`);

if (!fs.existsSync(tempDir)) {
    console.log('Directory does not exist, creating...');
    fs.mkdirSync(tempDir, { recursive: true });
} else {
    console.log('Directory already exists.');
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        console.log(`Saving file to directory: ${tempDir}`);
        cb(null, tempDir);
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        console.log(`Generating filename: ${file.fieldname}-${uniqueSuffix}`);
        cb(null, file.fieldname + '-' + uniqueSuffix);
    }
});

const upload = multer({ storage: storage });

module.exports = upload;