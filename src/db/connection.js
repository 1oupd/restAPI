require("dotenv").config();
const mongoose = require("mongoose");

const connection = async () => {
  try {
    await mongoose.connect(process.env.MOGO_URI);
    console.log("successfully connected");
  } catch (error) {
    console.log(error);
  }
};

connection();
