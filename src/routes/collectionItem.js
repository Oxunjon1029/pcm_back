const {
  getAllCollectionItemsByCollectionId,
  createCollectionItem,
  editCollectionItem,
  deleteCollectionItem,
  likeCollectionItem,
  unlikeCollectionItem,
  getLastestCollectionItems
} = require('../controllers/collectionItems');
const passport = require('passport')
const auth = passport.authenticate('jwt', { session: true });
const router = require('express').Router();
router.route('/collections/byCollectionId/items').get(auth, getAllCollectionItemsByCollectionId);
router.route('/collections/:collectionId/items/create').post(auth, createCollectionItem);
router.route('/collections/items/update/:itemId').put(auth, editCollectionItem);
router.route('/collections/items/delete/:itemId').delete(auth, deleteCollectionItem);
router.route('/collections/items/:itemId/like').post(auth, likeCollectionItem);
router.route('/collections/items/:itemId/unlike').post(auth, unlikeCollectionItem)
router.route('/collections/items/lastest').get(getLastestCollectionItems)
module.exports = router