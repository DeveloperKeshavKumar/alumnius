const User = require('../models/user');

exports.getUserProfile = async (req, res) => {
   try {
      const user = await User.findById(req.params.id).select('-password -connections -jobpostings');
      if (!user) return res.status(404).render('error', { message: 'User not found' });
      res.render('profile', { user });
   } catch (error) {
      console.error(error.message);
      res.status(500).render('error', { message: 'Server Error' });
   }
};

exports.getAllAlumnis = async (req, res) => {
   try {
      const alumnis = await User.find({ type: 'Alumni' }).select('-password -connections -jobpostings -successstories -college_Id -college_email -createdAt -updatedAt');
      res.render('alumnis', { title: 'Alumni Directory', alumnis });
   } catch (error) {
      res.status(500).send('Server Error');
   }
};

exports.getAlumniById = async (req, res) => {
   try {
      const alumni = await User.findById(req.params.id).select('-password -connections -jobpostings -college_email');
      if (!alumni) return res.status(404).json({ message: 'Alumni not found' });
      res.render('alumni', { alumni });
   } catch (error) {
      res.status(500).send('Server Error');
   }
};

exports.connectWithAlumni = async (req, res) => {
   try {
      const userId = req.user;
      const alumniId = req.params.id;

      if (userId === alumniId) return res.status(400).json({ message: 'You cannot connect with yourself' });

      const user = await User.findById(userId);
      const alumni = await User.findById(alumniId);

      if (!alumni) return res.status(404).json({ message: 'Alumni not found' });

      if (user.connections.includes(alumniId)) return res.status(400).json({ message: 'Already connected' });

      user.connections.push(alumniId);
      alumni.connections.push(userId);

      await user.save();
      await alumni.save();

      res.status(200).json({ message: 'Connected successfully' });
   } catch (error) {
      res.status(500).send('Server Error');
   }
};

exports.removeConnection = async (req, res) => {
   try {
      const userId = req.user;
      const alumniId = req.params.id || req.body.connectionId;

      const user = await User.findById(userId);
      const alumni = await User.findById(alumniId);

      if (!alumni) return res.status(404).json({ message: 'Alumni not found' });

      if (!user.connections.includes(alumniId)) return res.status(400).json({ message: 'Not connected' });

      user.connections = user.connections.filter(id => id.toString() !== alumniId);
      alumni.connections = alumni.connections.filter(id => id.toString() !== userId);

      await user.save();
      await alumni.save();

      res.status(200).json({ message: 'Disconnected successfully' });
   } catch (error) {
      res.status(500).send('Server Error');
   }
};
