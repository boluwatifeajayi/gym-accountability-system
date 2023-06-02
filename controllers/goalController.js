const goalModel = require("../models/Goal");
const userModel = require("../models/User");

const createGoal = async (req, res) => {
  try {
    const { userId } = res.locals.decoded;
    if (!userId) {
      return res.status(400).json({
        error: "Ensure you are a registered user to access this route",
      });
    }

    const currentUser = await userModel.findById(userId);
    const { _id: useId, firstname } = currentUser;

    const newGoal = await goalModel.create({
      ...req.body,
      theUser: {
        useId,
        firstname,
      },
    });

    return res.status(201).json(newGoal);
  } catch (error) {
    console.error(error);
    if (error.code === 11000) {
      return res.status(400).json({ error: "Goal already exists" });
    }
    return res.status(400).json({ error: error.message });
  }
};

const deleteGoal = async (req, res) => {
  try {
    const { goalId } = req.params;
    const deletedGoal = await goalModel.findByIdAndDelete(goalId);
    if (!deletedGoal) {
      return res.status(404).json({ error: "Goal not found" });
    }
    return res.status(200).json({ message: "Goal deleted successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to delete goal" });
  }
};

const addTask = async (req, res) => {
  try {
    const { goalId } = req.params;
    const { taskName } = req.body;

    const goal = await goalModel.findById(goalId);
    if (!goal) {
      return res.status(404).json({ error: "Goal not found" });
    }

    goal.tasks.push({ taskName });
    await goal.save();

    return res.status(200).json(goal);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to add task" });
  }
};

const getAllGoals = async (req, res) => {
  try {
    const { userId } = res.locals.decoded;
    if (!userId) {
      return res.status(400).json({
        error: "Ensure you are a registered user to access this route",
      });
    }

    const goals = await goalModel.find({ "theUser.useId": userId });
    return res.status(200).json(goals);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to retrieve goals" });
  }
};

const getAnalytics = async (req, res) => {
  try {
    const { userId } = res.locals.decoded;
    if (!userId) {
      return res.status(400).json({
        error: "Ensure you are a registered user to access this route",
      });
    }

    // Calculate task adding frequency
    const averageFrequency = await goalModel.calculateTaskAddingFrequency(userId);

    // Retrieve progress towards goals
    const goals = await goalModel.find({ "theUser.useId": userId });
    const totalProgress = goals.reduce((acc, goal) => acc + goal.progress, 0);

    return res.status(200).json({ averageFrequency, totalProgress });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to retrieve analytics" });
  }
};

module.exports = {
  createGoal,
  deleteGoal,
  addTask,
  getAllGoals,
  getAnalytics,
};
