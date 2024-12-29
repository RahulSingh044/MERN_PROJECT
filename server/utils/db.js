const mongoose = require('mongoose');

const URI =  process.env.MONGODB_URI

const connectDB = async () => {
  try {
    await mongoose.connect(URI);
    
    console.log("Connected to database successfully");
  } catch (error) {
    console.error("Connection Failed");
    process.exit(0);
  }
}

module.exports = connectDB;