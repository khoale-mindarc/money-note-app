const UserSchema = require('../models/UserModel');
const bcrypt = require("bcrypt");

const validatePassword = (password) => {
    return password.match(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/
    )
};

exports.login = async (request, response) => {
    let bodyRequest = request.body;
    const user = await UserSchema.findOne({ email: bodyRequest.email });
    if (user) {
      const validPassword = await bcrypt.compare(bodyRequest.password, user.password);
      if (validPassword) {
        response.status(200).json({ status: "OK" });
      } else {
        response.status(400).json({ error: "Password is incorrect!!!" });
      }
    } else {
        response.status(401).json({ error: "Email is incorrect!!!" });
    }
}

exports.logout = async (request, response) => {
    console.log("logout");
}

exports.createUser = async (req, res) => {
    const { username, email, phone, password, name, age } = req.body;

    const user = UserSchema({
        username,
        email,
        phone,
        password,
        name,
        age
    });
    try {
        if(!username) {
            return res.status(400).json({
                status: "Error 400: Bad Request",
                message: "username is required"
            })
        }
        if(!email) {
            return res.status(400).json({
                status: "Error 400: Bad Request",
                message: "email is required"
            })
        }
        if(!phone) {
            return res.status(400).json({
                status: "Error 400: Bad Request",
                message: "phone is required"
            })
        }
        if(!password) {
            return res.status(400).json({
                status: "Error 400: Bad Request",
                message: "password is required"
            })
        }
        if (!validatePassword(password)) {
            return res.status(400).json({
                status: "Error 400: Bad Request",
                message: "password is not valid"
            })
        }
    
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);

        await user.save();
        res.status(200).json({ message: "User saved successfully!" });
    }catch (err) {
        res.status(500).json({ err });
        res.status(500).json({ message: "Server Error!" });
    }
}

exports.getUsers = async (req, res) => {
    try {
      const users = await UserSchema.find().sort({ createdAt: -1 });
      res.status(200).json(users);
    } catch (err) {
      res.status(500).json({ message: "Server Error!" });
    }
  };