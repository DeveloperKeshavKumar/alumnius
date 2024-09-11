const JobPosting = require('../models/jobs');
const User = require('../models/user');

exports.createJobPosting = async (req, res) => {
   try {
      const { title, description, company, location, applyLink } = req.body;
      const postedBy = req.user;
      const newJobPosting = new JobPosting({ title, description, company, location, applyLink, postedBy });

      const savedJobPosting = await newJobPosting.save();
      await User.findByIdAndUpdate(
         req.user,
         { $push: { jobpostings: savedJobPosting._id } },
         { new: true }
      );
      res.status(201).redirect('/api/v1/jobs');
   } catch (error) {
      console.error(error.message);
      res.status(500).json({ message: "Server error" });
   }
};

exports.getAllJobPostings = async (req, res) => {
   try {
      const userLoggedIn = req.cookies.token ? true : false;
      const jobs = await JobPosting.find().populate('postedBy', 'name');
      res.status(200).render('jobs', { jobs, userLoggedIn });
   } catch (error) {
      console.error(error.message);
      res.status(500).json({ message: "Server error" });
   }
};

exports.getJobPostingById = async (req, res) => {
   try {
      const job = await JobPosting.findById(req.params.id).populate('postedBy', 'name college_email');
      if (!job) {
         return res.status(404).json({ message: "Job posting not found" });
      }
      res.status(200).render('job', { job });
   } catch (error) {
      console.error(error.message);
      res.status(500).json({ message: "Server error" });
   }
};

exports.updateJobPosting = async (req, res) => {
   try {
      const { title, description, company, location, applyLink } = req.body;
      const updatedPosting = await JobPosting.findByIdAndUpdate(
         req.params.id,
         { title, description, company, location, applyLink },
         { new: true }
      );

      if (!updatedPosting) {
         return res.status(404).json({ message: "Job posting not found" });
      }

      res.status(200).json({ message: "Job posting updated successfully", job: updatedPosting });
   } catch (error) {
      console.error(error.message);
      res.status(500).json({ message: "Server error" });
   }
};

exports.deleteJobPosting = async (req, res) => {
   try {
      const job = await JobPosting.findByIdAndDelete(req.params.id);

      if (!job) {
         return res.status(404).json({ message: "Job posting not found" });
      }

      await User.findByIdAndUpdate(
         req.user,
         { $pull: { jobpostings: job._id } },
         { new: true }
      );

      res.status(200).json({ message: "Job posting deleted successfully" });
   } catch (error) {
      console.error(error.message);
      res.status(500).json({ message: "Server error" });
   }
};
