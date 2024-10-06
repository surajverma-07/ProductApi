import { Router } from "express";
import { upload } from "../middleware/multer.middleware.js";
import { addProduct } from "../controller/product.controller.js";

const router = Router();

router.post("/add",upload.single("image"),addProduct);

export default router