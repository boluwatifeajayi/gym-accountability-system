const express = require('express');
const router = express.Router();
const {
  createWorkout,
  getAllWorkouts,
  getWorkoutsBySearch,
  getInstructorWorkouts,
  getWorkoutById,
  getCategoryWorkouts,
  getUserAppliedWorkouts,
  applyToWorkout,
  commentToWorkout,
  deleteWorkout,
  updateWorkout,
  getWorkoutUsers,
  getCommentUsers,
  getUserCommentedWorkouts, // Add the new function here
} = require('../controllers/workoutController');

const { protect } = require('../middlewares/instructorMiddleware');
const { protectUser } = require('../middlewares/userMiddleware');

// routes
// create workout
router.post('/create', protect, createWorkout);

// get all workouts
router.get('/all', getAllWorkouts);

// search workouts
router.get('/search/:search', getWorkoutsBySearch);

// get instructor workouts
router.get('/instructor', protect, getInstructorWorkouts);

// get workout by id
router.get('/workout/:workoutId', getWorkoutById);

// get workouts by category
router.get('/category/:category', getCategoryWorkouts);

// get workouts applied by user
router.get('/applied', protectUser, getUserAppliedWorkouts);

// apply to workout
router.post('/:workoutid/apply', protectUser, applyToWorkout);

// comment on workout
router.post('/:workoutid/comment', protectUser, commentToWorkout);

// delete workout
router.delete('/delete/:workoutId', protect, deleteWorkout);

// update workout
router.put('/update/:workoutId', protect, updateWorkout);

// get users applied to workout
router.get('/:workoutId/applied', protect, getWorkoutUsers);

// get users commented on workout
router.get('/:workoutId/comments', protect, getCommentUsers);

// get workouts commented by user
router.get('/commented', protectUser, getUserCommentedWorkouts); // Add the new route here

module.exports = router;
