const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: [true, 'Name is requiered'] 
    },
  email: { 
    type: String, 
    required: [true, 'Email is requiered'],
    unique: true
    },
  password: { 
    type: String, 
    required: [true, 'Password is requiered'] 
    },
  role: { 
    type: String, 
    enum: ['user', 'admin'], 
    default: 'user' }
});


// Remove password and version when returning user
userSchema.methods.toJSON = function() {
  const { __v, password, ...user } = this.toObject();
  return user;
}

module.exports = mongoose.model('User', userSchema);

