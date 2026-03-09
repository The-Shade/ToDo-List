require('dotenv').config({ path: `../../../config/secrets/.env.db` });

const express = require('express');
const router = express.Router();

const { MongoClient } = require('mongodb');
let client = new MongoClient(process.env.MONGODB_URI);
let tasks = client.db(process.env.DB_NAME).collection(process.env.TASKS_COLLECTION_NAME);

router.get('/', async (req, res) => {
    try {
        const result = tasks.find();
        let data = [];
        for await (const task of result) {
            data.push(task);
        }
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
        console.log(error);
    }
});

router.get('/:taskId', async (req, res) => {
    try {
        tasks
            .findOne({ _id: req.params.taskId })
        .then(result => {
            res.status(200).json(result);
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
        console.log(error);
    }
});

router.post('/', async (req, res) => {
    try {
        tasks.insertOne(req.body)
        .then(result => {
            res.status(200).json(result);
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.put('/:taskId', async (req, res) => {
    const update = { $set: req.body }, filter = { _id: req.params.taskId };
    try {
        tasks.updateOne(filter, update)
        .then(result => {
            res.status(200).json(result);
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.delete('/:taskId', async (req, res) => {
    try {
        tasks.deleteOne({ _id: req.params.taskId })
        .then(result => {
            res.status(200).json(result);
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;