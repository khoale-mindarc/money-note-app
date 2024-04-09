const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    username: {
        type: String,
        require: true,
        trim: true,
        maxLenght: 20,
    },
    email: {
        type: String,
        require: true,
        trim: true,
        match: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
        minLenght: 10,
        maxLenght: 50,
    },
    phone: {
        type: String,
        require: true,
        trim: true,
        minLenght: 9,
        maxLenght: 11,
    },
    password: {
        type: String,
        require: true,
        trim: true
    },
    name: {
        type: String,
        require: true,
        trim: true,
        maxLenght: 20,
    },
    age: {
        type: Number,
        require: true,
        trim: true,
        maxLenght: 20,
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Users", UserSchema);
