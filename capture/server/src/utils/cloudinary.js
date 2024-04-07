const { v2 } = require("cloudinary");
const fs = require("fs");

/* ---------------------- Cloudinary file configuration --------------------- */
v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

/* ---------------------- Upload files to Cloudinary --------------------- */
const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;

    /** Upload the file to Cloudinary */
    const response = await v2.uploader.upload(localFilePath, {
      resource_type: "auto",
    });

    /** File has been uploaded successfully */
    console.log(`[INFO] The image was uploaded to Cloudinary: ${response.url}`);
    return response;
  } catch (error) {
    /** Remove the locally saved temporary file as the upload operation failed */
    fs.unlink(localFilePath, (err) => {
      if (err) {
        console.error(`Error deleting local file: ${err}`);
      }
    });

    return null;
  }
};

module.exports = { uploadOnCloudinary };