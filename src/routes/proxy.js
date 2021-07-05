const express = require('express');
const { getItems, getItem } = require('../services/ml');

const router = express.Router();

router.route('/items').get(getItems);
router.route('/items/:id').get(getItem);

module.exports = router;
