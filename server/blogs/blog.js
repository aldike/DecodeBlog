const mongoose = require('mongoose');
const Schema = mongoose.Schema
const BlogSchema = new mongoose.Schema({
    title: String,
    category: {type: Schema.Types.ObjectId, ref: 'Category'},
    image: String,
    description: String,
    author: {type: Schema.Types.ObjectId, ref: 'User'}
})

module.exports = mongoose.model('Blog', BlogSchema)