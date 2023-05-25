require('dotenv').config();
const express = require('express');
const connection = require('./db/conn');
const app = express();
const cors = require('cors');
const router = require('./routes/router');

const port = 8002;

app.use(cors());
app.use(express.json());

app.use(router);

connection;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})