const express = require('express');
const router = express();
const ProductsControllers = require('../controllers/products');

router.get('/',ProductsControllers.get_all);

module.exports = router;