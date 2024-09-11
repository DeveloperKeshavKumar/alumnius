const Event = require('../models/event');

exports.createEvent = async (req, res) => {
   try {
      const { title, description, location, date, time } = req.body;
      const newEvent = new Event({
         title,
         description,
         location,
         date,
         time,
         type,
         host: req.user
      });
      const savedEvent = await newEvent.save();
      res.status(201).redirect('/api/v1/events');
   } catch (error) {
      res.status(500).send('Server Error');
   }
};

exports.getEvents = async (req, res) => {
   try {
      const userLoggedIn = req.cookies.token ? true : false;
      const events = await Event.find().populate('host', 'name');
      res.status(200).render('events', { events, userLoggedIn });
   } catch (error) {
      res.status(500).send('Server Error');
   }
};

exports.getEventById = async (req, res) => {
   try {
      const event = await Event.findById(req.params.id).populate('author', 'name college_email');
      if (!event) return res.status(404).json({ message: 'Event not found' });
      res.status(200).render('event', { event });
   } catch (error) {
      res.status(500).send('Server Error');
   }
};

exports.updateEvent = async (req, res) => {
   try {
      const { title, description, location, date, time, type } = req.body;

      const event = await Event.findById(req.params.id);
      if (!event) return res.status(404).json({ message: 'Event not found' });

      event.title = title || event.title;
      event.description = description || event.description;
      event.location = location || event.location;
      event.date = date || event.date;
      event.time = time || event.time;
      event.type = type || event.type;

      const updatedEvent = await event.save();
      res.status(200).json(updatedEvent);
   } catch (error) {
      res.status(500).send('Server Error');
   }
};

exports.deleteEvent = async (req, res) => {
   try {
      const event = await Event.findByIdAndDelete(req.params.id);
      if (!event) return res.status(404).json({ message: 'Event not found' });
      res.status(200).json({ message: 'Event deleted successfully' });
   } catch (error) {
      res.status(500).send('Server Error');
   }
};
