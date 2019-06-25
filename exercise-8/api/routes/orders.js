const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Order = require('../models/orders');
const Product = require('../models/product');

router.get('/', (req, res, next) => {
    Order.find()
        .select("product quantity _id")
        .populate('product', 'name')
        .exec().then(result => {
            res.status(200).json(result.map(order => {
                return {
                    _id: order._id,
                    product: order.product,
                    quantity: order.quantity,
                    links: [
                        { type: "GET", description: "GET orders by ID", URL: "http://localhost:3000/orders/" + order._id }
                    ]
                }
            }));
        }).catch(error => {
            console.log(error);
            res.status(500).json({
                error: error
            });
        });
});

router.post('/', (req, res, next) => {
    Product.findById(req.body.productId).exec().then(product => {
        if (product) {
            const order = new Order({
                _id: new mongoose.Types.ObjectId(),
                product: req.body.productId,
                quantity: req.body.quantity
            });
            return order.save()
        } else {
            return res.status(404).json({
                error: {
                    message: 'Product not found!'
                }
            });
        }
    }).then(result => {
        res.status(201).json({
            _id: result._id,
            product: result.productId,
            quantity: result.quantity,
            links: [
                { type: "GET", description: "GET orders by ID", URL: "http://localhost:3000/orders/" + result._id }
            ]
        });
    }).catch(error => {
        console.log(error);
        res.status(500).json({
            error: error
        });
    });

});

router.get('/:orderId', (req, res, next) => {
    const orderId = req.params.orderId;
    Order.findById(orderId)
        .populate('product').exec().then(result => {
            res.status(200).json({
                _id: result._id,
                product: result.product,
                quantity: result.quantity,
                links: [
                    { type: "GET", description: "GET orders by ID", URL: "http://localhost:3000/orders/" + result._id }
                ]
            });
        }).catch(error => {
            console.log(error);
            res.status(500).json({
                error: error
            });
        });
});

router.delete('/:orderId', (req, res, next) => {
    const orderId = req.params.orderId;
    Order.remove({ _id: orderId }).exec().then(result => {
        res.status(200).json({
            message: 'Order cancelled successfully!'
        });
    }).catch(error => {
        console.log(error);
        res.status(500).json({
            error: error
        });
    });
});

module.exports = router;