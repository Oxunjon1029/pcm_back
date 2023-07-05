const {
  searchFullText,
  searchItemsByTag
} = require('../controllers/search');

const router = require('express').Router();

router.route('/itemOrComment/search').get(searchFullText);
router.route('/itemsByTag/search').get(searchItemsByTag)
module.exports = router