const express = require('express')
const router = express.Router()
const {registerInstructor, loginInstructor, getInstructor} = require('../controllers/instructorController')

const {protect} = require('../middlewares/instructorMiddleware')


router.post('/register', registerInstructor)
router.post('/login', loginInstructor)
router.get('/instructor', protect, getInstructor)

module.exports = router