const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

router.post('/signup', (req, res, next) => {
    User.find({ email: req.body.email }).exec().then(user => {
        if (user.length > 0) {
            return res.status(422).json({ message: 'User already exists!' })
        } else {
            bcrypt.hash(req.body.password, 10, (err, hash) => {
                if (err) {
                    return res.status(500).json({ error: err })
                } else {
                    const user = new User({
                        _id: new mongoose.Types.ObjectId(),
                        email: req.body.email,
                        password: hash
                    });
                    user.save().then(result => {
                        res.status(201).json({
                            _id: result._id,
                            email: result.email
                        });
                    }).catch(error => {
                        console.log(error);
                        res.status(500).json({
                            error: error
                        });
                    });
                }
            });
        }
    }).catch(error => {
        console.log(error);
        res.status(500).json({
            error: error
        });
    });

});

router.post('/signin', (req, res, next) => {
    User.findOne({ email: req.body.email }).exec().then(result => {
        if (result) {
            bcrypt.compare(req.body.password, result.password, (err, hashRes) => {
                if (err) {
                    return res.status(500).json({ message: 'Authentication failed!' });
                }
                if (hashRes) {
                    const token = jwt.sign({
                        email: result.email,
                        userId: result._id
                    }
                        , process.env.JWT_PRIVATE_KEY
                        , {
                            expiresIn: "1h"
                        })
                    return res.status(200).json({ message: 'Authentication successful!', token: token });
                } else {
                    return res.status(500).json({ message: 'Authentication failed!' });
                }
            });
        } else {
            res.status(500).json({ message: 'Authentication failed!' });
        }
    }).catch(error => {
        res.json(500).json({ error: error });
    })
});

router.delete('/:userId', (req, res, next) => {
    User.remove({ _id: req.params.userId }).exec().then(result => {
        res.status(200).json({
            message: 'User removed successfully!'
        })
    }).catch(error => {
        res.status(500).json({
            error: error
        })
    });
});

module.exports = router;