import { asyncHandler } from "../utils/AsyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import Product from "../model/product.model.js";
import {uploadOnCloudinary} from '../utils/cloudinary.js'

const addProduct = asyncHandler(async(req,res)=>{
    const {name,category,price, description} = req.body;
    if(!(name&&category&&price&& description)){
      throw  new ApiError(400,"All the Details are required")
    }
    const imagelocalpath = req.file?.path;
    if(!imagelocalpath){
      throw new ApiError(400,"Please Provide Image ");
    }
    console.log("ImageLocalPath :: ",imagelocalpath)
    const cloudinaryResponse = await uploadOnCloudinary(imagelocalpath);
    if(!cloudinaryResponse){
      throw new ApiError(400,"Error in getting cloudinary response")
    }
    console.log("Cloudinary Response :: ",cloudinaryResponse)

    const product = await Product.create({
        name,
        category,
        price,
        description,
        image:cloudinaryResponse?.secure_url||""
    })
   
    if(!product){
       throw ApiError(400,"Error while adding product")
    }

    return res
    .status(200)
    .json(
        new ApiResponse(200,product,"Product Added Successfully ")
    )
})
const updateProduct = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { name, category, price, description } = req.body;
    
    if (!(name || category || price || description)) {
        throw new ApiError(400, "At least one field is required to update");
    }

    const product = await Product.findByIdAndUpdate(
        id,
        { name, category, price, description },
        { new: true, runValidators: true }
    );

    if (!product) {
        throw new ApiError(404, "Product not found");
    }

    return res
        .status(200)
        .json(
            new ApiResponse(200, product, "Product Updated Successfully")
        );
});

export {
    addProduct,
    updateProduct,
    
}