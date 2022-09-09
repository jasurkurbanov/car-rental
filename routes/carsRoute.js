const express = require('express')
const router = express.Router()
const { getCars, postCar, updateCar, deleteCar } = require('../controllers/carsController')
const { protect } = require('../middlewares/authMiddleware')

router.route('/').get(protect, getCars).post(protect, postCar)
router.route('/:id').put(protect, updateCar).delete(protect, deleteCar)

module.exports = router

