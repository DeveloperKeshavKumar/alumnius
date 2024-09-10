const jwt = require('jsonwebtoken');
const User = require('../models/user');

exports.authMiddleware = async (req, res, next) => {
   const token = req.header('Authorization').replace("Bearer ", "");
   if (!token) {
      return res.status(401).json({ message: 'No token, authorization denied' });
   }

   try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded.user;

      const user = await User.findById(req.user);
      if (!user) {
         return res.status(401).json({ message: 'User no longer exists' });
      }

      next();
   } catch (error) {
      console.error('Token is not valid:', error.message);
      res.status(401).json({ message: 'Token is not valid' });
   }
};

exports.isAlumni = async (req, res, next) => {
   try {
      const userId = req.user;
      const user = await User.findById(userId);

      if (!user) return res.status(404).json({ message: 'User not found' });

      if (user.type === 'Alumni') {
         next();
      } else {
         res.status(403).json({ message: 'Access denied. Alumni only' });
      }
   } catch (error) {
      res.status(500).send('Server Error');
   }
};
