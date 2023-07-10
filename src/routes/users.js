const express = require('express');
const router = express.Router();
const {
  getAllUsers,
  getUserById,
  changeStatusOfUser,
  addOrRemoveUserAsAdmin,
  deleteUser
} = require('../controllers/users');
const { isAuthenticatedAndAdmin } = require('../middlewares/guardAdmin');
router.route('/users').get(isAuthenticatedAndAdmin, getAllUsers)
router.route('/users/:id').get(isAuthenticatedAndAdmin, getUserById);
router.route('/users/status').put(isAuthenticatedAndAdmin, changeStatusOfUser);
router.route('/users/role').put(isAuthenticatedAndAdmin, addOrRemoveUserAsAdmin);
router.route('/users/delete').delete(isAuthenticatedAndAdmin, deleteUser)

module.exports = router