const dietModel = require("../models/Diet");
const instructorModel = require("../models/Instructor");
const userModel = require("../models/User");


const createDiet = async (req, res) => {
  try {
    const { instructorId } = res.locals.decoded;
    if (!instructorId) {
      return res.status(400).json({
        error: "Ensure you are a registered instructor to access this route",
      });
    }
    
    const currentInstructor = await instructorModel.findById(instructorId);
    const { _id: insId, instructorFirstname, instructorLastname, instructorEmail, instructorBio } = currentInstructor
    
    const newDiet = await dietModel.create({
		...req.body,
      theInstructor: {
		insId, instructorFirstname, instructorLastname, instructorEmail, instructorBio
      },
    });

    return res.status(201).json(newDiet);
  } catch (error) {
    console.error(error);
    if (error.code === 11000) {
      return res.status(400).json({ error: "Diet already exists" });
    }
    return res.status(400).json({ error: error.message });
  }
};


const getAllDiets = async (req, res) => {
  try {
    const allDiets = await dietModel.find().sort({ updatedAt: -1 });
    res.status(200).json(allDiets);
  } catch (error) {
    res.status(404).json({ error: "No diets available" });
  }
};

const getDietsBySearch = async (req, res) => {
  try {
    const { search } = req.params; // Retrieve the search query from req.params
  
    let searchedDiets;
    searchedDiets = await dietModel
      .find({
        $or: [
          { dietName: { $regex: search, $options: "i" } },
          { category: { $regex: search, $options: "i" } },
          { tags: { $regex: search, $options: "i" } },
        ],
      })
      .sort({ updatedAt: -1 });

    if (searchedDiets.length === 0) {
      // Handle case when no diets are found
      return res.status(404).json({ error: "No diets available" });
    }

    res.status(200).json(searchedDiets);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};



const getInstructorDiets = async (req, res) => {
  try {
    const { instructorId } = res.locals.decoded;
    if (instructorId == null)
      return res.status(400).json({
        error: "Ensure you are a registered instructor to access this route",
      });
    const currentInstructor = await instructorModel.findById(instructorId);
    const dietsForInstructor = await dietModel
      .find({ "theInstructor.insId": instructorId })
      .sort({ updatedAt: -1 });
    res.status(200).json(dietsForInstructor);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};




const getDietById = async (req, res) => {
  try {
    const { dietId } = req.params;
    const currentDiet = await dietModel.findById(dietId);
    res.status(200).json(currentDiet);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const getCategoryDiets = async (req, res) => {
  try {
    const { category } = req.params;
    const currentDiet = await dietModel
      .find({ category } )
      .sort({ updatedAt: -1 });
    res.status(200).json(currentDiet);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const getUserAppliedDiets = async (req, res) => {
  try {
    const { userId } = res.locals.decoded;
    if (userId == null)
      return res.status(400).json({
        error: "Ensure you are a registered user to access this route",
      });
    const appliedDiets = await dietModel.find({ "theUsers.userId": userId });
    res.status(200).json(appliedDiets);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};



const applyToDiet = async (req, res) => {
  try {
    const { userId } = res.locals.decoded;
    if (userId == null)
      return res
        .status(400)
        .json({ error: "Ensure you are a user to access this route" });
    const { joining, score } = req.body;
    const { dietid } = req.params;
    const appliedAt = Date.now();
    const getUser = await userModel.findById(userId);
    const newDietApplication = await dietModel.findByIdAndUpdate(
      dietid,
      {
        $push: {
          theUsers: {  userId, joining, score, appliedAt},
        },
      },
      { new: true }
    );

    res.status(201).json(newDietApplication);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};



const commentToDiet = async (req, res) => {
  try {
    const { userId } = res.locals.decoded;
    if (userId == null)
      return res
        .status(400)
        .json({ error: "Ensure you are a user to access this route" });
    const { comments } = req.body;
    const { dietid } = req.params;
    const appliedAt = Date.now();
    const getUser = await userModel.findById(userId);
    const {
      firstname,
      lastname,
      age,
      weight,
      email,
    } = getUser;

    const diet = await dietModel.findById(dietid);

    // Check if the user has already commented on this diet
    const existingComment = diet.userComments.find(
      (comment) => comment.userId.toString() === userId.toString()
    );

    if (existingComment) {
      return res
        .status(400)
        .json({ error: "You have already commented on this diet" });
    }

    const updateProgress = () => {
      const daysElapsed = (new Date() - diet.createdAt) / (1000 * 60 * 60 * 24);
      const progress = Math.min((daysElapsed / diet.noOfDays) * 100, 100);
      const updatedComment = {
        userId,
        firstname,
        lastname,
        email,
        comments,
        joined: true,
        age,
        weight,
        progress: progress.toFixed(2),
        appliedAt,
      };
      dietModel.findByIdAndUpdate(dietid, {
        $push: { userComments: updatedComment },
      }).catch((error) => {
        console.log("Failed to update progress:", error);
      });
    };

    // Calculate and update progress every 1 hour (adjust the interval as needed)
    setInterval(updateProgress, 1000 * 60 * 60);

    // Immediately update progress
    updateProgress();

    const newDietComment = await dietModel.findById(dietid);

    res.status(201).json(newDietComment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


const deleteDiet = async (req, res) => {
  try {
    const { dietId } = req.params;
    const dietToDelete = await dietModel.findById(dietId);
    if (!dietToDelete) {
      return res.status(404).json({ error: "Diet not found" });
    }
    await dietModel.deleteOne({ _id: dietId });
    res.status(200).json({ message: "Diet deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateDiet = async (req, res) => {
  try {
    const { dietId } = req.params;
    const dietToUpdate = await dietModel.findById(dietId);
    if (!dietToUpdate) {
      return res.status(404).json({ error: "Diet not found" });
    }
    const updatedDiet = await dietModel.findByIdAndUpdate(
      dietId,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedDiet);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


const getDietUsers = async (req, res) => {
  try {
    const { dietId } = req.params;
    const currentDiet = await dietModel.findById(dietId);
    const usersForDiet = currentDiet.theUsers;
    res.status(200).json(usersForDiet);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};


const getCommentUsers = async (req, res) => {
  try {
    const { dietId } = req.params;
    const currentDiet = await dietModel.findById(dietId);
    const commentsForDiet = currentDiet.userComments;
    res.status(200).json(commentsForDiet);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};


const getUserCommentedDiets = async (req, res) => {
  try {
    const { userId } = res.locals.decoded;
    if (userId == null)
      return res.status(400).json({
        error: "Ensure you are a registered user to access this route",
      });

    const commentedDiets = await dietModel.find({ "userComments.userId": userId });
    res.status(200).json(commentedDiets);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};



module.exports = {
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
  getUserCommentedDiets, 

};
