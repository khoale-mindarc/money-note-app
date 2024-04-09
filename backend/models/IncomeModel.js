const mongoose = require("mongoose");

const IncomeSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      require: true,
    },
    title: {
      type: String,
      require: true,
      trim: true,
      maxLenght: 50,
    },
    amount: {
      type: Number,
      require: true,
      trim: true,
      maxLenght: 20,
    },
    type: {
      type: String,
      default: "income",
    },
    date: {
      type: Date,
      require: true,
      trim: true,
    },
    category: {
      type: String,
      require: true,
      trim: true,
    },
    decription: {
      type: String,
      require: false,
      trim: true,
      maxLenght: 100,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Income", IncomeSchema);
