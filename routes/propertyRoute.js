const express = require('express')
const { getAllProperties, addProperties } = require('../controllers/propertyController')
const router = express.Router()

router.route('/owner/property').get(getAllProperties)
router.route('/owner/addproperty').post(addProperties)

module.exports = router;