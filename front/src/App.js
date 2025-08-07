import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import Login from './pages/Login';
import Register from './pages/Register';
import UserReg from './pages/userReg'; // ✅ capitalized
import Dashboard from './pages/Dashboard';
import Navbar from './components/navbar';

import BookList from './features/books/BookList';
import AddBook from './features/books/AddBook';

import StaffReg from './features/Member/StaffReg';
import StudentRegistration from './features/Member/StudentReg';
import MemberList from './features/Member/MemberList';

import Home from './pages/Home';
import Footer from './components/Footer';

function AppContent() {
  const location = useLocation();

  const [books, setBooks] = useState([]);
  const [students, setStudents] = useState([]);
  const [staffs, setStaffs] = useState([]);

  const addBook = (book) => {
    const newBook = {
      id: books.length + 1,
      ...book,
    };
    setBooks([...books, newBook]);
  };

  const handleStudentRegister = (studentData) => {
    setStudents([...students, studentData]);
  };

  const handleStaffRegister = (staffData) => {
    setStaffs([...staffs, staffData]);
  };

  const hideNavbar = ['/login', '/register', '/userReg', '/home', '/'].includes(location.pathname);
  const hideFooter = ['/login', '/register', '/userReg', '/home', '/'].includes(location.pathname);

  return (
    <>
      {!hideNavbar && <Navbar />}
      
      <Routes>
        <Route
          path="/dashboard"
          element={<Dashboard books={books} students={students} staffs={staffs} />}
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/userReg" element={<UserReg />} />

        <Route path="/add-book" element={<AddBook addBook={addBook} />} />
        <Route path="/books" element={<BookList books={books} />} />

        <Route path="/staffreg" element={<StaffReg onRegister={handleStaffRegister} />} />
        <Route path="/studentreg" element={<StudentRegistration onRegister={handleStudentRegister} />} />

        <Route path="/members" element={<MemberList students={students} staffs={staffs} />} />
        <Route path="/" element={<Home />} />
      </Routes>

      {!hideFooter && <Footer />}
    </>
  );
}

function App() {
  return (
    <Router>
      <div className="d-flex flex-column min-vh-100">
        <AppContent />
      </div>
    </Router>
  );
}

export default App;
