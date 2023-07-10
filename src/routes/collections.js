const router = require('express').Router();
const {
  getAllCollections,
  createCollection,
  editCollection,
  deleteCollection,
  getS3Url,
  getLargestFiveCollections,
  getCollectionById
} = require('../controllers/collections');
const { isAuthenticated } = require('../middlewares/auth');

router.route('/collection').get(isAuthenticated, getAllCollections);
router.route('/collection/:id').get(isAuthenticated, getCollectionById)
router.route('/collections/create').post(isAuthenticated, createCollection);
router.route('/collections/edit/:id').put(isAuthenticated, editCollection);
router.route('/collections/delete/:id').delete(isAuthenticated, deleteCollection);
router.route('/collections/s3Url').get(isAuthenticated, getS3Url)
router.route('/collections/largest').get(getLargestFiveCollections)
module.exports = router