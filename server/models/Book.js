const mongoose = require('mongoose');

const BookSchema = mongoose.Schema({
  id: Number,
  title: String
});

const Book = mongoose.model('Book', BookSchema);

module.exports = Book;
