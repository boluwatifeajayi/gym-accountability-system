const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const Instructor = require('../models/Instructor')



// register instructor
const registerInstructor = asyncHandler(async (req, res) => {
	const {instructorFirstname, instructorLastname, instructorEmail, password, instructorBio} = req.body
	if(!instructorEmail || !password || !instructorFirstname || !instructorLastname){
		res.status(400)
		throw new Error('Please add all feilds')
	}

	// if instructor exsist

	const instructorExsits = await Instructor.findOne({instructorEmail})

	if(instructorExsits){
		res.status(400)
		throw new Error('Instructor with that instructorEmail already exsist')
	}

	// hash passward
	// Hash password
	const salt = await bcrypt.genSalt(10)
	const hashedPassword = await bcrypt.hash(password, salt)
  
	// Create instructor
	const instructor = await Instructor.create({
		instructorFirstname,
		instructorLastname,
		instructorEmail,
		instructorBio,
		password: hashedPassword,
	})
  
	if (instructor) {
	  res.status(201).json({
		_id: instructor.id,
		instructorFirstname: instructor.instructorFirstname,
		instructorLastname: instructor.instructorLastname,
		instructorEmail: instructor.instructorEmail,
		instructorBio: instructor.instructorBio,
		token: generateToken(instructor._id),
	  })
	} else {
	  res.status(400)
	  throw new Error('Invalid instructor data')
	}
	
	// res.json({message: 'Register Instructor'})
})

// authenticate instructor
const loginInstructor = asyncHandler(async (req, res) => {
	const { instructorEmail, password } = req.body
  
	// Check for instructor instructorEmail
	const instructor = await Instructor.findOne({ instructorEmail })
  
	if (instructor && (await bcrypt.compare(password, instructor.password))) {
	  res.json({
		_id: instructor.id,
		instructorFirstname: instructor.instructorFirstname,
		instructorLastname: instructor.instructorLastname,
		instructorEmail: instructor.instructorEmail,
		instructorBio: instructor.instructorBio,
		token: generateToken(instructor._id),
	  })
	} else {
	  res.status(400)
	  throw new Error('Invalid credentials')
	}
  })

// get current instructor
const getInstructor =  asyncHandler(async (req, res) => {
	res.status(200).json(req.instructor)
})

// generate jwt

const generateToken = (instructorId) => {
	return jwt.sign({ instructorId }, process.env.JWT_SEC, {
		expiresIn: '30d',
	  })
  }


module.exports = {
	registerInstructor,
	loginInstructor,
	getInstructor
}