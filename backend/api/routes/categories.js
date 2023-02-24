const express = require('express');
const router = express();
const CategoriesControllers = require('../controllers/categories');

router.get('/',CategoriesControllers.get_all);
router.get('/list',CategoriesControllers.get_categories);

module.exports = router;