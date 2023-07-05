const { StatusCodes } = require("http-status-codes");
const User = require("../models/users");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const signUp = async (req, res) => {
  const { name, email, password, role } = req.body;
  if (!name || !email || !password) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      message: "Please Provide Required Information",
    });
  }

  const hash_password = await bcrypt.hash(password, 10);

  const userData = {
    name,
    email,
    hash_password,
    role
  };

  try {
    const user = await User.findOne({ email });
    if (user) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: "User already registered",
      });
    } else {
      User.create(userData).then((data, err) => {
        if (err) res.status(StatusCodes.BAD_REQUEST).json({ err });
        else
          res
            .status(StatusCodes.CREATED)
            .json({ message: "User created Successfully" });
      });
    }
  } catch (error) {
    if (error) res.status(StatusCodes.BAD_REQUEST).json({ error })
  }
};

const signIn = async (req, res) => {
  try {
    if (!req.body.email || !req.body.password) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: "Please enter email and password",
      });
    }

    const user = await User.findOne({ email: req.body.email });
    if (user) {
      if (await bcrypt.compare(req.body.password, user.hash_password) && user.status === 'active') {
        const token = jwt.sign(
          { _id: user._id },
          process.env.JWT_SECRET, { expiresIn: process.env.EXPIRE_TIME });
        const { _id, name, email, status, role } = user;
        return res.status(StatusCodes.OK).json({
          token,
          user: { _id, name, email, status, role },
        });
      } else {
        return res.status(StatusCodes.UNAUTHORIZED).json({
          message: "This user is unauthorized or blocked!",
        });
      }
    } else {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: "User does not exist..!",
      });
    }
  } catch (error) {
    if (error) res.status(StatusCodes.BAD_REQUEST).json({ error });
  }
};
module.exports = { signUp, signIn };