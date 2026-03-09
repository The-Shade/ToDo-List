require('dotenv').config({ path: "../../../config/secrets/.env.db" });
require('dotenv').config({ path: "../../../config/secrets/.env.jwt_secrets" });

const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const { MongoClient } = require('mongodb');
const client = new MongoClient(process.env.MONGODB_URI);
const users = client.db(process.env.DB_NAME).collection(process.env.USERS_COLLECTION_NAME);

router.post('/login/', (req, res) => {
    try {
        users.findOne({ username: req.body.username })
            .then(result => {
                const authResult = result.password === req.body.password;
                if (!result || !authResult ) {
                    res.status(401).send({message: 'Invalid Credentials'});
                    return;
                }
                result.password = "";
                const token = jwt.sign(result, process.env.JWT_ACCESS_SECRET);
                res.status(200).json({ token: token });
            });
    } catch(err) {
        res.status(500).send({ error: err.message });
        console.log(err);
    }
});

router.post('/register/', (req, res) => {
    try {
        users.findOne({ username: req.body.username })
            .then(result => {
                if (result) {
                    res.status(401).send({message: 'Username already exists'});
                    return;
                }
                users.insertOne({ username: req.body.username, password: req.body.password })
                    .then(result => {
                        res.status(200).json(result);
                    });
            });
    } catch (err) {
        res.status(500).send({ error: err.message });
        console.log(err);
    }
});

module.exports = router;