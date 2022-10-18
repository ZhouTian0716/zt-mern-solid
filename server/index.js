import * as dotenv from 'dotenv';
import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";


// import postRoutes from "./routes/posts.js";


// 👻 Starting by calling with express
const app = express();

// 👻 If you are working with .env setup, need this
dotenv.config();

// 👻 Middlewares
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());


// app.use('/posts', postRoutes);


// 👻 Check this from Mongo DB
const MY_MONGODB_CONNECTION_URL = process.env.CONNECTION_URL;




// 👻 Prepare from Heroku to host your backend
const PORT = process.env.PORT || 5000;

// 👻 mongoose.connect takes in (URL, Obj), returns a promise
mongoose
  .connect(MY_MONGODB_CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(PORT, () =>
      console.log(`Server Running on Port: http://localhost:${PORT}`)
    )
  )
  .catch((error) => console.log(`${error} did not connect`));


