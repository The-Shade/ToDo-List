require('dotenv').config({ path: '../../../config/.env.server' });

const express = require('express');
const path = require('path');
const app = express();
const router = require('./serverRouter');

app.use(express.json());
app.use('/', express.static(path.join(__dirname, '../../frontend/tasks/')));
app.use('/task/', router);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../../frontend/tasks/index.html'));
})

app.listen(process.env.SERVER_PORT, () => {
    console.log(`Server started on port ${process.env.SERVER_PORT}`);
});