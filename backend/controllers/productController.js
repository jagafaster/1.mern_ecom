// import {v2 as cloudinary } from "../config/cloudinary.js";
import { json } from "express";
import cloudinary from "../config/cloudinary.js";
import productModel from "../models/productModel.js";

// function for add product

const addProduct = async (req, res) => {
    try {

        // const { name, description, price, bestSeller, category, subCategory, sizes } = req.body
        const { name, description, price, category, subCategory, sizes } = req.body
        const bestSeller = req.body.bestSeller === "true"; // Convert to boolean

        const image1 = req.files?.image1?.[0]?.path;
        const image2 = req.files?.image2?.[0]?.path;
        const image3 = req.files?.image3?.[0]?.path;
        const image4 = req.files?.image4?.[0]?.path;

        const images = [image1, image2, image3, image4].filter((item) => item !== undefined);

        let imagesUrl = await Promise.all(
            images.map(async (item) => {
                let result = await cloudinary.uploader.upload(item, { resourse_type: "image" });
                return result.secure_url;
            })
        )

        const productData = {
            name,
            description,
            category,
            price: Number(price),
            subCategory,
            bestSeller,
            sizes: JSON.parse(sizes),
            image: imagesUrl,
            date: Date.now()
        }

        console.log(productData);

        const product = new productModel(productData);
        await product.save();

        res.json({success: true, message: "Product added successfully"})
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}

// function for list product

const listProduct = async (req, res) => { 
    try {
        const products = await productModel.find({});
        res.json({success: true, products});
        
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

// function for remove product

const removeProduct = async (req, res) => {

    try {
        await productModel.findByIdAndDelete(req.body.id);
        res.json({success: true, message: "Product removed successfully"});

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }

}

// function for single product info

const singleProduct = async (req, res) => {

    try {
        const {productId} = req.body;
        const product = await productModel.findById(productId);
        res.json({success: true, product});
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
 }


export { listProduct, addProduct, removeProduct, singleProduct }