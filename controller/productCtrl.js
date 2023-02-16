const Product = require('../models/productModel')
const asyncHandler = require('express-async-handler')
const slugify = require("slugify")

const createProduct = asyncHandler(async (req,res)=>{
    try{
        if(req.body.title){
            req.body.slug = slugify(req.body.title)
        }
        const newProduct = await Product.create(req.body)
        res.json(newProduct);
    }catch(error){
        throw new Error(error);
    }
});


const updateProduct = asyncHandler(async (req,res)=>{
    const {id} = req.params;
    try{
        if(req.body.title){
            req.body.slug = slugify(req.body.title)
        }
        const updatedProduct = await Product.findByIdAndUpdate(id,req.body,{
            new:true,
        });
        res.json(updatedProduct);
    }catch(error){
        throw new Error(error);
    }
});

const deleteProduct = asyncHandler(async (req,res)=>{
    const {id} = req.params;
    try{
        const deletedProduct = await Product.findByIdAndDelete(id);
        res.json(deletedProduct);
    }catch(error){
        throw new Error(error);
    }
});


const getProduct = asyncHandler(async (req,res)=>{
    const {id} = req.params;
    try{
        const findProduct = await Product.findById(id)
        res.json(findProduct!=null?findProduct:"Product Not Found")
    }catch(error){
        throw new Error(error)
    }
})

const getAllProduct = asyncHandler(async (req,res)=>{
    try{
        const allProducts = await Product.find();
        res.json(allProducts);
    }catch(error){
        throw new Error(error);
    }
});

module.exports = {
    createProduct,
    getProduct,
    getAllProduct,
    updateProduct,
    deleteProduct,
}