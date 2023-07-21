const router = require('express').Router();
const {
  getAllCollections,
  createCollection,
  editCollection,
  deleteCollection,
  getS3Url,
  getLargestFiveCollections,
  getCollectionById,
  removeCustomField
} = require('../controllers/collections');
const { ensureAuthenticated } = require('../middlewares/ensureAuthenticated');

router.route('/collection').get(ensureAuthenticated, getAllCollections);
router.route('/collection/:id').get(getCollectionById)
router.route('/collections/create').post(ensureAuthenticated, createCollection);
router.route('/collections/edit/:id').put(ensureAuthenticated, editCollection);
router.route('/collections/delete/:id').delete(ensureAuthenticated, deleteCollection);
router.route('/collections/s3Url').get(ensureAuthenticated, getS3Url)
router.route('/collection/items/customfield/remove').post(ensureAuthenticated, removeCustomField)
router.route('/collections/largest').get(getLargestFiveCollections)

module.exports = router