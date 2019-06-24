const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Product = require('../models/product');

router.get('/', (req, res, next) => {
    Product.find().exec().then(result => {
        if (result && result.length > 0) {
            return res.status(200).json(result);
        } else {
            return res.status(404).json({
                message: 'No products found!'
            });
        }
    }).catch(error => {
        console.log(error);
        res.status(500).json({
            error: error
        });
    });

});

router.post('/', (req, res, next) => {
    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price
    });

    product.save().then(result => {
        console.log(result);
        return res.status(201).json(product);
    }).catch(error => {
        console.log(error);
        res.status(500).json({
            error: error
        });
    });
});

router.get('/:productId', (req, res, next) => {
    const productId = req.params.productId;
    Product.findById(productId).exec().then(result => {
        console.log(result);
        if (result) {
            return res.status(200).json(result);
        } else {
            return res.status(404).json({
                message: 'No product with ID found!'
            });
        }

    }).catch(error => {
        console.log(error);
        res.status(500).json({
            error: error
        });
    });
});

router.patch('/:productId', (req, res, next) => {
    const productId = req.params.productId;
    const updateOps = {};
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.propValue;
    }
    Product.update({ _id: productId }, {
        $set: updateOps
    }).exec()
        .then(result => {
            return res.status(201).json(result);
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                error: error
            });
        });
});

router.delete('/:productId', (req, res, next) => {
    const productId = req.params.productId;
    Product.remove({ _id: productId }).exec().then(result => {
        console.log(result);
        return res.status(200).json({
            message: 'DELETE successful!'
        });
    }).catch(error => {
        console.log(error);
        res.status(500).json({
            error: error
        });
    });
});

module.exports = router;