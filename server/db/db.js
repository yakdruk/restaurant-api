const mongoose = require("mongoose");


const uri = process.env.MONGO_DB_URI;

async function connectDB(){
    try {
        await mongoose.connect(uri);
        console.log("mongo db connect successfully");
    } catch (error) {
        console.log(error)
    }
};

module.exports = connectDB;