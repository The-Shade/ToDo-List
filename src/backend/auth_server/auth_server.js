require('dotenv').config({ path: "../../../config/.env.auth_server" });

const express = require('express');
const app = express();
const router = require('./auth_routes');
const jwt = require("jsonwebtoken");
app.use(express.json());
app.use("/auth", router);

const tokenStore = [];

app.listen(process.env.PORT, () => {
    console.log(`Auth server started at http://localhost:${process.env.PORT}`);
});