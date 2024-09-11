const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema(
   {
      title: {
         type: String,
         required: true,
         trim: true
      },
      description: {
         type: String,
         required: true
      },
      company: {
         type: String,
         required: true
      },
      location: {
         type: String,
         required: true
      },
      postedBy: {
         type: mongoose.Schema.Types.ObjectId,
         ref: 'User',
         required: true
      },
      applyLink: {
         type: String,
         required: true
      },
      postedAt: {
         type: Date,
         default: Date.now
      }
   },
   { timestamps: true }
);

module.exports = mongoose.model('JobPosting', jobSchema);
