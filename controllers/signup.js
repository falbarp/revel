const { response } = require('express');

const signupPost = async(req, res = response) => {
    try {
        const { name, email, password } = req.body;
        const hashedPassword = await bcrypt.hashSync(password, 10);
        const user = new User({ name, email, password: hashedPassword });
        await user.save();
        res.status(201).json({ message: 'User created successfully' });
      } catch (error) {
        res.status(500).json({ error: 'Error creating user' });
      }
}

module.exports = {
    signupPost
}