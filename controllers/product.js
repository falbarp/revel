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
      const productId = req.params.productId;
      const createdBy = req.userData.userId;
      const { name, description, category, price } = req.body;
  
      const product = await Product.findOneAndUpdate({ _id: productId, createdBy: createdBy }, { name, description, category, price });
      if (!product) {
        res.status(403).json({ error: 'Not authorized' });
        return;
      }
  
      res.status(200).json({ message: 'Product updated successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Error updating product' });
    }
}

const productPost = async (req, res = response) => {
    try {
        const { name, description, category, price } = req.body;
        const createdBy = req.userData.userId;

        const product = new Product({ name, description, category, price, createdBy });
        await product.save();

        res.status(201).json({ message: 'Product created successfully', product });
      } catch (error) {
        res.status(500).json({ error: 'Error creating product' });
      }
}

const productDelete = async (req, res = response) => {
  try {
    const productId = req.params.productId;
    const createdBy = req.userData.userId;

    const product = await Product.findOneAndDelete({ _id: productId, createdBy: createdBy });
    if (!product) {
      res.status(403).json({ error: 'Not authorized' });
      return;
    }

    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting product' });
  }
}

const productSearch = async (req, res = response) => {

  try {
    const { name, description, category, price } = req.query;
    const query = {};

    if (name) {
      query.name = { $regex: name, $options: 'i' };
    }

    if (description) {
      query.description = { $regex: description, $options: 'i' };
    }

    if (category) {
      query.category = category;
    }

    if (price) {
      query.price = { $lte: price };
    }

    const products = await Product.find(query);
    res.status(200).json({ products });
  } catch (error) {
    res.status(500).json({ error: 'Error getting products' });
  }

}

module.exports = {
    productGet,
    productGetById,
    productPut,
    productPost,
    productDelete,
    productSearch
}