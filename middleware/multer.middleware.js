import multer from "multer";

// Define the storage configuration for multer
const storage = multer.diskStorage({
    // Specify the destination folder where files will be temporarily stored
    destination: function (req, file, cb) {
        cb(null, "./public/temp"); // "./public/temp" is the folder where files will be saved
    },
    // Define the filename to use for the uploaded file
    filename: function (req, file, cb) {
        cb(null, file.originalname); // Use the original file name for the uploaded file
    }
});

// Export the configured multer middleware
export const upload = multer({
    storage, // Use the storage settings defined above
});
