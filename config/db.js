import mongoose from "mongoose";

const connectDB = async ()=>{
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        });
        console.log("MongoDB Connected...");
    } catch (error) {
        console.error(`Error connecting to MongoDB: ${error.message}`);
        process.exit(1);
    }
}

mongoose.connection.on('error', ()=>{
console.log('Error connecting to MongoDB');
})
mongoose.connection.on('connected', ()=>{
    console.log('Connected to MongoDB');
})

export default connectDB;