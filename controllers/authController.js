const User = require("../models/user");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.signup = async (req, res) => {
   try {
      console.log(req.body);
      const { name, email, password, college_Id, type, stream, gradYear, occupation } = req.body;

      // Check if user already exists
      let user = await User.findOne({ college_email: email });
      if (user) {
         return res.status(400).json({ message: "User already exists" });
      }

      // Hash password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      // Create new user
      user = new User({
         name,
         college_email: email,
         college_Id,
         type,
         stream,
         gradYear,
         occupation,
         password: hashedPassword
      });
      await user.save();

      // Create JWT token
      const payload = { user: user.id };

      const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

      res.cookie('token', token, { httpOnly: true });
      res.redirect('/');
   } catch (error) {
      console.error(error);
      res.status(500).send("Internal server error");
   }
}

exports.login = async (req, res) => {
   try {
      const { email, password } = req.body;

      // Check if user exists
      let user = await User.findOne({ college_email: email });
      if (!user) {
         return res.status(400).json({ message: "Invalid credentials" });
      }

      // Compare password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
         return res.status(400).json({ message: "Invalid credentials" });
      }

      // Create JWT token
      const payload = { user: user.id };

      const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
      res.cookie('token', token, { httpOnly: true });
      res.redirect('/');
   } catch (error) {
      console.error(error);
      res.status(500).render('login', { title: 'Login', error: 'Server error' });
   }
}

exports.logout = async (req, res) => {
   try {
      // clear cookie token removal 
      res.cookie('token', '', { expires: new Date(0), httpOnly: true, secure: process.env.NODE_ENV === 'Production' });
      res.status(200).json({ message: "Logged out successfully" });
   } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal server error");
   }
};