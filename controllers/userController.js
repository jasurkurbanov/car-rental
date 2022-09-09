const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const User = require('../models/userModel')
const asyncHandler = require('express-async-handler')

// @desc   Register a user
// @route  POST /api/v1/users
// @access Public


const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body

    // validation
    if (!name || !email || !password) {
        res.status(400)
        //TODO fix custom error
        //throw new Error('Please add fields')
    }

    // check if user exists
    const userExists = await User.findOne({ email })
    if (userExists) {
        res.status(400)
        //throw new Error('User already exist')
    }

    // hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const user = await User.create({
        name,
        email,
        password: hashedPassword
    })

    if (user) {
        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email
        })
    } else {
        res.status(400)
        //throw new Error('Invalid user data')
    }
})


// @desc   Login a user
// @route  POST /api/v1/login
// @access Public


const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body

    //Check for user email
    const user = await User.findOne({ email })

    if (user && await bcrypt.compare(password, user.password)) {
        res.json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        })
    } else {
        res.status(400).json({ message: "Status 400" })
        //throw new Error('Invalid credentials')
    }

})


// generate token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_TOKEN, { expiresIn: '30d' })
}


// @desc   Get user information
// @route  GET /api/v1/getUser
// @access Private


const getUser = asyncHandler(async (req, res) => {
    const { _id, name, email } = await User.findById(req.user.id)

    res.status(200).json({ id: _id, name, email })
})

module.exports = { registerUser, getUser, loginUser }