const mongoose = require("mongoose");
require("dotenv").config({ path: "./config/.env" });

const DataBase = async () => {
  try {
    //await mongoose.connect("mongodb+srv://DedSek:Database2024@cluster0.twpbgda.mongodb.net/");
    await mongoose.connect(process.env.Mongo_URL);
    console.log("DataBase is connected");
  } catch (error) {
    console.log(error);
  }
};

module.exports = DataBase;
