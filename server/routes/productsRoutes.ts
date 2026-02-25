import express from "express";
import { createProduct, deleteProduct, getProduct, getProducts, updateProduct } from "../controllers/productController.js";
import upload from "../middleware/upload.js";
import { authorize, protect } from "../middleware/auth.js";

const ProductRouter = express.Router()

//Get all
ProductRouter.get('/', getProducts)

//Get single
ProductRouter.get('/:id', getProduct)

//create(Admin)
ProductRouter.post('/', upload.array("images", 5), protect, authorize('admin'), createProduct)

//update(Admin)
ProductRouter.put('/:id', upload.array("images", 5), protect, authorize('admin'), updateProduct)

//Delete(Admin)
ProductRouter.delete('/:id', protect, authorize('admin'), deleteProduct)

export default ProductRouter;