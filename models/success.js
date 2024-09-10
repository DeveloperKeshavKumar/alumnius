const mongoose = require('mongoose');

const successSchema = new mongoose.Schema(
   {
      title: {
         type: String,
         required: true,
         trim: true
      },
      content: {
         type: String,
         required: true
      },
      author: {
         type: mongoose.Schema.Types.ObjectId,
         ref: 'User',
         required: true
      },
      imageUrl: {
         type: String,
         default: null
      },
      publishedAt: {
         type: Date,
         default: Date.now
      }
   },
   { timestamps: true }
);

module.exports = mongoose.model('JobPosting', successSchema);