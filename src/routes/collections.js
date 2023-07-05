const router = require('express').Router();
const {
  getAllCollections,
  createCollection,
  editCollection,
  deleteCollection,
  getS3Url,
  getLargestFiveCollections
} = require('../controllers/collections');

router.route('/collection').get(getAllCollections);
router.route('/collections/create').post(createCollection);
router.route('/collections/edit/:id').put(editCollection);
router.route('/collections/delete/:id').delete(deleteCollection);
router.route('/collections/s3Url').get(getS3Url)
router.route('/collections/largest').get(getLargestFiveCollections)
module.exports = router