const mongoose = require("mongoose");
let MongoMemoryServer;
try {
  MongoMemoryServer = require("mongodb-memory-server").MongoMemoryServer;
} catch (e) {
  MongoMemoryServer = null;
}

const connectDB = async () => {
  try {
    let mongoUri = process.env.MONGO_URI;
    let mongod;
    if (!mongoUri) {
      if (!MongoMemoryServer) {
        throw new Error("MONGO_URI is not set and mongodb-memory-server is not installed");
      }
      mongod = await MongoMemoryServer.create();
      mongoUri = mongod.getUri();
      console.log("Using in-memory MongoDB for development");
    }

    const conn = await mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`MongoDB connection error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
