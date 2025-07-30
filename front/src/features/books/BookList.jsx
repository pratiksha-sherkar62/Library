// src/pages/BookList.jsx
import React from 'react';
//import '../assets/CSS/Style.css';

function BookList({ books }) {
  return (
    <div className="book-list-container">
      <h1>Book List</h1>
      {books.length === 0 ? (
        <p>No books available.</p>
      ) : (
        <table className="book-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Author</th>
              <th>Year</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book) => (
              <tr key={book.id}>
                <td>{book.id}</td>
                <td>{book.title}</td>
                <td>{book.author}</td>
                <td>{book.year}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default BookList;
