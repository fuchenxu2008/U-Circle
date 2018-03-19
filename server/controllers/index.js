const Book = require('../models/Book');

module.exports = {
  getBooks: (req, res) => {
    Book.find({}, (err, books) => {
      if (err) return res.json({ message: 'Unknown error occured!' });
      if (!books) return res.json({ message: 'No book found!' });
      return res.send(books);
    });
  },
};
