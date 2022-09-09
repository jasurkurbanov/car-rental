const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log(`MongoDB Connected On Host: ${conn.connection.host}`)
    } catch (error) {
        console.log('Error', error)
    }
}
module.exports = connectDB