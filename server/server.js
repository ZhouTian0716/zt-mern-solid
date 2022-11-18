require("dotenv").config();
const express = require("express");
const app = express();
const path = require('path');
const cors = require("cors");
const corsOptions = require('./config/corsOptions');
const { logger } = require('./middleware/logEvents');
const errorHandler = require('./middleware/errorHandler');
// const verifyJWT = require('./middleware/verifyJWT');
const cookieParser = require('cookie-parser');
const credentials = require('./middleware/credentials');
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const connectDB = require('./config/mongoConnection');
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// 👻 Middlewares custom
app.use(logger);

// 👻 Handle options credentials check - before CORS!
// 👻 and fetch cookies credentials requirement
app.use(credentials);

// Cross Origin Resource Sharing
app.use(cors(corsOptions));

// 👻 Middlewares
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
// 👻 Middleware cookieParser for refreshToken feature
app.use(cookieParser());

//serve static files
app.use('/', express.static(path.join(__dirname, '/public')));


// 👻 Routes
app.use("/posts", require("./routes/posts"));
app.use("/accounts", require("./routes/accounts"));
app.use("/accounts/refresh", require("./routes/refresh"));
app.use("/accounts/logout", require("./routes/logout"));

// 👻 Routes under need to check JWT
// app.use(verifyJWT);

app.use(errorHandler);

mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB');
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});