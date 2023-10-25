// Connect to MongoDB

const mongoose = require('mongoose');

const Connect=async()=>{
    await mongoose.connect("mongodb://127.0.0.1:27017")
    console.log("connecting to MongoDB");
};

module.exports = Connect;