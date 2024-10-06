import { Router } from "express";
import { upload } from "../middleware/multer.middleware.js";
import { addProduct, updateProduct,getAllProducts,getProductById, updateImage ,deleteProduct} from "../controller/product.controller.js";

const router = Router();

// Route to add a new product with an image upload
router.post("/add", upload.single("image"), addProduct);

// Route to update product details (without updating the image)
router.put("/update/:id", updateProduct); 

// Route to update only the product's image
router.put("/update/image/:id", upload.single("image"), updateImage); 

// Route to get details of a product using its ID
router.get('/details/:id', getProductById);

// Route to delete a product using its ID
router.delete('/delete/:id', deleteProduct);

// Route to get all products
router.get('/all', getAllProducts);

export default router;
