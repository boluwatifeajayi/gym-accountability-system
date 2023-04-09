const express = require('express')
const router = express.Router()
const {registerInstructor, loginInstructor, getInstructor, updateInstructor} = require('../controllers/instructorController')

const {protect} = require('../middlewares/instructorMiddleware')

router.post('/register', registerInstructor)
router.post('/login', loginInstructor)
router.get('/instructor', protect, getInstructor)
router.put('/instructor/update', protect, updateInstructor)

module.exports = router
