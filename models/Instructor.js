const mongoose = require('mongoose');

const instructorSchema = new mongoose.Schema({

  instructorFirstname: {
	type: String,
	required: true
  },
  instructorLastname: {
	type: String,
	required: true
  },
  instructorEmail: {
	type: String,
	required: true
  },
  instructorBio: {
	type: String,
	required: true
  },
  password: {
    type: String,
    required: true,
  },
});

const Instructor = mongoose.model('Instructor', instructorSchema);

module.exports = Instructor;
