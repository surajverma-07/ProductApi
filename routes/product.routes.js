import { Router } from "express";
import { upload } from "../middleware/multer.middleware.js";
import { addProduct, updateProduct } from "../controller/product.controller.js";

const router = Router();

router.post("/add", upload.single("image"), addProduct);
router.put("/update/:id", updateProduct); 

export default router;
