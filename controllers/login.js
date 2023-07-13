const { response } = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

const loginPost = async (req, res = response) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
          res.status(401).json({ error: 'Incorrect credentials' });
          return;
        }
        const isPasswordValid = await bcrypt.compareSync(password, user.password);
        if (!isPasswordValid) {
          res.status(401).json({ error: 'Incorrect credentials' });
          return;
        }
        const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET);
        res.status(200).json({ token });
      } catch (error) {
        res.status(500).json({ error: 'Error logging in' });
      } 
}

module.exports = {
    loginPost
}