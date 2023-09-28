const express = require('express')
const { getAllProperties, addProperty, deleteProperty, updateProperty, getProperty } = require('../controllers/propertyController')
const router = express.Router()

router.route('/list-properties').get(getAllProperties)
router.route('/property').post(addProperty)
router.route('/property/:id').delete(deleteProperty).put(updateProperty).get(getProperty)

module.exports = router;