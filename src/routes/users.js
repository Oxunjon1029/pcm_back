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
const { ensureAuthenticated } = require('../middlewares/ensureAuthenticated');

router.route('/users').get(ensureAuthenticated, isAuthenticatedAndAdmin, getAllUsers)
router.route('/users/:id').get(ensureAuthenticated, isAuthenticatedAndAdmin, getUserById);
router.route('/users/status').put(ensureAuthenticated, isAuthenticatedAndAdmin, changeStatusOfUser);
router.route('/users/role').put(ensureAuthenticated, isAuthenticatedAndAdmin, addOrRemoveUserAsAdmin);
router.route('/users/delete').delete(ensureAuthenticated, isAuthenticatedAndAdmin, deleteUser)

module.exports = router