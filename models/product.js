const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: [true, 'Name is requiered']
    },
  description: { 
    type: String, 
    required: [true, 'Description is requiered'] 
    },
  category: { 
    type: String, 
    required: [true, 'Category is requiered']
    },
  price: { 
    type: Number, 
    required: [true, 'Price is requiered']},
});

module.exports = mongoose.model('Product', productSchema);
