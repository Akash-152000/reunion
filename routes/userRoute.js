const express = require('express')
const { signup, login, logout, myprofile, updateuser } = require('../controllers/userController')
const { isAuthenticated, authorizeRoles } = require('../middlewares/auth')
const router = express.Router()

router.route('/myprofile').get(isAuthenticated,myprofile)
router.route('/updateuser').post(isAuthenticated,updateuser)
router.route('/signup').post(signup)
router.route('/login').post(login) 
router.route('/logout').get(logout) 

module.exports = router