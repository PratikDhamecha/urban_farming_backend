require('dotenv').config();

const app = require('./app');
const connectDB = require('./Config/db');

const mongoose = require('mongoose');

const PORT = process.env.DB_PORT || 3306;

connectDB();
mongoose.connection.on("connected", () => {
    console.log("MongoDB connected successfully");
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
});

process.on('unhandledRejection', (err,promise) => {
    console.log(`Logged Error: ${err}`);
    server.close(() => process.exit(1));
})