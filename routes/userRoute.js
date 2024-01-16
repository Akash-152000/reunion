const express = require('express')
const { signup, login, logout, myprofile } = require('../controllers/userController')
const { isAuthenticated, authorizeRoles } = require('../middlewares/auth')
const router = express.Router()

router.route('/myprofile').get(isAuthenticated,authorizeRoles("owner"),myprofile)
router.route('/signup').post(signup)
router.route('/login').post(login) 
router.route('/logout').get(logout) 

module.exports = router