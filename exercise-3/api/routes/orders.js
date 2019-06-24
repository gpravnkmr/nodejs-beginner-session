const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    return res.status(200).json({
        message: 'Get order works!'
    });
});

router.post('/', (req, res, next) => {
    return res.status(201).json({
        message: 'POST order works!'
    });
});

router.get('/:orderId', (req, res, next) => {
    const orderId = req.params.orderId;
    return res.status(200).json({
        message: 'GET order by ID works!' + orderId
    });
});

router.delete('/:orderId', (req, res, next) => {
    const orderId = req.params.orderId;
    return res.status(201).json({
        message: 'DELETE order by Id works!' + orderId
    });
});

module.exports = router;