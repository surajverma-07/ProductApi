import { v2 as cloudinary } from 'cloudinary'; // Import Cloudinary library
import fs from 'fs'; // Import file system module

// Configure Cloudinary with environment variables
cloudinary.config({ 
  cloud_name: `${process.env.CLOUDINARY_CLOUD_NAME}`, 
  api_key: `${process.env.CLOUDINARY_API_KEY}`, 
  api_secret: `${process.env.CLOUDINARY_API_SECRET}` 
});

// Function to upload a file to Cloudinary
const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) return null; // Check if the file path is provided

        // Upload the file to Cloudinary
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto" // Automatically determine resource type
        });

        // Remove the local file after successful upload
        fs.unlinkSync(localFilePath);
        return response; // Return the Cloudinary response

    } catch (error) {
        // If an error occurs, remove the local file
        fs.unlinkSync(localFilePath);
    }
}

export { uploadOnCloudinary }; // Export the upload function
