const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require('../models/User')



// register user
const registerUser = asyncHandler(async (req, res) => {
	const {firstname, lastname, email, password, age, weight, height, gender, place, focus} = req.body
	if(!email || !password || !firstname || !lastname){
		res.status(400)
		throw new Error('Please add all feilds')
	}

	// if user exsist

	const userExsits = await User.findOne({email})

	if(userExsits){
		res.status(400)
		throw new Error('User with that email already exsist')
	}

	// hash passward
	// Hash password
	const salt = await bcrypt.genSalt(10)
	const hashedPassword = await bcrypt.hash(password, salt)
  
	// Create user
	const user = await User.create({
		firstname,
		lastname,
		email,
		age,
		weight,
		height,
		gender,
		place,
		focus,
		password: hashedPassword,
	})
  
	if (user) {
	  res.status(201).json({
		_id: user.id,
		firstname: user.firstname,
		lastname: user.lastname,
		email: user.email,
		age: user.age,
		weight: user.weight,
		height: user.height,
		gender: user.gender,
		focus: user.focus,
		place: user.place,
		token: generateToken(user._id),
	  })
	} else {
	  res.status(400)
	  throw new Error('Invalid user data')
	}
	
	// res.json({message: 'Register User'})
})

// authenticate user
const loginUser = asyncHandler(async (req, res) => {
	const { email, password } = req.body
  
	// Check for user email
	const user = await User.findOne({ email })
  
	if (user && (await bcrypt.compare(password, user.password))) {
	  res.json({
		_id: user.id,
		firstname: user.firstname,
		lastname: user.lastname,
		email: user.email,
		age: user.age,
		weight: user.weight,
		height: user.height,
		gender: user.gender,
		focus: user.focus,
		place: user.place,
		token: generateToken(user._id),
	  })
	} else {
	  res.status(400)
	  throw new Error('Invalid credentials')
	}
  })

// get current user
const getMe =  asyncHandler(async (req, res) => {
	res.status(200).json(req.user)
})

// generate jwt

const generateToken = (userId) => {
	return jwt.sign({ userId }, process.env.JWT_SEC, {
	  expiresIn: '30d',
	}) || jwt.sign({ instructorId }, process.env.JWT_SEC, {
		expiresIn: '30d',
	  })
  }


module.exports = {
	registerUser,
	loginUser,
	getMe
}