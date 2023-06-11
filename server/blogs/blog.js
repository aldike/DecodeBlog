const mongoose = require('mongoose');
const Schema = mongoose.Schema

const BlogSchema = new mongoose.Schema({
    title: String,
    category: {type: Schema.Types.ObjectId, ref: 'Category'},
    image: String,
    description: String,
    date: {
        type: String,
        default: () => {
          const date = new Date();
          const options = { year: 'numeric', month: '2-digit', day: '2-digit', timeZone: 'Asia/Dhaka' };
          return date.toLocaleDateString('en-US', options).replace(/\//g, '.');
        }
    },
    author: {type: Schema.Types.ObjectId, ref: 'User'}
})

module.exports = mongoose.model('Blog', BlogSchema)

