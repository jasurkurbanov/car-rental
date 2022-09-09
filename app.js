require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose');
const app = express()
const connectDB = require('./config/db');
const { errorMiddleware } = require('./middlewares/errorMiddleware');
const port = process.env.PORT || 5000;


connectDB()

app.use(errorMiddleware)
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

//route
app.use('/api/v1/cars', require('./routes/carsRoute'))


app.listen(port, () => {
    console.log(`Connected on port: ${port}`)
})