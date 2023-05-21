const express = require('express');
const router = express.Router();
const {
  createDiet,
  getAllDiets,
  getDietsBySearch,
  getInstructorDiets,
  getDietById,
  getCategoryDiets,
  getUserAppliedDiets,
  applyToDiet,
  commentToDiet,
  deleteDiet,
  updateDiet,
  getDietUsers,
  getCommentUsers,
  getUserCommentedDiets, // Add the new function here
} = require('../controllers/dietController');

const { protect } = require('../middlewares/instructorMiddleware');
const { protectUser } = require('../middlewares/userMiddleware');

// routes
// create diet
router.post('/create', protect, createDiet);

// get all diets
router.get('/all', getAllDiets);

// search diets
router.get('/search/:search', getDietsBySearch);

// get instructor diets
router.get('/instructor', protect, getInstructorDiets);

// get diet by id
router.get('/diet/:dietId', getDietById);

// get diets by category
router.get('/category/:category', getCategoryDiets);

// get diets applied by user
router.get('/applied', protectUser, getUserAppliedDiets);

// apply to diet
router.post('/:dietid/apply', protectUser, applyToDiet);

// comment on diet
router.post('/:dietid/comment', protectUser, commentToDiet);

// delete diet
router.delete('/delete/:dietId', protect, deleteDiet);

// update diet
router.put('/update/:dietId', protect, updateDiet);

// get users applied to diet
router.get('/:dietId/applied', protect, getDietUsers);

// get users commented on diet
router.get('/:dietId/comments', protect, getCommentUsers);

// get diets commented by user
router.get('/commented', protectUser, getUserCommentedDiets); // Add the new route here

module.exports = router;
