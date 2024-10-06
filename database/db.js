import mongoose from "mongoose";

// Function to connect to MongoDB
const connectDB = async () => {
    try {
        // Connect to the MongoDB database using the URI from environment variables
        await mongoose.connect(process.env.MONGO_URI);
        
        // Log a success message if connection is successful
        console.log("MongoDB Connected Successfully");
    } catch (error) {
        // Log an error message if the connection fails
        console.log("MongoDB Error :: ", error);
        
        // Exit the process with a failure code if an error occurs
        process.exit(1);
    }
}

export default connectDB;
