const { StatusCodes } = require("http-status-codes");
const User = require("../models/users");
const Collections = require('../models/collections')
const Items = require('../models/collectionItems')

const getAuthUser = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(StatusCodes.UNAUTHORIZED).json({
        messsage: 'This user is unathorized'
      })
    }
    return res.status(StatusCodes.OK).json(req.user)
  } catch (err) {
    if (err) res.status(StatusCodes.BAD_REQUEST).json({ err })
  }
}
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({})
    if (users) {
      return res.status(StatusCodes.OK).json(users)
    } else res.status(StatusCodes.BAD_REQUEST).json({
      message: "Something went wrong"
    })
  } catch (err) {
    if (err) res.status(StatusCodes.BAD_REQUEST).json({ err })
  }
}


const getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findOne({ _id: id });
    if (!user) res.status(StatusCodes.BAD_GATEWAY).json({
      message: 'Something went wrong'
    })
    return res.status(StatusCodes.OK).json(user)
  } catch (error) {
    if (error) res.status(StatusCodes.BAD_REQUEST).json({ error })
  }
}


const deleteUser = async (req, res) => {
  const { selectedIds } = req.body;
  try {
    if (selectedIds?.length === 1) {
      const collections = await Collections.find({ createdBy: selectedIds[0] });
      collectionIds = collections.map((collection) => collection._id);
      await Items.deleteMany({ collectionId: { $in: collectionIds } })
      await Collections.deleteMany({ createdBy: selectedIds[0] })
      await User.findByIdAndDelete(selectedIds[0]);
      const Users = await User.find({})
      return res.status(StatusCodes.OK).json({
        message: 'User successfully deleted',
        users: Users
      })
    } else {
      const collections = await Collections.find({ createdBy: { $in: selectedIds } });
      collectionIds = collections.map((collection) => collection._id);
      await Items.deleteMany({ collectionId: { $in: collectionIds } })
      await Collections.deleteMany({ createdBy: { $in: selectedIds } })
      await User.deleteMany({ _id: { $in: selectedIds } });
      const Users = await User.find({})
      return res.status(StatusCodes.OK).json({
        message: 'All Users deleted successfully',
        users: Users
      })
    }
  } catch (error) {
    if (error) res.status(StatusCodes.BAD_REQUEST).json({ error })
  }
}


const changeStatusOfUser = async (req, res) => {
  const { selectedIds, status } = req.body;

  try {
    if (selectedIds?.length === 1) {
      const user = await User.findByIdAndUpdate(selectedIds[0], { status: status }, { new: true });
      if (!user) res.status(StatusCodes.BAD_REQUEST).json({
        message: "Something went wrong"
      })
      const Users = await User.find({})
      return res.status(StatusCodes.CREATED).json({
        message: `${status === 'active' ? "User successfully activated" : 'User successfully blocked'}`,
        users: Users
      })
    } else {

      const users = await User.updateMany({ _id: { $in: selectedIds } }, { $set: { 'status': status } });
      if (users.modifiedCount === 0) res.status(StatusCodes.BAD_REQUEST).json({
        message: "Something went wrong",

      })
      const Users = await User.find({})
      return res.status(StatusCodes.OK).json({
        message: `${status === 'active' ? "All users'status successfully activated" : "All users'status successfully blocked"}`,
        users: Users
      })
    }
  } catch (err) {
    if (err) res.status(StatusCodes.BAD_REQUEST).json({ err })
  }

}

const addOrRemoveUserAsAdmin = async (req, res) => {
  const { selectedIds, role } = req.body;

  try {
    if (selectedIds?.length === 1) {
      const user = await User.findByIdAndUpdate(selectedIds[0], { role: role }, { new: true });
      if (!user) res.status(StatusCodes.BAD_REQUEST).json({
        message: "Something went wrong"
      })
      const Users = await User.find({})
      return res.status(StatusCodes.CREATED).json({
        message: `${role === 'user' ? "Removed from admins" : 'Added to admins'}`,
        users: Users
      })
    } else {

      const users = await User.updateMany({ _id: { $in: selectedIds } }, { $set: { 'role': role } });
      if (users.modifiedCount === 0) res.status(StatusCodes.BAD_REQUEST).json({
        message: "Something went wrong",

      })
      const Users = await User.find({})
      return res.status(StatusCodes.OK).json({
        message: `${role === 'user' ? "Removed from admins" : 'Added to admins'}`,
        users: Users
      })
    }
  } catch (err) {
    if (err) res.status(StatusCodes.BAD_REQUEST).json({ err })
  }
}
module.exports = {
  getAllUsers,
  getUserById,
  deleteUser,
  changeStatusOfUser,
  addOrRemoveUserAsAdmin,
  getAuthUser
}