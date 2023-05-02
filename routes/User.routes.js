const express = require("express");
const { UserModel } = require("../model/User.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userRoutes = express.Router();

// to register user
userRoutes.post("/register", async (req, res) => {
  const { password } = req.body;
  try {
    bcrypt.hash(password, 5, async (err, hash) => {
      if (err) {
        res.status(400).send({ err: err.message });
      }

      const user = new UserModel({ ...req.body, password: hash });
      await user.save();
      res.status(200).send({ msg: "User Registered" });
    });
  } catch (error) {
    res.status(400).send({ err: error.message });
  }
});

// to login user
userRoutes.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    
    const user1 = await UserModel.findOne({email});

    console.log(user1);
    bcrypt.compare(password, user1.password, async (err, result) => {
      if (err) {
        res.status(400).send({ err: err.message });
      }

      if (result) {
        const token = jwt.sign(
            { userID: user1._id, username: user1.name },
          "masai"
        );

        res.status(200).send({'msg': "login successfull", token})
      }
    });


   
  } catch (error) {
    res.status(400).send({ err: error.message });
  }
});

module.exports = {
  userRoutes,
};
