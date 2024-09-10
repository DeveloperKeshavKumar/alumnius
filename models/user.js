const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
   {
      name: {
         type: String,
         required: true,
         trim: true
      },
      college_email: {
         type: String,
         required: true,
         unique: true,
         trim: true
      },
      password: {
         type: String,
         required: true
      },
      college_Id: {
         type: String,
         required: true,
         unique: true
      },
      stream: {
         type: String,
         enum: ['CSE', 'ME', 'ECE', 'CE', 'EE', 'AI/ML'],
         required: true
      },
      type: {
         type: String,
         enum: ['Current', 'Alumni'],
         default: 'Current',
         required: true
      },
      linkedinProfile: {
         type: String,
         default: null
      },
      gradYear: {
         type: Number,
         required: true
      },
      occupation: {
         type: String,
         default: 'Unemployed'
      },
      connections: [{
         type: mongoose.Schema.Types.ObjectId,
         ref: 'User'
      }],
      jobpostings: [{
         type: mongoose.Schema.Types.ObjectId,
         ref: 'JobPosting'
      }],
      successstories: [{
         type: mongoose.Schema.Types.ObjectId,
         ref: 'SuccessStory'
      }]
   },
   { timestamps: true }
);

module.exports = mongoose.model('User', userSchema);