import express from "express";
import { createProduct, deleteProduct, getProducts, updateProduct } from "../controller/product.controller.js";

const router = express.Router()

//create products
router.post('/',createProduct)
//get all products
router.get('/',getProducts)
//delete products
router.delete('/:id',deleteProduct)
//upadate the product
router.put('/:id',updateProduct)

export default router