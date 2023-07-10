const {
  getAllCollectionItemsByCollectionId,
  createCollectionItem,
  editCollectionItem,
  deleteCollectionItem,
  likeCollectionItem,
  unlikeCollectionItem,
  getLastestCollectionItems
} = require('../controllers/collectionItems');
const { isAuthenticated } = require('../middlewares/auth');

const router = require('express').Router();

router.route('/collections/byCollectionId/items').get(getAllCollectionItemsByCollectionId);
router.route('/collections/:collectionId/items/create').post(isAuthenticated, createCollectionItem);
router.route('/collections/items/update/:itemId').put(isAuthenticated, editCollectionItem);
router.route('/collections/items/delete/:itemId').delete(isAuthenticated, deleteCollectionItem);
router.route('/collections/items/:itemId/like').post(isAuthenticated, likeCollectionItem);
router.route('/collections/items/:itemId/unlike').post(isAuthenticated, unlikeCollectionItem)
router.route('/collections/items/lastest').get(getLastestCollectionItems)
module.exports = router