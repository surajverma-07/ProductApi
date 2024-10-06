import { asyncHandler } from "../utils/AsyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import Product from "../model/product.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import path from 'path'
// Controller to add a new product
const addProduct = asyncHandler(async (req, res) => {
  const { name, category, price, description } = req.body;

  // Check if all required fields are provided
  if (!(name && category && price && description)) {
    throw new ApiError(400, "All the Details are required");
  }

  // Check if image is provided
  const imagelocalpath = req.file?.path;
  if (!imagelocalpath) {
    throw new ApiError(400, "Please Provide Image");
  }
  // Validate image type
  const fileExtension = path.extname(req.file.originalname).toLowerCase();
  const allowedExtensions = [".jpg", ".jpeg", ".png", ".gif"]; // Add more types if needed

  if (!allowedExtensions.includes(fileExtension)) {
    throw new ApiError(400, "Only image files are allowed!");
  }
  

  // Upload the image to Cloudinary
  const cloudinaryResponse = await uploadOnCloudinary(imagelocalpath);
  if (!cloudinaryResponse) {
    throw new ApiError(400, "Error in getting Cloudinary response");
  }

  // Create new product in the database
  const product = await Product.create({
    name,
    category,
    price,
    description,
    image: cloudinaryResponse?.secure_url || "",
  });

  // Check if product creation was successful
  if (!product) {
    throw new ApiError(400, "Error while adding product");
  }

  // Return success response
  return res
    .status(200)
    .json(new ApiResponse(200, product, "Product Added Successfully"));
});

// Controller to update product details
const updateProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name, category, price, description } = req.body;

  // Check if product exists
  const isProduct = await Product.findById(id);
  if (!isProduct) {
    throw new ApiError(404, "Product Not Exist With this ID");
  }

  // Ensure at least one field is provided for update
  if (!(name || category || price || description)) {
    throw new ApiError(400, "At least one field is required to update");
  }

  // Update the product details
  const product = await Product.findByIdAndUpdate(
    id,
    { name, category, price, description },
    { new: true, runValidators: true }
  );

  // Check if the update was successful
  if (!product) {
    throw new ApiError(404, "Product not found");
  }

  // Return success response
  return res
    .status(200)
    .json(new ApiResponse(200, product, "Product Updated Successfully"));
});

// Controller to update product image
const updateImage = asyncHandler(async (req, res) => {
  const { id } = req.params;

  // Check if product ID is present
  if (!id) {
    throw new ApiError(404, "ID is not present in params");
  }

  // Check if product exists
  const isProduct = await Product.findById(id);
  if (!isProduct) {
    throw new ApiError(404, "Product Not Exist With this ID");
  }

  // Check if image is uploaded
  const imagelocalpath = req.file?.path;
  if (!imagelocalpath) {
    throw new ApiError(404, "Please Upload Image");
  }
  const fileExtension = path.extname(req.file.originalname).toLowerCase();
  const allowedExtensions = [".jpg", ".jpeg", ".png", ".gif"]; // Add more types if needed

  if (!allowedExtensions.includes(fileExtension)) {
    throw new ApiError(400, "Only image files are allowed!");
  }
  // Upload the new image to Cloudinary

  const cloudinaryResponse = await uploadOnCloudinary(imagelocalpath);
  if (!cloudinaryResponse) {
    throw new ApiError(400, "Cloudinary Response Not Received");
  }

  // Update the product with the new image URL
  const product = await Product.findByIdAndUpdate(
    id,
    { image: cloudinaryResponse?.secure_url },
    { new: true, runValidators: true }
  );

  // Check if the update was successful
  if (!product) {
    throw new ApiError(404, "Product not found");
  }

  // Return success response
  return res
    .status(200)
    .json(new ApiResponse(200, product, "Image Changed Successfully"));
});

// Controller to delete a product by ID
const deleteProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;

  // Check if product ID is present
  if (!id) {
    throw new ApiError(404, "ID is not present in params");
  }

  // Check if product exists
  const product = await Product.findById(id);
  if (!product) {
    throw new ApiError(404, "Product Not Exist or Deleted");
  }

  // Delete the product from the database
  const deletedProduct = await Product.findByIdAndDelete(id, { new: true });

  // Check if deletion was successful
  if (!deletedProduct) {
    throw new ApiError(404, "Error While Deletion of Product");
  }

  // Return success response
  return res
    .status(200)
    .json(new ApiResponse(200, null, "Product Deleted Successfully"));
});

// Controller to get product details by ID
const getProductById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  // Find the product by ID
  const product = await Product.findById(id);

  // Check if product exists
  if (!product) {
    throw new ApiError(404, "Product not found");
  }

  // Return success response with product details
  return res
    .status(200)
    .json(
      new ApiResponse(200, product, "Product Details Retrieved Successfully")
    );
});

// Controller to get all products
const getAllProducts = asyncHandler(async (req, res) => {
  // Fetch all products from the database
  const products = await Product.find();

  // Check if products are found
  if (!products) {
    throw new ApiError(404, "No products found");
  }

  // Return success response with all products
  return res
    .status(200)
    .json(
      new ApiResponse(200, products, "All Products Retrieved Successfully")
    );
});

export {
  addProduct,
  updateProduct,
  getAllProducts,
  getProductById,
  updateImage,
  deleteProduct,
};
