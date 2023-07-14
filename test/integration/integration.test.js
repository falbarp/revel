const request = require('supertest');
const app = require('../../models/server'); // Assuming your app file is named 'app.js'
const jwt = require('jsonwebtoken');

const mockedProducts = [
  { id: 1, name: 'Product 1', price: 10.99 },
  { id: 2, name: 'Product 2', price: 19.99 },

];


describe('Integration Tests', () => {
  it('should create a new user', async () => {
    const newUser = {
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: 'password123'
    };

    const token = jwt.sign({ userId: '123' }, process.env.JWT_SECRET);

    const response = await request(app)
      .post('/api/users')
      .set('Authorization', `Bearer ${token}`) 
      .send(newUser);

    expect(response.status).toBe(201);
    expect(response.body).toEqual(expect.objectContaining({
      id: expect.any(String),
      name: newUser.name,
      email: newUser.email
    }));
  });

  it('should retrieve a list of products', async () => {
    const response = await request(app)
      .get('/api/products');

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockedProducts);
  });

  it('should update a specific product', async () => {
    const updatedProduct = {
      name: 'Updated Product',
      price: 19.99
    };

    const response = await request(app)
      .put('/api/products/123') 
      .send(updatedProduct);

    expect(response.status).toBe(200);
    expect(response.body).toEqual(expect.objectContaining(updatedProduct));
  });

  it('should delete a specific product', async () => {
    const response = await request(app)
      .delete('/api/products/123'); 

    expect(response.status).toBe(204);
  });
});
