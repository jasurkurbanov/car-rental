const Car = require('../models/carsModel')

// @desc   Get All Cars
// @route  GET /api/v1/cars
// @access Private

const getCars = async (req, res) => {
    try {
        // TODO: add Redis cache 
        const allCars = await Car.find()
        res.status(200).json(allCars)
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}


// @desc   Post New Car
// @route  POST /api/v1/cars
// @access Private

const postCar = async (req, res) => {
    // TODO validation
    const { name, images, type, gasoline, steering, capacity, price } = req.body
    const newCar = new Car({ name, images, type, gasoline, steering, capacity, price })
    try {
        await newCar.save()
        res.status(201).json(newCar)
    } catch (error) {
        res.status(409).json({ message: error.message + 56666 })
    }
}

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