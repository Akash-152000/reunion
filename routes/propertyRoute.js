const express = require('express')
const { getAllProperties, addProperty } = require('../controllers/propertyController')
const router = express.Router()

router.route('/owner/property').get(getAllProperties)
router.route('/owner/addproperty').post(addProperty)

module.exports = router;