const { response } = require('express');
const Product = require('../models/product');

const productGet = async (req, res = response) => {
    try {
        const products = await Product.find();
        res.status(200).json({ products });
      } catch (error) {
        res.status(500).json({ error: 'Error getting products' });
      }
}

const productGetById = async (req, res = response) => {
  try {
    const product = await Product.findById(req.params.productId);
    if (!product) {
      res.status(404).json({ error: 'Product not found' });
      return;
    }
    res.status(200).json({ product });
  } catch (error) {
    res.status(500).json({ error: 'Error getting product' });
  }
}

const productPut = async (req, res = response) => {
    try {
        const { name, description, category, price } = req.body;
        const updatedProduct = await Product.findByIdAndUpdate(
          req.params.productId,
          { name, description, category, price },
          { new: true }
        );
        if (!updatedProduct) {
          res.status(404).json({ error: 'Product not found' });
          return;
        }
        res.status(200).json({ message: 'Product updated successfully', product: updatedProduct });
      } catch (error) {
        res.status(500).json({ error: 'Error updating product' });
      }
}

const productPost = async (req, res = response) => {
    try {
        const { name, description, category, price } = req.body;
        const product = new Product({ name, description, category, price });
        await product.save();
        res.status(201).json({ message: 'Product created successfully', product });
      } catch (error) {
        res.status(500).json({ error: 'Error creating product' });
      }
}

const productDelete = async (req, res = response) => {
    try {
        const deletedProduct = await Product.findByIdAndDelete(req.params.productId);
        if (!deletedProduct) {
          res.status(404).json({ error: 'Product not found' });
          return;
        }
        res.status(200).json({ message: 'Product deleted successfully' });
      } catch (error) {
        res.status(500).json({ error: 'Error deleting product' });
      }
}

module.exports = {
    productGet,
    productGetById,
    productPut,
    productPost,
    productDelete
}