const mongoose = require('mongoose');

const Product = require('../models/product');

exports.products_get_all = (req, res, next) => {
    Product.find().exec().then(result => {
        if (result && result.length > 0) {
            return res.status(200).json({
                count: result.length,
                products: result.map(product => {
                    return {
                        _id: product._id,
                        name: product.name,
                        price: product.price,
                        links: [
                            { type: "GET", description: "GET product by ID", URL: "http://localhost:3000/products/" + product._id }
                        ]
                    }
                })
            });
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

}

exports.products_create = (req, res, next) => {
    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price
    });

    product.save().then(result => {
        return res.status(201).json({
            _id: result._id,
            name: result.name,
            price: result.price,
            links: [
                { type: "GET", description: "GET product by ID", URL: "http://localhost:3000/products/" + result._id }
            ]
        });
    }).catch(error => {
        console.log(error);
        res.status(500).json({
            error: error
        });
    });
}

exports.products_get_one = (req, res, next) => {
    const productId = req.params.productId;
    Product.findById(productId).exec().then(result => {
        console.log(result);
        if (result) {
            return res.status(200).json({
                _id: result._id,
                name: result.name,
                price: result.price,
                links: [
                    { type: "GET", description: "GET product by ID", URL: "http://localhost:3000/products/" + result._id }
                ]
            });
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
}

exports.products_update = (req, res, next) => {
    const productId = req.params.productId;
    const updateOps = {};
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.propValue;
    }
    Product.update({ _id: productId }, {
        $set: updateOps
    }).exec()
        .then(result => {
            return res.status(201).json({
                _id: result._id,
                name: result.name,
                price: result.price,
                links: [
                    { type: "GET", description: "GET product by ID", URL: "http://localhost:3000/products/" + result._id }
                ]
            });
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                error: error
            });
        });
}

exports.products_delete = (req, res, next) => {
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
}