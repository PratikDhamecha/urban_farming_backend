const mongoose = require('mongoose');
const connectDB = async () => {
    try{
        const connection = await mongoose.connect(process.env.DB_URI);
        console.log(`MongoDB Connected: ${connection.connection.host}`);

        console.log('Database connection established successfully');
    }catch (error) {
        console.error(`Error connecting to MongoDB: ${error.message}`);
        process.exit(1); // Exit the process with failure
    }
};

module.exports = connectDB;
