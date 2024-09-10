const JobPosting = require('../models/jobs');

exports.createJobPosting = async (req, res) => {
   try {
      const { title, description, company, location, applyLink } = req.body;
      const postedBy = req.user;
      const newJobPosting = new JobPosting({ title, description, company, location, applyLink, postedBy });

      const savedJobPosting = await newJobPosting.save();
      res.status(201).json({ message: "Job posting created successfully", jobPosting: savedJobPosting });
   } catch (error) {
      console.error(error.message);
      res.status(500).json({ message: "Server error" });
   }
};

exports.getAllJobPostings = async (req, res) => {
   try {
      const jobPostings = await JobPosting.find().populate('postedBy', 'name');
      res.status(200).json(jobPostings);
   } catch (error) {
      console.error(error.message);
      res.status(500).json({ message: "Server error" });
   }
};

exports.getJobPostingById = async (req, res) => {
   try {
      const jobPosting = await JobPosting.findById(req.params.id).populate('postedBy', 'name college_email');
      if (!jobPosting) {
         return res.status(404).json({ message: "Job posting not found" });
      }
      res.status(200).json(jobPosting);
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

      res.status(200).json({ message: "Job posting updated successfully", jobPosting: updatedPosting });
   } catch (error) {
      console.error(error.message);
      res.status(500).json({ message: "Server error" });
   }
};

exports.deleteJobPosting = async (req, res) => {
   try {
      const jobPosting = await JobPosting.findByIdAndDelete(req.params.id);

      if (!jobPosting) {
         return res.status(404).json({ message: "Job posting not found" });
      }

      res.status(200).json({ message: "Job posting deleted successfully" });
   } catch (error) {
      console.error(error.message);
      res.status(500).json({ message: "Server error" });
   }
};
