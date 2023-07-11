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
  try {
    const user = await User.findOne({ email: email });
    if (user) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: "User already registered",
      });
    } else {
      User.create({ name: name, email: email, hash_password: hash_password, role: role }).then((data, err) => {
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
  const { email, password } = req.body
  try {
    if (!email || !password) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: "Please enter email and password",
      });
    }

    const user = await User.findOne({ email: email });
    if (user) {

      if (await bcrypt.compare(password, user.hash_password) && user.status === 'active') {
        const { _id, name, email, status, role } = user;
        const token = jwt.sign(
          { user: user },
          process.env.JWT_SECRET, { expiresIn: process.env.EXPIRE_TIME });
        return res.status(StatusCodes.OK).json({
          token,
          user: { _id, name, email, status, role }
        });
      } else {
        return res.status(StatusCodes.UNAUTHORIZED).json({
          message: "This user is unauthorized or blocked!",
        });
      }
    }
    return res.status(StatusCodes.BAD_REQUEST).json({
      message: "User does not exist..!",
    });
  } catch (error) {
    if (error) res.status(StatusCodes.BAD_REQUEST).json({ error });
  }
};
module.exports = { signUp, signIn };