
// @desc   Register a user
// @route  POST /api/v1/users
// @access Public


const registerUser = async (req, res) => {
    try {
        res.json({ message: 'Working' })
    } catch (error) {
        console.error('Error', error)
    }
}


// @desc   Login a user
// @route  POST /api/v1/login
// @access Public


const loginUser = async (req, res) => {
    try {
        res.json({ message: 'Working loginUser' })
    } catch (error) {
        console.error('Error', error)
    }
}



// @desc   Get user information
// @route  GET /api/v1/getUser
// @access Private


const getUser = async (req, res) => {
    try {
        res.json({ message: 'Working getUser' })
    } catch (error) {
        console.error('Error', error)
    }
}

module.exports = { registerUser, getUser, loginUser }