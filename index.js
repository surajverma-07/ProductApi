import mongoose from "mongoose";
import dotenv from "dotenv";
import express from "express";
import connectDB from "./database/db.js";
import cors from "cors";
const app = express();
dotenv.config({
  path: ".env",
});

// Middleware
app.use(express.json({ limit: "16kb" }));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(
  cors({
    allowedHeaders: ["Content-Type"],
    origin: process.env.CORS_ORIGIN,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
  })
);

//Mongo Db connection establish and running the app
const port = process.env.PORT || 5000;
connectDB()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is running at port : http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.log("Mongo DB connection Failed ! ", err);
  });

