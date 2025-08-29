import React, { useState, useEffect } from "react";
import axios from "axios";
import { io } from "socket.io-client";
import Sidebar from "../../components/Sidebar"; // Adjust path if needed
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../assets/CSS/SearchBook.css'; // Custom CSS

const socket = io("http://localhost:5000"); // your backend URL

function SearchBook() {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  // Fetch books
  useEffect(() => {
  axios.get("http://localhost:5000/api/books")
    .then(res => {
      console.log(res.data.books); // check image field
      setBooks(res.data.books);
    })
    .catch(err => console.error(err));
}, []);

  // Real-time updates
  useEffect(() => {
    socket.on("newBook", (book) => setBooks(prev => [...prev, book]));
    socket.on("deleteBook", (bookId) => setBooks(prev => prev.filter(b => b.id !== bookId)));

    return () => {
      socket.off("newBook");
      socket.off("deleteBook");
    };
  }, []);

  const filteredBooks = books.filter(book =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="searchbook-page d-flex">
      {/* Sidebar */}
      <div className={`sidebar-container ${isSidebarOpen ? "open" : "closed"}`}>
        <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      </div>

      {/* Main content */}
      <div className="searchbook-content flex-grow-1 p-4">
        <h2 className="mb-4 text-primary">📚 Book Search</h2>

        <input
          type="text"
          placeholder="Search books..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="form-control mb-4 search-input"
        />

        <div className="books-grid">
          {filteredBooks.map((book) => (
            <div className="book-card" key={book.id}>
              {book.image && (
                <img
                  src={`http://localhost:5000/uploads/${book.image}`}
                  alt={book.title}
                  className="book-image"
                />
              )}
              <div className="book-info">
                <h5 className="book-title">{book.title}</h5>
                <p className="book-author">{book.author}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SearchBook;
