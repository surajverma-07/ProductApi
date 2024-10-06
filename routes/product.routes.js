import { Router } from "express";
import { upload } from "../middleware/multer.middleware.js";
import { addProduct, updateProduct,getAllProducts,getProductById, updateImage } from "../controller/product.controller.js";

const router = Router();

router.post("/add", upload.single("image"), addProduct);
router.put("/update/:id", updateProduct); 
router.put("/update/image/:id",upload.single("image"), updateImage); 
router.get('/details/:id',getProductById);
router.get('/all',getAllProducts)

export default router;
