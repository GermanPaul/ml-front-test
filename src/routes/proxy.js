const express = require('express');
const router = express.Router();
const { getItems, getItem } = require('../controllers/ml');

router.route('/items').get(getItems);
router.route('/items/:id').get(getItem);

module.exports = router;