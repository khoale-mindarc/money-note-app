const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
      trim: true,
      maxLenght: 50,
    },
    image: {
      type: String,
      require: false,
      trim: true,
      maxLenght: 200,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Category", CategorySchema);
