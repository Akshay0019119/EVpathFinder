const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    console.log('Connecting to DB with URI:', process.env.MONGO_URI);
    await mongoose.connect(process.env.MONGO_URI);  // no options needed now
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection error:', error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
