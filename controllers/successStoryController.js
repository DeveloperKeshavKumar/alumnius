const path = require('path');
const SuccessStory = require('../models/success');
const User = require('../models/user');

exports.createSuccessStory = async (req, res) => {

   try {
      const { title, description, imageUrl } = req.body;

      if (req.files && req.files.image) {
         const image = req.files.image;
         const uploadPath = path.join(__dirname, '../uploads/', image.name);
         await image.mv(uploadPath);

         imageUrl = `/uploads/${image.name}`;
      }

      const newSuccessStory = new SuccessStory({
         title,
         content: description,
         author: req.user,
         imageUrl
      });

      const savedStory = await newSuccessStory.save();
      await User.findByIdAndUpdate(
         req.user,
         { $push: { successstories: savedStory._id } },
         { new: true }
      );
      res.status(201).json(savedStory);
   } catch (error) {
      console.error(error);
      res.status(500).send("Server Error");
   }
};

exports.getAllSuccessStories = async (req, res) => {
   try {
      const userLoggedIn = req.cookies.token ? true : false;
      const stories = await SuccessStory.find();
      res.status(200).render('stories', { stories, userLoggedIn });
   } catch (error) {
      console.error(error.message);
      res.status(500).send("Server Error");
   }
};

exports.getSuccessStoryById = async (req, res) => {
   try {
      const story = await SuccessStory.findById(req.params.id);

      if (!story) {
         return res.status(404).json({ message: "Success story not found" });
      }

      res.status(200).render('story', { story });
   } catch (error) {
      console.error(error.message);
      res.status(500).send("Server Error");
   }
};

exports.updateSuccessStory = async (req, res) => {
   const { title, description, imageUrl } = req.body;

   try {
      let story = await SuccessStory.findById(req.params.id);

      if (!story) {
         return res.status(404).json({ message: "Success story not found" });
      }

      story.title = title || story.title;
      story.description = description || story.description;
      // if (req.files && req.files.image) {
      //    const image = req.files.image;
      //    const uploadPath = path.join(__dirname, '../uploads/', image.name);
      //    await image.mv(uploadPath);

      // }
      story.imageUrl = imageUrl || story.imageUrl;

      const updatedStory = await story.save();
      res.status(200).json(updatedStory);
   } catch (error) {
      console.error(error.message);
      res.status(500).send("Server Error");
   }
};

exports.deleteSuccessStory = async (req, res) => {
   try {
      const story = await SuccessStory.findById(req.params.id);

      if (!story) {
         return res.status(404).json({ message: "Success story not found" });
      }

      await User.findByIdAndUpdate(
         req.user,
         { $pull: { successstories: story._id } },
         { new: true }
      );
      await story.deleteOne();
      res.status(200).json({ message: "Success story deleted" });
   } catch (error) {
      console.error(error.message);
      res.status(500).send("Server Error");
   }
};
