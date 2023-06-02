const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler');
const Instructor = require('../models/Instructor');

// Register instructor
const registerInstructor = asyncHandler(async (req, res) => {
  const { instructorFirstname, instructorLastname, instructorEmail, password, instructorBio } = req.body;
  if (!instructorEmail || !password || !instructorFirstname || !instructorLastname) {
    res.status(400);
    throw new Error('Please add all fields');
  }

  // Check if instructor exists
  const instructorExists = await Instructor.findOne({ instructorEmail });

  if (instructorExists) {
    res.status(400);
    throw new Error('Instructor with that email already exists');
  }

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create instructor
  const instructor = await Instructor.create({
    instructorFirstname,
    instructorLastname,
    instructorEmail,
    instructorBio,
    password: hashedPassword,
  });

  if (instructor) {
    res.status(201).json({
      _id: instructor.id,
      instructorFirstname: instructor.instructorFirstname,
      instructorLastname: instructor.instructorLastname,
      instructorEmail: instructor.instructorEmail,
      instructorBio: instructor.instructorBio,
      token: generateToken(instructor._id),
    });
  } else {
    res.status(400);
    throw new Error('Invalid instructor data');
  }
});

// Authenticate instructor
const loginInstructor = asyncHandler(async (req, res) => {
  const { instructorEmail, password } = req.body;

  // Check for instructor email
  const instructor = await Instructor.findOne({ instructorEmail });

  if (instructor && (await bcrypt.compare(password, instructor.password))) {
    res.json({
      _id: instructor.id,
      instructorFirstname: instructor.instructorFirstname,
      instructorLastname: instructor.instructorLastname,
      instructorEmail: instructor.instructorEmail,
      instructorBio: instructor.instructorBio,
      token: generateToken(instructor._id),
    });
  } else {
    res.status(400);
    throw new Error('Invalid credentials');
  }
});

// Get current instructor
const getInstructor = asyncHandler(async (req, res) => {
  res.status(200).json(req.instructor);
});

// Update instructor
const updateInstructor = asyncHandler(async (req, res) => {
  const instructor = req.instructor;
  const { instructorFirstname, instructorLastname, instructorEmail, password, instructorBio } = req.body;

  if (instructor) {
    instructor.instructorFirstname = instructorFirstname || instructor.instructorFirstname;
    instructor.instructorLastname = instructorLastname || instructor.instructorLastname;
    instructor.instructorEmail = instructorEmail || instructor.instructorEmail;
    instructor.instructorBio = instructorBio || instructor.instructorBio;

    if (password) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      instructor.password = hashedPassword;
    }

    const updatedInstructor = await instructor.save();

    res.json({
      _id: updatedInstructor._id,
      instructorFirstname: updatedInstructor.instructorFirstname,
      instructorLastname: updatedInstructor.instructorLastname,
      instructorEmail: updatedInstructor.instructorEmail,
      instructorBio: updatedInstructor.instructorBio,
      token: generateToken(updatedInstructor._id),
    });
  } else {
    res.status(404);
    throw new Error('Instructor not found');
  }
});

// Get all instructors
const getInstructors = asyncHandler(async (req, res) => {
  const instructors = await Instructor.find({});
  res.json(instructors);
});

// Get instructor by ID
const getInstructorById = asyncHandler(async (req, res) => {
  const instructor = await Instructor.findById(req.params.id);

  if (instructor) {
    res.json(instructor);
  } else {
    res.status(404);
    throw new Error('Instructor not found');
  }
});

// Generate JWT
const generateToken = (instructorId) => {
  return jwt.sign({ instructorId }, process.env.JWT_SEC, {
    expiresIn: '30d',
  });
};

module.exports = {
  registerInstructor,
  loginInstructor,
  getInstructor,
  updateInstructor,
  getInstructors,
  getInstructorById,
};
