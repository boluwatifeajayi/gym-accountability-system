const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const goalSchema = mongoose.Schema(
  {
    goalTitle: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    tasks: [
      {
        taskName: {
          type: String,
          default: 'starter'
        },
        date: {
          type: Date,
          default: Date.now, // Set the default value to the current date
        },
      },
    ],
    progress: {
      type: Number,
      default: 0,
      validate: {
        validator: function (value) {
          return value <= 100;
        },
        message: 'Progress cannot exceed 100',
      },
    },
    theUser: {
      useId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
      },
      firstname: {
        type: String,
        required: true,
      },
    },
  },
  {
    timestamps: true,
  }
);

// Virtual property for elapsed time in days
goalSchema.virtual('elapsedTime').get(function () {
  const createdAt = this.createdAt;
  const now = new Date();
  const timeDiff = now - createdAt;
  const daysDiff = Math.floor(timeDiff / (24 * 60 * 60 * 1000)); // Convert milliseconds to days
  return daysDiff;
});

// Middleware to automatically update the progress attribute when tasks are added
goalSchema.post('save', async function () {
  const goal = this;
  goal.progress = Math.min(goal.tasks.length * 5, 100);
  await goal.save();
});

// Static method to calculate task adding frequency for a user
goalSchema.statics.calculateTaskAddingFrequency = async function (userId) {
  const tasksCount = await this.countDocuments({ 'theUser.useId': userId });
  const totalDays = await this.aggregate([
    {
      $group: {
        _id: {
          $dateToString: {
            format: '%Y-%m-%d',
            date: '$createdAt',
          },
        },
      },
    },
    {
      $group: {
        _id: null,
        daysCount: { $sum: 1 },
      },
    },
  ]);

  const averageFrequency = tasksCount / totalDays[0].daysCount;

  return averageFrequency;
};

module.exports = mongoose.model('Goal', goalSchema);
