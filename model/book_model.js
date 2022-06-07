const mongoose = require('mongoose')

const databaseConnection = require('../database/database')

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    isbn: {
        type: Number,
        required: true
    },
    price: {
        type: String,
        default: 0
    },
    author: {
        type: String,
        default: "------"
    }
})

const BookModel = mongoose.model('book', bookSchema)

module.exports = BookModel;