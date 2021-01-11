const express = require('express')
const router = express.Router()

//Controller
const usersController = require('../controllers/users')


//Get Requests
router.get('/', usersController.getAllUsers)

router.get('/:id', usersController.getUserById)

//Post Requests
router.post('/', usersController.createUser)

//Put Requests
router.put('/:id', usersController.updateUserById)

//Delete Requests
router.delete('/:first_name', usersController.deleteUserByFirstName)

module.exports = router