const express = require('express')
const { getAllProperties, addProperty, deleteProperty, updateProperty, getProperty } = require('../controllers/propertyController')
const {isAuthenticated, authorizeRoles} = require('../middlewares/auth')
const router = express.Router()

router.route('/list-properties').get(getAllProperties)
router.route('/property').post(isAuthenticated,authorizeRoles("owner"),addProperty).get(isAuthenticated,authorizeRoles("owner"),getProperty)
router.route('/property/:id').delete(isAuthenticated,authorizeRoles("owner"),deleteProperty).put(isAuthenticated,authorizeRoles("owner"),updateProperty)

module.exports = router;