const mongoose = require('mongoose');
const Schema = mongoose.Schema

const workoutSchema = mongoose.Schema({
	workoutName: {
		type: String,
		required: true
	},
	category:{
		type: String,
		required: true
	},
	description: {
		type: String,
		required: true
	},
	duration:{
		type: String,
		required: true
	},
	difficulty: {
		type: String,
		required: true
	},
	tags: {
		type: String,
		required: true
	},
	imageLink: {
		type: String,
		required: true
	},
	equipments: {
		type: String,
		required: false
	},
	theInstructor: {
		insId: {
		  type: mongoose.Schema.Types.ObjectId,
		},
		instructorFirstname: {
		  type: String,
		},
		instructorLastname: {
		  type: String,
		},
		instructorEmail: {
		  type: String,
		},
		instructorBio: {
		  type: String
		}
	},

	theUsers: [
		{
		  userId: {
			type: mongoose.Schema.Types.ObjectId,
		  },
		  joining: {
			type: String,
			default: 'Pending'	
		  },
		  score: {
			type: Number,
			default: 0
		  },
		  appliedAt: {
			type: Date,
		  },
		},
	  ],

	  userComments: [
		{
			userId: {
			  type: mongoose.Schema.Types.ObjectId,
			},
			comments: {
			  type: String,
			  default: '...'	
			},
			appliedAt: {
			  type: Date,
			},
		  },
	  ],

	  workoutSchedule: {
		type: String,
		required: true
	  },

	  
	

},
{
	timestamps: true
}

)

module.exports = mongoose.model("Workout", workoutSchema)