const { getAllTopic, createTopic } = require('../controllers/topic');

const router = require('express').Router();

router.route('/topic').get(getAllTopic)
router.route('/topic/create').post(createTopic)


module.exports = router