const User = require('../models/user');
const Product = require('../models/product');

const seedPost = async (req, res) => {
    try {
      if (process.env.NODE_ENV !== 'development') {
        res.status(403).json({ error: 'This function is only available in development environment' });
        return;
      }

      await User.deleteMany({});
      await Product.deleteMany({});

   
      const users = [
        { name: 'John Doe', email: 'john@example.com', password: 'password123', role: 'user' },
        { name: 'Jane Smith', email: 'jane@example.com', password: 'password456', role: 'admin' },
      ];

     
      const insertedUsers = await User.insertMany(users);

      const userIds = insertedUsers.map(user => user._id);

      const products = [
        { name: 'Product 1', description: 'Lorem ipsum dolor sit amet 1', category: 'Category 1', price: 10.99, createdBy: userIds[0] },
        { name: 'Product 2', description: 'Lorem ipsum dolor sit amet 2', category: 'Category 2', price: 19.99, createdBy: userIds[1] },
        { name: 'Product 3', description: 'Lorem ipsum dolor sit amet 3', category: 'Category 3', price: 29.99, createdBy: userIds[0] },
      ];

      const insertedProducts = await Product.insertMany(products);

      if (insertedProducts) {
        res.status(200).json({ message: 'Example data inserted successfully', users:insertedUsers, products: insertedProducts });
      } else {
          res.status(500).json({ error: 'Error inserting example products' });
        }
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Error inserting example data' });
    }
  }


module.exports = {
    seedPost
}
