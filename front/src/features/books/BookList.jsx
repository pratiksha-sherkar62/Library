// src/pages/BookList.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../assets/CSS/FormStyles.css";

function BookList() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchBooks = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get("http://localhost:5000/api/books");
      setBooks(res.data.books || []);
    } catch (err) {
      console.error("Error fetching books:", err);
      setError("Failed to load books. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const deleteBook = async (id) => {
    if (!window.confirm("Are you sure you want to delete this book?")) return;

    try {
      await axios.delete(`http://localhost:5000/api/books/${id}`);
      setBooks(books.filter((book) => book.id !== id));
      alert("Book deleted successfully!");
    } catch (err) {
      console.error("Error deleting book:", err);
      setError("Failed to delete book. Please try again later.");
    }
  };

  const updateBook = async (book) => {
    const updatedTitle = prompt("Enter new title:", book.title);
    const updatedAuthor = prompt("Enter new author:", book.author);
    if (!updatedTitle || !updatedAuthor) return;

    try {
      await axios.put(`http://localhost:5000/api/books/${book.id}`, {
        title: updatedTitle,
        author: updatedAuthor,
      });
      fetchBooks();
    } catch (err) {
      console.error("Error updating book:", err);
      setError("Failed to update book. Please try again later.");
    }
  };

  const filteredBooks = books.filter(
    (book) =>
      book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.author.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) return <p className="text-center mt-5">Loading books...</p>;
  if (error) return <p className="text-center text-danger mt-5">{error}</p>;

  return (
    <div className="page-bg py-5">
      <div className="container">
        <h2 className="text-center text-gradient mb-4">📚 Book List</h2>

        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="🔍 Search by title or author..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {filteredBooks.length === 0 ? (
          <p className="text-center text-muted">No books found.</p>
        ) : (
          <div className="table-responsive">
            <table className="table table-striped table-bordered text-center align-middle">
              <thead className="table-dark">
                <tr>
                  <th>#</th>
                  <th>Image</th>
                  <th>Title</th>
                  <th>Author</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredBooks.map((book, index) => (
                  <tr key={book.id}>
                    <td>{index + 1}</td>
                    <td>
                      {book.image ? (
                        <img
                          src={`http://localhost:5000/uploads/${book.image}`}
                          alt={book.title}
                          className="book-image"
                        />
                      ) : (
                        <span>No Image</span>
                      )}
                    </td>
                    <td>{book.title}</td>
                    <td>{book.author}</td>
                    <td className="d-flex justify-content-center flex-wrap gap-2">
                      <button
                        className="btn btn-sm btn-primary"
                        onClick={() => updateBook(book)}
                      >
                        Update
                      </button>
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => deleteBook(book.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default BookList;
