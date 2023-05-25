const mongoose = require('mongoose');
const DB = "mongodb+srv://dhruv:dhruv@cluster0.ahz7xbh.mongodb.net/CRUD"
const connection = mongoose.connect(DB, {
    useUnifiedTopology: true,
    useNewUrlParser: true
}).then(() => console.log("Connection start")).catch((error) => console.log(error.message));

module.exports = connection;