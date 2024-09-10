const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
   title: {
      type: String,
      required: true
   },
   description: {
      type: String,
      required: true
   },
   location: {
      type: String,
      required: true
   },
   date: {
      type: Date,
      required: true
   },
   time: {
      type: String,
      required: true
   },
   type: {
      type: String,
      enum: ['Online', 'Offline'],
      required: true
   },
   host: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
   },
   createdAt: {
      type: Date,
      default: Date.now
   }
});

module.exports = mongoose.model('Event', eventSchema);
