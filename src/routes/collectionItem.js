const {
  getAllCollectionItemsByCollectionId,
  createCollectionItem,
  editCollectionItem,
  deleteCollectionItem,
  likeCollectionItem,
  unlikeCollectionItem,
  getLastestCollectionItems
} = require('../controllers/collectionItems');
const router = require('express').Router();
router.route('/collections/byCollectionId/items').get(getAllCollectionItemsByCollectionId);
router.route('/collections/:collectionId/items/create').post(createCollectionItem);
router.route('/collections/items/update/:itemId').put(editCollectionItem);
router.route('/collections/items/delete/:itemId').delete(deleteCollectionItem);
router.route('/collections/items/:itemId/like').post(likeCollectionItem);
router.route('/collections/items/:itemId/unlike').post(unlikeCollectionItem)
router.route('/collections/items/lastest').get(getLastestCollectionItems)
module.exports = router