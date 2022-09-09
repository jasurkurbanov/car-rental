const asyncHandler = require('express-async-handler')
const Car = require('../models/carsModel')

// @desc   Get All Cars
// @route  GET /api/v1/cars
// @access Private

const getCars = asyncHandler(async (req, res) => {
    // TODO: add Redis cache 
    const allCars = await Car.find({ user: req.user.id })
    res.status(200).json(allCars)

})


// @desc   Post New Car
// @route  POST /api/v1/cars
// @access Private

const postCar = asyncHandler(async (req, res) => {
    // TODO validation
    const newCar = await Car.create({
        name: req.body.name,
        images: req.body.images,
        type: req.body.type,
        gasoline: req.body.gasoline,
        steering: req.body.steering,
        capacity: req.body.capacity,
        price: req.body.price,
        user: req.user.id
    })

    res.status(201).json(newCar)

})

// @desc   Update Car
// @route  PUT /api/v1/cars/:id
// @access Private

const updateCar = async (req, res) => {
    // TODO validation
    const { id } = req.params
    const { name, images, type, gasoline, steering, capacity, price } = req.body

    const updatedCar = { _id: id, name, images, type, gasoline, steering, capacity, price }
    try {
        const carUpdated = await Car.findByIdAndUpdate(id, updatedCar, { new: true })
        res.status(200).json(carUpdated)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}


// @desc   Delete a car
// @route  DELETE /api/v1/cars/:id
// @access Private

const deleteCar = async (req, res) => {
    const { id } = req.params
    try {
        await Car.findByIdAndDelete(id)
        res.status(200).json({ message: 'Car successfully deleted' })
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}


module.exports = {
    getCars, postCar, updateCar, deleteCar
}