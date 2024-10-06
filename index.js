import mongoose from "mongoose"; 
import dotenv from "dotenv"; 
import express from "express"; 
import connectDB from "./database/db.js"; 
import cors from "cors"; 

const app = express();
dotenv.config({ path: ".env" }); // Load environment variables

// Middleware
app.use(express.json({ limit: "16kb" })); // Parse incoming JSON requests
app.use(express.static("public")); // Serve static files from the 'public' directory
app.use(express.urlencoded({ extended: true, limit: "16kb" })); // Parse URL-encoded data
app.use(
  cors({ // Enable CORS for specified origins
    allowedHeaders: ["Content-Type"],
    origin: process.env.CORS_ORIGIN,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
  })
);

//Mongo DB connection establish and running the app
const port = process.env.PORT || 5000; // Set port for the application
connectDB() // Connect to MongoDB
  .then(() => {
    app.listen(port, () => { // Start server on successful connection
      console.log(`Server is running at port : http://localhost:${port}`); // Log server URL
    });
  })
  .catch((err) => {
    console.log("Mongo DB connection Failed ! ", err); // Log connection error
  });

// Import statement of routes 
import productRouter from './routes/product.routes.js';

app.use("/api/product", productRouter); // Use product routes
