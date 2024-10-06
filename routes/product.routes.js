import { Router } from "express";
import { upload } from "../middleware/multer.middleware.js";
import { addProduct, updateProduct,getAllProducts,getProductById } from "../controller/product.controller.js";

const router = Router();

router.post("/add", upload.single("image"), addProduct);
router.put("/update/:id", updateProduct); 
router.get('/details/:id',getProductById);
router.get('/all',getAllProducts)

export default router;
