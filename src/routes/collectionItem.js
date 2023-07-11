const {
  getAllCollectionItemsByCollectionId,
  createCollectionItem,
  editCollectionItem,
  deleteCollectionItem,
  likeCollectionItem,
  unlikeCollectionItem,
  getLastestCollectionItems
} = require('../controllers/collectionItems');
const { ensureAuthenticated } = require('../middlewares/ensureAuthenticated');
const router = require('express').Router();

router.route('/collections/byCollectionId/items').get(getAllCollectionItemsByCollectionId);
router.route('/collections/:collectionId/items/create').post(ensureAuthenticated, createCollectionItem);
router.route('/collections/items/update/:itemId').put(ensureAuthenticated, editCollectionItem);
router.route('/collections/items/delete/:itemId').delete(ensureAuthenticated, deleteCollectionItem);
router.route('/collections/items/:itemId/like').post(ensureAuthenticated, likeCollectionItem);
router.route('/collections/items/:itemId/unlike').post(ensureAuthenticated, unlikeCollectionItem)
router.route('/collections/items/lastest').get(getLastestCollectionItems)

module.exports = router