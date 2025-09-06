import React, { useState, useEffect } from "react";
import axios from "axios";
import { io } from "socket.io-client";
import Sidebar from "../../components/Sidebar";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../assets/CSS/SearchBook.css';
import { FaAlignJustify } from "react-icons/fa";

const socket = io("http://localhost:5000");

function SearchBook() {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  // Fetch books
  useEffect(() => {
    axios.get("http://localhost:5000/api/books")
      .then(res => {
        console.log(res.data.books); // debug
        setBooks(res.data.books);
      })
      .catch(err => console.error(err));
  }, []);

  const handleRequestBook = async (bookId) => {
  try {
    const id = 1; // Replace with logged-in user ID
    const res = await axios.post("http://localhost:5000/api/books/request", {
      bookId,
      id,
    });
    alert(res.data.message);
  } catch (err) {
    alert(err.response?.data?.message || "Request failed");
  }
};
  // Real-time updates
  useEffect(() => {
    socket.on("newBook", (book) => setBooks(prev => [...prev, book]));
    socket.on("deleteBook", (bookId) =>
      setBooks(prev => prev.filter(b => b.id !== bookId))
    );

    return () => {
      socket.off("newBook");
      socket.off("deleteBook");
    };
  }, []);

  const filteredBooks = books.filter(book =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  
  return (
    <div className="searchbook-page d-flex" style={{marginLeft:"200px"}}>
      <div className={`sidebar-container ${isSidebarOpen ? "open" : "closed"}`}>
        <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      </div>

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
            <div className="book-card"key={book.id}>
              {book.image && (
                <img
                  src={`http://localhost:5000/uploads/${book.image}`}
                  alt={book.title}
                  className="book-image"
                  style={{ width: "100px", height: "75px", objectFit: "cover",margin:"15px" }}
                />
              )}
              <div className="book-info">
                 <p><strong>ID:</strong> {book.bookId}</p>
                <p><strong>Title:</strong> {book.title}</p>
                <p><strong>Author:</strong> {book.author}</p>
                <p><strong>ISBN:</strong> {book.isbn}</p>
                <p><strong>Available:</strong> {book.copies_available}</p>
            <button
  className="btn btn-primary"
  onClick={() => handleRequestBook(book.bookId)}
>
  Request Book
</button>

              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SearchBook;
