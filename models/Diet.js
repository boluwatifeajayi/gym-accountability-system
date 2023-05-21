const mongoose = require('mongoose');
const Schema = mongoose.Schema

const dietSchema = mongoose.Schema({
	dietName: {
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
	noOfDays: {
		type: Number,
		default: 30
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
			firstname: {
				type: String
			},
			lastname: {
				type: String
			},
			email: {
				type: String
			},
			age: {
				type: String
			},
			weight: {
				type: String
			},
			joined: {
				type: Boolean,
			},
			progress: {
				type: Number,
				get: function () {
				  const daysElapsed = (new Date() - this.appliedAt) / (1000 * 60 * 60 * 24);
				  return Math.min((daysElapsed / this.diet.noOfDays) * 100, 100);
				},
			  },
			comments: {
			  type: String,
			},
			appliedAt: {
			  type: Date,
			},
		  },
	  ],

	  dietSchedule: {
		type: String,
		required: true
	  },

	  
	

},
{
	timestamps: true
}

)

module.exports = mongoose.model("Diet", dietSchema)