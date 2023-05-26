require('dotenv').config();
const mongoose = require('mongoose');
const DB =process.env.DATABASE;
const connection = mongoose.connect(DB, {
    useUnifiedTopology: true,
    useNewUrlParser: true
}).then(() => console.log("Connection start")).catch((error) => console.log(error.message));

module.exports = connection;