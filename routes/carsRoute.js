const express = require('express')
const router = express.Router()
const { getCars, postCar, updateCar, deleteCar } = require('../controllers/carsController')

router.route('/').get(getCars).post(postCar)
router.route('/:id').put(updateCar).delete(deleteCar)

module.exports = router

