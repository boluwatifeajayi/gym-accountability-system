const express = require('express');
const router = express.Router();
const {
  createGoal,
  deleteGoal,
  addTask,
  getAllGoals,
  getAnalytics,
} = require('../controllers/goalController');

const { protectUser } = require('../middlewares/userMiddleware');

// Create goal
router.post('/create', protectUser, createGoal);

// Delete goal
router.delete('/:goalId', protectUser, deleteGoal);

// Add task to a goal
router.post('/:goalId/tasks', protectUser, addTask);

// Get all goals
router.get('/', protectUser, getAllGoals);

// Get analytics
router.get('/analytics', protectUser, getAnalytics);

module.exports = router;
