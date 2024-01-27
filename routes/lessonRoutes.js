// // routes/lessonRoutes.js
// const express = require('express');
// const router = express.Router();
// const Lesson = require('../models/lessonModel');

// // Define your routes for CRUD operations here

// module.exports = router;


// routes/lessonRoutes.js
const express = require('express');
const router = express.Router();
const Lesson = require('../models/lessonModel');

// Get all lessons
router.get('/', async (req, res) => {
  try {
    const lessons = await Lesson.find();
    res.json(lessons);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get a specific lesson by ID
router.get('/:id', async (req, res) => {
  try {
    const lesson = await Lesson.findById(req.params.id);
    res.json(lesson);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a new lesson
router.post('/', async (req, res) => {
  const lesson = new Lesson(req.body);
  try {
    const newLesson = await lesson.save();
    res.status(201).json(newLesson);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update a lesson by ID
router.patch('/:id', async (req, res) => {
  try {
    const updatedLesson = await Lesson.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedLesson);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a lesson by ID
router.delete('/:id', async (req, res) => {
  try {
    await Lesson.findByIdAndDelete(req.params.id);
    res.json({ message: 'Lesson deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
