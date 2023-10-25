// app.js

const express = require('express');

const Book = require('./book');
const connect = require('./connect');
const app = express();
app.set( __dirname+ "/index.html");
app.use(express.urlencoded({extended: true}));



app.use(express.json());

// Routes
app.get('/api/books', async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching books', error });
  }
});

app.post('/api/books', async (req, res) => {
  const { title, author, genre } = req.body;
  try {
    const book = await Book.create({ title, author, genre });
    res.status(201).json(book);
  } catch (error) {
    res.status(500).json({ message: 'Error creating book', error });
  }
});

app.get('/api/books/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const book = await Book.findById(id);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    res.json(book);
  } catch (error) {
    res.status(500).json({ message: 'Error finding book', error });
  }
});

app.patch('/api/books/:id', async (req, res) => {
  const { id } = req.params;
  const { title, author, genre } = req.body;
  try {
    const book = await Book.findByIdAndUpdate(id, { title, author, genre }, { new: true });
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    res.json(book);
  } catch (error) {
    res.status(500).json({ message: 'Error updating book', error });
  }
});

app.delete('/api/books/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const book = await Book.findByIdAndDelete(id);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    res.json({ message: 'Book deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting book', error });
  }
});

const port = 3000;
app.listen(port, () => {

  console.log(`Server running on http://localhost:${port}`);
  connect();
});
