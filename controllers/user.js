const { response } = require('express');
const User = require('../models/user');

const userGet = async (req, res = response) => {
    try {
        const users = await User.find();
        res.status(200).json({ users });
      } catch (error) {
        res.status(500).json({ error: 'Error getting users' });
      }
}

const userPut = async (req, res = response) => {

  try {
    const userId = req.params.userId;
    const authenticatedUserId = req.userData.userId;

    
    if (userId !== authenticatedUserId) {
      res.status(403).json({ error: 'Not authorized' });
      return;
    }

    const { name, email, password } = req.body;

    const updates = {};
    if (name) {
      updates.name = name;
    }
    if (email) {
      updates.email = email;
    }
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      updates.password = hashedPassword;
    }

    const updatedUser = await User.findByIdAndUpdate(userId, updates, { new: true });

    res.status(200).json({ user: updatedUser });
  } catch (error) {
    res.status(500).json({ error: 'Error updating user' });
  }

}


const userRolePut = async (req, res = response) => {
    try {
        const userId = req.params.userId;
        const { role } = req.body;
    
        const user = await User.findById(userId);
        if (!user) {
          res.status(404).json({ error: 'User not found' });
          return;
        }
    
        user.role = role;
        await user.save();
    
        res.status(200).json({ message: 'Role updated successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Error updating role' });
    }
 
}


const userDelete = async (req, res = response) => {
    try {
        await User.findByIdAndDelete(req.params.userId);
        res.status(200).json({ message: 'User deleted successfully' });
      } catch (error) {
        res.status(500).json({ error: 'Error deleting user' });
      }
}

module.exports = {
    userGet,
    userPut,
    userRolePut,
    userDelete
}