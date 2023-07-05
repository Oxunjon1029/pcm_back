const express = require('express');
const router = express.Router();
const {
  getAllUsers,
  getUserById,
  changeStatusOfUser,
  addOrRemoveUserAsAdmin,
  deleteUser
} = require('../controllers/users')

router.route('/users').get(getAllUsers)
router.route('/users/:id').get(getUserById);
router.route('/users/status').put(changeStatusOfUser);
router.route('/users/role').put(addOrRemoveUserAsAdmin);
router.route('/users/delete').delete(deleteUser)

module.exports = router