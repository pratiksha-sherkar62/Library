import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Navbar from './components/navbar';
import BookList from './features/books/BookList';
import AddBook from './features/books/AddBook';
import StaffReg from './pages/StaffReg';

function AppContent() {
  const location = useLocation(); // सध्याचा URL कळवतो
  const [books, setBooks] = useState([]);

  const addBook = (book) => {
    const newBook = {
      id: books.length + 1,
      ...book,
    };
    setBooks([...books, newBook]);
  };

  // जर सध्याचा route '/', '/register' असेल तर Navbar दाखवायचा नाही
  const hideNavbar = location.pathname === '/' || location.pathname === '/register';

  return (
    <>
       {!hideNavbar && <Navbar />} {/*बाकी पानांवर Navbar दाखवा */}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/add-book" element={<AddBook addBook={addBook} />} />
        <Route path="/books" element={<BookList books={books} />} />
        <Route path="/staffreg" element={<StaffReg />} />
        {/* <Route path="/studentreg" element={<StudentReg />} /> */}
        {/* इतर routes */}
      </Routes>
    </>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
