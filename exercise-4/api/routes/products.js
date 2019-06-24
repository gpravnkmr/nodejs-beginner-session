const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    return res.status(200).json({
        message: 'Get product works!'
    });
});

router.post('/', (req, res, next) => {
    const product = {
        name: req.body.name,
        price: req.body.price
    }
    return res.status(201).json({
        message: 'POST product works!',
        createdProduct: product
    });
});

router.get('/:productId', (req, res, next) => {
    const productId = req.params.productId;
    return res.status(200).json({
        message: 'GET product by ID works!' + productId
    });
});

router.patch('/:productId', (req, res, next) => {
    const productId = req.params.productId;
    return res.status(201).json({
        message: 'PATCH product works!' + productId
    });
});

router.delete('/:productId', (req, res, next) => {
    const productId = req.params.productId;
    return res.status(201).json({
        message: 'DELETE product by Id works!' + productId
    });
});

module.exports = router;