const { response } = require('express');
const Product = require('../models/product');
const {
  productGet,
  productGetById,
  productPut,
  productPost,
  productDelete,
  productSearch
} = require('./product'); 


jest.mock('../models/product', () => ({
  find: jest.fn(),
  findById: jest.fn(),
  findOneAndUpdate: jest.fn(),
  findOneAndDelete: jest.fn(),
}));


const res = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn(),
};

describe('productGet', () => {
  it('should return all products', async () => {
   
    const mockProducts = [{ id: 1, name: 'Product 1' }, { id: 2, name: 'Product 2' }];
    Product.find.mockResolvedValueOnce(mockProducts);

    await productGet({}, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ products: mockProducts });
  });

  it('should handle error when getting products', async () => {
  
    Product.find.mockRejectedValueOnce(new Error('Database error'));

    await productGet({}, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: 'Error getting products' });
  });
});

describe('productGetById', () => {
  it('should return the product with the specified ID', async () => {
    const mockProduct = { id: 1, name: 'Product 1' };
    const mockReq = { params: { productId: 1 } };


    Product.findById.mockResolvedValueOnce(mockProduct);

    await productGetById(mockReq, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ product: mockProduct });
  });

  it('should return an error when the product is not found', async () => {
    const mockReq = { params: { productId: 1 } };

    
    Product.findById.mockResolvedValueOnce(null);

    await productGetById(mockReq, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: 'Product not found' });
  });

  it('should handle error when getting the product', async () => {
    const mockReq = { params: { productId: 1 } };

    Product.findById.mockRejectedValueOnce(new Error('Database error'));

    await productGetById(mockReq, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: 'Error getting product' });
  });
});

describe('productPut', () => {
  it('should update the product with the specified ID', async () => {
    const mockReq = {
      params: { productId: 1 },
      userData: { userId: 1 },
      body: { name: 'Updated Product', description: 'Updated description', category: 'Updated category', price: 9.99 },
    };

    Product.findOneAndUpdate.mockResolvedValueOnce(true);

    await productPut(mockReq, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ message: 'Product updated successfully' });
  });

  it('should return an error when the product is not found or not authorized', async () => {
    const mockReq = {
      params: { productId: 1 },
      userData: { userId: 1 },
      body: { name: 'Updated Product', description: 'Updated description', category: 'Updated category', price: 9.99 },
    };

    Product.findOneAndUpdate.mockResolvedValueOnce(null);

    await productPut(mockReq, res);

    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.json).toHaveBeenCalledWith({ error: 'Not authorized' });
  });

  it('should handle error when updating the product', async () => {
    const mockReq = {
      params: { productId: 1 },
      userData: { userId: 1 },
      body: { name: 'Updated Product', description: 'Updated description', category: 'Updated category', price: 9.99 },
    };

  
    Product.findOneAndUpdate.mockRejectedValueOnce(new Error('Database error'));

    await productPut(mockReq, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: 'Error updating product' });
  });
});


describe('productDelete', () => {
  it('should delete the product with the specified ID', async () => {
    const mockReq = {
      params: { productId: 1 },
      userData: { userId: 1 },
    };


 Product.findOneAndDelete.mockResolvedValueOnce(null);

 await productDelete(mockReq, res);

 expect(res.status).toHaveBeenCalledWith(403);
 expect(res.json).toHaveBeenCalledWith({ error: 'Not authorized' });
});

it('should handle error when deleting the product', async () => {
 const mockReq = {
   params: { productId: 1 },
   userData: { userId: 1 },
 };


 Product.findOneAndDelete.mockRejectedValueOnce(new Error('Database error'));

 await productDelete(mockReq, res);

 expect(res.status).toHaveBeenCalledWith(500);
 expect(res.json).toHaveBeenCalledWith({ error: 'Error deleting product' });
});
});

describe('productSearch', () => {
it('should return products matching the search criteria', async () => {
 const mockReq = { query: { name: 'Product', description: 'Description', category: 'Category', price: 10 } };


 const mockProducts = [{ id: 1, name: 'Product 1' }, { id: 2, name: 'Product 2' }];
 Product.find.mockResolvedValueOnce(mockProducts);

 await productSearch(mockReq, res);

 expect(res.status).toHaveBeenCalledWith(200);
 expect(res.json).toHaveBeenCalledWith({ products: mockProducts });
});

it('should handle error when getting the products', async () => {
 const mockReq = { query: { name: 'Product', description: 'Description', category: 'Category', price: 10 } };


 Product.find.mockRejectedValueOnce(new Error('Database error'));

 await productSearch(mockReq, res);

 expect(res.status).toHaveBeenCalledWith(500);
 expect(res.json).toHaveBeenCalledWith({ error: 'Error getting products' });
});
});