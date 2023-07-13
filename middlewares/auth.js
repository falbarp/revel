const jwt = require('jsonwebtoken');

const authenticateUser = (req, res, next) => {
    try {
      const token = req.headers.authorization.split(' ')[1];
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
      req.userData = { userId: decodedToken.userId, role: decodedToken.role };
      next();
    } catch (error) {
      res.status(401).json({ error: 'Authentication failed' });
    }
  };

  const authorizeUser = (requiredRole) => (req, res, next) => {
    
    const user = req.userData; 

    if (user.role !== requiredRole) {
      res.status(403).json({ error: 'Not authorized' });
      return;
    }

    next();
  };  

module.exports = {
    authenticateUser,
    authorizeUser
}