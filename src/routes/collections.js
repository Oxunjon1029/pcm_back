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
const passport = require('passport')
const auth = passport.authenticate('jwt', { session: true });
router.route('/collection').get(auth, getAllCollections);
router.route('/collection/:id').get(auth, getCollectionById)
router.route('/collections/create').post(auth, createCollection);
router.route('/collections/edit/:id').put(auth, editCollection);
router.route('/collections/delete/:id').delete(auth, deleteCollection);
router.route('/collections/s3Url').get(auth, getS3Url)
router.route('/collections/largest').get(getLargestFiveCollections)
module.exports = router