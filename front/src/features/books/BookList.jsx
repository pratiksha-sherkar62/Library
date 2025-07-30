// src/pages/BookList.jsx
import React from 'react';

function BookList({ books }) {
  return (
    <div className="container my-5">
      <div className="card shadow-sm">
        <div className="card-body">
          <h1 className="card-title text-center mb-4">📚 Book List</h1>
          {books.length === 0 ? (
            <p className="text-muted text-center">No books available.</p>
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
                    <th>Status</th> {/* New column */}
                  </tr>
                </thead>
                <tbody>
                  {books.map((book) => (
                    <tr key={book.id}>
                      <td>{book.id}</td>
                      <td>{book.title}</td>
                      <td>{book.author}</td>
                      <td>{book.year}</td>
                      <td>{book.quantity}</td>
                      <td>
                        {book.status === 'available' ? (
                          <span className="badge bg-success">Available</span>
                        ) : (
                          <span className="badge bg-danger">Not Available</span>
                        )}
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
