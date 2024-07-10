const mongoose = require("mongoose");

const connectDB = async ()=>{
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            serverSelectionTimeoutMS: 5000  
        });
        console.log("MongoDB Connected...");
    } catch (error) {
        console.error(`Error connecting to MongoDB: ${error.message}`);
        process.exit(1);
    }
}

mongoose.connection.on('error', ()=>{
// console.log('Error connecting to MongoDB');
})
mongoose.connection.on('connected', ()=>{
    // console.log('Connected to MongoDB');
})

module.exports = connectDB;