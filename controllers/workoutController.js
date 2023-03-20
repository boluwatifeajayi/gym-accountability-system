const workoutModel = require("../models/Workout");
const instructorModel = require("../models/Instructor");
const userModel = require("../models/User");


const createWorkout = async (req, res) => {
  try {
    const { instructorId } = res.locals.decoded;
    if (!instructorId) {
      return res.status(400).json({
        error: "Ensure you are a registered instructor to access this route",
      });
    }
    
    const currentInstructor = await instructorModel.findById(instructorId);
    const { _id: insId, instructorFirstname, instructorLastname, instructorEmail, instructorBio } = currentInstructor
    
    const newWorkout = await workoutModel.create({
		...req.body,
      theInstructor: {
		insId, instructorFirstname, instructorLastname, instructorEmail, instructorBio
      },
    });

    return res.status(201).json(newWorkout);
  } catch (error) {
    console.error(error);
    if (error.code === 11000) {
      return res.status(400).json({ error: "Workout already exists" });
    }
    return res.status(400).json({ error: error.message });
  }
};


const getAllWorkouts = async (req, res) => {
  try {
    const allWorkouts = await workoutModel.find().sort({ updatedAt: -1 });
    res.status(200).json(allWorkouts);
  } catch (error) {
    res.status(404).json({ error: "No workouts available" });
  }
};

const getWorkoutsBySearch = async (req, res) => {
  try {
    const { search } = req.query;
    let searchedWorkouts;
  
      searchedWorkouts = await workoutModel
        .find({
          $or: [
            { workoutName: { $regex: search, $options: "i" } },
            { category: { $regex: search, $options: "i" } },
            { tags: { $regex: search, $options: "i" } },
          ],
        })
        .sort({ updatedAt: -1 });
    
    res.status(200).json(searchedWorkouts);
  } catch (error) {
    res.status(404).json({ error: "No Internships available" });
  }
};



const getInstructorWorkouts = async (req, res) => {
  try {
    const { instructorId } = res.locals.decoded;
    if (instructorId == null)
      return res.status(400).json({
        error: "Ensure you are a registered instructor to access this route",
      });
    const currentInstructor = await instructorModel.findById(instructorId);
    const workoutsForInstructor = await workoutModel
      .find({ "theInstructor.insId": instructorId })
      .sort({ updatedAt: -1 });
    res.status(200).json(workoutsForInstructor);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};




const getWorkoutById = async (req, res) => {
  try {
    const { workoutId } = req.params;
    const currentWorkout = await workoutModel.findById(workoutId);
    res.status(200).json(currentWorkout);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const getCategoryWorkouts = async (req, res) => {
  try {
    const { category } = req.params;
    const currentWorkout = await workoutModel
      .find({ category } )
      .sort({ updatedAt: -1 });
    res.status(200).json(currentWorkout);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const getUserAppliedWorkouts = async (req, res) => {
  try {
    const { userId } = res.locals.decoded;
    if (userId == null)
      return res.status(400).json({
        error: "Ensure you are a registered user to access this route",
      });
    const appliedWorkouts = await workoutModel.find({ "theUsers.userId": userId });
    res.status(200).json(appliedWorkouts);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};



const applyToWorkout = async (req, res) => {
  try {
    const { userId } = res.locals.decoded;
    if (userId == null)
      return res
        .status(400)
        .json({ error: "Ensure you are a user to access this route" });
    const { joining, score } = req.body;
    const { workoutid } = req.params;
    const appliedAt = Date.now();
    const getUser = await userModel.findById(userId);
    const newWorkoutApplication = await workoutModel.findByIdAndUpdate(
      workoutid,
      {
        $push: {
          theUsers: {  userId, joining, score, appliedAt},
        },
      },
      { new: true }
    );

    res.status(201).json(newWorkoutApplication);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};



const commentToWorkout = async (req, res) => {
  try {
    const { userId } = res.locals.decoded;
    if (userId == null)
      return res
        .status(400)
        .json({ error: "Ensure you are a user to access this route" });
    const { comments } = req.body;
    const { workoutid } = req.params;
    const appliedAt = Date.now();
    const getUser = await userModel.findById(userId);
    const newWorkoutComment = await workoutModel.findByIdAndUpdate(
      workoutid,
      {
        $push: {
          userComments: {  userId, comments, appliedAt},
        },
      },
      { new: true }
    );

    res.status(201).json(newWorkoutComment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


const deleteWorkout = async (req, res) => {
  try {
    const { workoutId } = req.params;
    const workoutToDelete = await workoutModel.findById(workoutId);
    if (!workoutToDelete) {
      return res.status(404).json({ error: "Workout not found" });
    }
    await workoutModel.deleteOne({ _id: workoutId });
    res.status(200).json({ message: "Workout deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateWorkout = async (req, res) => {
  try {
    const { workoutId } = req.params;
    const workoutToUpdate = await workoutModel.findById(workoutId);
    if (!workoutToUpdate) {
      return res.status(404).json({ error: "Workout not found" });
    }
    const updatedWorkout = await workoutModel.findByIdAndUpdate(
      workoutId,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedWorkout);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


const getWorkoutUsers = async (req, res) => {
  try {
    const { workoutId } = req.params;
    const currentWorkout = await workoutModel.findById(workoutId);
    const usersForWorkout = currentWorkout.theUsers;
    res.status(200).json(usersForWorkout);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};


const getCommentUsers = async (req, res) => {
  try {
    const { workoutId } = req.params;
    const currentWorkout = await workoutModel.findById(workoutId);
    const commentsForWorkout = currentWorkout.userComments;
    res.status(200).json(commentsForWorkout);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};









module.exports = {
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

};
