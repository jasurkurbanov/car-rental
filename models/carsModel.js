'use strict'

const mongoose = require('mongoose')

const carsSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User' //user assosiated with Car
    },
    name: {
        type: String,
        require: (true, 'Name cannot be empty')
    },
    images: {
        type: String,
        require: (true, 'Images cannot be empty')
    },
    type: {
        type: String,
        require: (true, 'Type cannot be empty')
    },
    gasoline: {
        type: Number,
        require: (true, 'Gasoline cannot be empty')
    },
    steering: {
        type: String,
        require: (true, 'Name cannot be empty')
    },
    capacity: {
        type: Number,
        require: (true, 'Capacity cannot be empty')
    },
    price: {
        type: Number,
        require: (true, 'Price cannot be empty')
    },
}, { timestamps: true })

module.exports = mongoose.model('Cars', carsSchema)