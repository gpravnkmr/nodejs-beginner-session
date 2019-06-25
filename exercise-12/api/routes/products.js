const express = require('express');
const router = express.Router();

const checkAuth = require('../middleware/check-auth');
const ProductController = require('../controllers/products');

router.get('/', ProductController.products_get_all);

router.post('/', checkAuth, ProductController.products_create);

router.get('/:productId', ProductController.products_get_one);

router.patch('/:productId', checkAuth, ProductController.products_update);

router.delete('/:productId', checkAuth, ProductController.products_delete);

module.exports = router;