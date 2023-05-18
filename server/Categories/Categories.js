const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
    name: String,
    key: Number
})

module.exports = mongoose.model('Category', CategorySchema)