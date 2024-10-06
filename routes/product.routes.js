import { Router } from "express";
import { upload } from "../middleware/multer.middleware.js";

const router = Router();

router.post("/add",upload.single("image"),addProduct);

export default router