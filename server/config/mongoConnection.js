const mongoose = require("mongoose");

const databaseName = "zt-mern-solid";
const mongoUserName = process.env.DATABASE_USER;
const mongoUserPassword = process.env.DATABASE_USER_PWD;
const connectionURI = `mongodb+srv://${mongoUserName}:${mongoUserPassword}@cluster0.oomzs.mongodb.net/${databaseName}?retryWrites=true&w=majority`;

const connectDB = async () => {
  try {
    await mongoose.connect(connectionURI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    console.log(
      `Hello ${mongoUserName}, welcome to your connected mongo database name : ${databaseName}`
    );
  } catch (err) {
    console.error(err);
  }
};

module.exports = connectDB;
