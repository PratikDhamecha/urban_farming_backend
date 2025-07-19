const fs = require('fs');
const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: "dvsvqxcch",
    api_key: "761341217247923",
    api_secret: "pHl35D0s2K-Rbgs5ITvT9UsHJwg",
});

async function uploadImage(localFilePath) {
    try {
        
        if (!localFilePath || !fs.existsSync(localFilePath)) {
            console.log("No file found");
            return null;
        }
        // Upload image to cloudinary
        const data = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto",
        });
        fs.unlink(localFilePath, err => { // remove the file asynchronously
            if (err) console.error(`Error deleting file ${localFilePath}: ${err}`);
        });
        console.log(data);
        return data.url;
    }
    catch (err) {
        if (fs.existsSync(localFilePath)) {
            fs.unlink(localFilePath, err => { // remove the file asynchronously
                if (err) console.error(`Error deleting file ${localFilePath}: ${err}`);
            });
        }
        console.log(err);
        throw err; // throw the error after logging it
    }
}

module.exports = uploadImage;