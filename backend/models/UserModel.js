const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

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
         unique: true,
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
         trim: true,
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
      },
   },
   { timestamps: true }
);

UserSchema.pre("save", async function (next) {
   try {
      //Generate a salt
      const salt = await bcrypt.genSalt(10);
      //Generate a password hash (salt + hash)
      const passwordHashed = await bcrypt.hash(this.password, salt);
      //reassign password hashed
      this.password = passwordHashed;

      next();
   } catch (error) {
      next(error);
   }
});

UserSchema.methods.isValidPassword = async function (newPassword) {
   try {
      return await bcrypt.compare(newPassword, this.password);
   } catch (error) {
      throw new Error(error);
   }
};

module.exports = mongoose.model("Users", UserSchema);
