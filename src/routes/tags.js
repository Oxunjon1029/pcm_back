const { getAllTags, createTags } = require('../controllers/tags');

const router = require('express').Router();

router.route('/tags').get(getAllTags)
router.route('/tags/create').post(createTags)


module.exports = router