// src/pages/BookList.jsx
import React, { useEffect, useState } from 'react';

function BookList() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState(""); // 🔹 state for search input

  useEffect(() => {
    fetch('http://localhost:5000/api/books')
      .then(res => {
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return res.json();
      })
      .then(data => {
        console.log("Books API response:", data);
        if (Array.isArray(data)) {
          setBooks(data);
        } else if (data && Array.isArray(data.books)) {
          setBooks(data.books);
        } else {
          console.warn("Unexpected API response format.");
          setBooks([]);
        }
      })
      .catch(err => {
        console.error("Error fetching books:", err);
        setError("Failed to load books. Please try again later.");
      })
      .finally(() => setLoading(false));
  }, []);

  // 🔹 Filter books based on search query
  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    book.author.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return <p className="text-center mt-5">Loading books...</p>;
  }

  if (error) {
    return <p className="text-center text-danger mt-5">{error}</p>;
  }

  const deleteBook = async(id) => {
    if (window.confirm("Are you sure you want to delete this book?")) {
      fetch(`http://localhost:5000/api/books/${id}`, {
        method: 'DELETE',
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error(`HTTP error! Status: ${res.status}`);
          }
          return res.json();
        })
        .then(() => {
          setBooks(books.filter((book) => book.id !== id));
        })
        .catch((err) => {
          console.error("Error deleting book:", err);
          setError("Failed to delete book. Please try again later.");
        });
    }
  };

  const updateBook = (id) => {
    const book = books.find((book) => book.id === id);
    if (!book) return;

    const updatedTitle = prompt("Enter new title:", book.title);
    const updatedAuthor = prompt("Enter new author:", book.author);
    const updatedYear = prompt("Enter new year:", book.year);
    const updatedQuantity = prompt("Enter new quantity:", book.quantity);
    const updatedStatus = prompt("Enter new status:", book.status);

    if (
      updatedTitle === null ||
      updatedAuthor === null ||
      updatedYear === null ||
      updatedQuantity === null ||
      updatedStatus === null
    ) {
      return;
    }

    fetch(`http://localhost:5000/api/books/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: updatedTitle,
        author: updatedAuthor,
        year: updatedYear,
        quantity: updatedQuantity,
        status: updatedStatus,
      }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return res.json();
      })
      .then(() => {
        setBooks(
          books.map((book) =>
            book.id === id
              ? {
                  ...book,
                  title: updatedTitle,
                  author: updatedAuthor,
                  year: updatedYear,
                  quantity: updatedQuantity,
                  status: updatedStatus,
                }
              : book
          )
        );
      })
      .catch((err) => {
        console.error("Error updating book:", err);
        setError("Failed to update book. Please try again later.");
      });
  };

  return (
    <div className="container my-5">
      <div className="card shadow-sm">
        <div className="card-body">
          <h1 className="card-title text-center mb-4">📚 Book List</h1>

          {/* 🔹 Search Bar */}
          <div className="mb-4">
            <input
              type="text"
              className="form-control"
              placeholder="🔍 Search by title or author..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {filteredBooks.length === 0 ? (
            <p className="text-muted text-center">No books found.</p>
          ) : (
            <div className="table-responsive">
              <table className="table table-striped table-bordered align-middle text-center">
                <thead className="table-dark">
                  <tr>
                    <th>ID</th>
                    <th>Title</th>
                    <th>Author</th>
                    <th>Year</th>
                    <th>Quantity</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredBooks.map((book, index ) => (
                    <tr key={book.id}>
                      <td>{index + 1}</td>
                      <td>{book.title}</td>
                      <td>{book.author}</td>
                      <td>{book.year}</td>
                      <td>{book.quantity}</td>
                      <td>
                        {book.status?.toLowerCase() === 'available' ? (
                          <span className="badge bg-success">Available</span>
                        ) : (
                          <span className="badge bg-danger">Not Available</span>
                        )}
                      </td>
                      <td>
                        <button className="btn btn-sm btn-primary me-2" onClick={() => updateBook(book.id)}>Update</button>
                        <button className="btn btn-sm btn-danger" onClick={() => deleteBook(book.id)}>Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}

export default BookList;