import Product from "../models/product.model.js"
import mongoose from "mongoose"

const createProduct = async (req,res) =>{
    try{
    const product = req.body

    if(!product.name || !product.price || !product.image){
        return res.status(400).json({success:"false",msg:"Please fill all the details"})
    }
    const newProduct = new Product(product)
    await newProduct.save()
    res.status(200).json({success:"true",msg:"product created successfully"})
}
catch(error){
    res.status(500).json({msg:"server Error"})
}
}

const getProducts = async (req,res) =>{
    try{
    const products = await Product.find({})
    res.status(200).json({success:"true",data:products})
    }
    catch(error){
        res.status(400).json({msg:"No Products found"})
    }
}

const deleteProduct = async (req,res) =>{
    try{
    const {id} = req.params

    await Product.findByIdAndDelete(id)
    res.status(200).json({success:"true",msg:"Product deleted Successfully"})
    }
    catch(error){
        res.status(400).json({msg:"Product not found"})
    }

}

const updateProduct =async (req,res) =>{
    const {id } = req.params
    const newProduct = req.body
    if(!mongoose.Types.ObjectId.isValid(id)){
        res.status(400).json({msg:"Invalid Product Id"})
    }
    try{

    const updatedProduct = await Product.findByIdAndUpdate(id,newProduct,{new:true})
    res.status(200).json({success:"true",data:updatedProduct})
    }catch(error){
        res.status(500).json({msg:"server error"})
    }

}

export {createProduct,updateProduct,deleteProduct,getProducts}