require('dotenv').config({ path: '../../../config/.env.server' });

const express = require('express');
const app = express();
const router = require('./serverRouter');

app.use(express.json());
app.use('/task/', router);

app.get('/', (req, res) => {
    res.send("Home Page.html");
})

app.listen(process.env.SERVER_PORT, () => {
    console.log(`Server started on port ${process.env.SERVER_PORT}`);
});