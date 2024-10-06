import {v2 as cloudinary} from 'cloudinary'
import fs from 'fs'; //file system
 
          
cloudinary.config({ 
  cloud_name: `${process.env.CLOUDINARY_CLOUD_NAME}`, 
  api_key: `${process.env.CLOUDINARY_API_KEY}`, 
  api_secret: `${process.env.CLOUDINARY_API_SECRET}` 
});

const uploadOnCloudinary = async (localFilePath) => {
    try {
        console.log("Local File Path at Cloudinary Fn :: ",localFilePath)
        if(!localFilePath) return null;
        //upload the file on cloudinary 
      const response = await cloudinary.uploader.upload(localFilePath,{
            resource_type: "auto"
        })
        fs.unlinkSync(localFilePath)
        return response
        
    } catch (error) {
        fs.unlinkSync(localFilePath )
    }
}

export {uploadOnCloudinary}