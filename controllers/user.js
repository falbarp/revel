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

const userPut = (req, res = response) => {
    res.json({
        msg: 'put API - controller'
    });
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
    userDelete
}