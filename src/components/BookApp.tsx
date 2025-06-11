import { useEffect, useState } from 'react';
import '../data/Book.json'
import './BookApp.scss';

type Book = {
  id: number;
  title: string;
  author: string;
  rating: number;
};

const BookApp = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [editId, setEditId] = useState<number | null>(null);

  // Load from JSON on mount
  useEffect(() => {
    import('../data/Book.json').then(data => {
      setBooks(data.default);
    });
  }, []);

  const showAlert = (message: string) => {
    alert(message);
  };

  const resetForm = () => {
    setTitle('');
    setAuthor('');
    setEditId(null);
  };

  const handleAddOrUpdate = () => {
    if (!title || !author) return;

    if (editId !== null) {
      setBooks(prev =>
        prev.map(book =>
          book.id === editId ? { ...book, title, author } : book
        )
      );
      showAlert('Book updated successfully.');
    } else {
      const newBook: Book = {
        id: Date.now(),
        title,
        author,
        rating: 0,
      };
      setBooks(prev => [...prev, newBook]);
      showAlert('Book added successfully.');
    }

    resetForm();
  };

  const handleEdit = (book: Book) => {
    setTitle(book.title);
    setAuthor(book.author);
    setEditId(book.id);
  };

  const handleDelete = (id: number) => {
    setBooks(prev => prev.filter(book => book.id !== id));
    showAlert('Book deleted successfully.');
  };

  const updateRating = (id: number, delta: number) => {
    setBooks(prev =>
      prev.map(book =>
        book.id === id ? { ...book, rating: book.rating + delta } : book
      )
    );
  };

  return (
    <div className="book-app">
      <h2>{editId ? 'Edit Book' : 'Add Book'}</h2>
      <div className="form">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Author"
          value={author}
          onChange={e => setAuthor(e.target.value)}
        />
        <button onClick={handleAddOrUpdate}>
          {editId ? 'Update' : 'Add'}
        </button>
        {editId !== null && <button onClick={resetForm}>Cancel</button>}
      </div>

      <h3>Book List</h3>
      <ul>
        {books.map(book => (
          <li key={book.id} className="book-item">
            <strong>{book.title}</strong> by {book.author} <br />
            Rating: {book.rating}
            <br />
            <div className="controls">
              <button onClick={() => updateRating(book.id, 1)}>+</button>
              <button onClick={() => updateRating(book.id, -1)}>-</button>
              <button onClick={() => handleEdit(book)}>Edit</button>
              <button onClick={() => handleDelete(book.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BookApp;
