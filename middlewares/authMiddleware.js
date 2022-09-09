const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');


const protect = asyncHandler(async (req, res, next) => {
    let token;
    console.log('req.headers', req.headers)
    if (req.headers?.authorization && req.headers?.authorization?.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1]

            //verify token
            const decoded = jwt.verify(token, process.env.JWT_TOKEN)

            req.user = await User.findById(decoded.id).select('-password')
            next()
        } catch (error) {
            console.log('err', error)
            res.status(401).json({ message: 'Not authorized' })
            //throw new Error
        }
    }

    if (!token) {
        res.status(401).json({ message: 'Not authorized, no token' })
        //throw new Error('Not authorized, no token')
    }
})

module.exports = { protect }