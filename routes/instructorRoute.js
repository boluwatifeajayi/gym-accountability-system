const express = require('express');
const router = express.Router();
const {
  registerInstructor,
  loginInstructor,
  getInstructor,
  updateInstructor,
  getInstructors,
  getInstructorById,
} = require('../controllers/instructorController');

const { protect } = require('../middlewares/instructorMiddleware');

router.post('/register', registerInstructor);
router.post('/login', loginInstructor);
router.get('/instructor', protect, getInstructor);
router.put('/instructor/update', protect, updateInstructor);
router.get('/instructors', getInstructors); // Route to get all instructors
router.get('/instructor/:id', getInstructorById); // Route to get instructor by ID

module.exports = router;
