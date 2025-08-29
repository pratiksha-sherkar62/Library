  // src/App.js (or wherever your App component lives)
  import React, { useState } from 'react';
  import {
    BrowserRouter as Router,
    Routes,
    Route,
    useLocation,
    matchPath,
  } from 'react-router-dom';

  import 'bootstrap/dist/css/bootstrap.min.css';
  import 'bootstrap/dist/js/bootstrap.bundle.min.js';

  import Login from './pages/Login';
  import Register from './pages/Register';
  import UserLogin from './pages/Userlog';
  import Dashboard from './pages/Dashboard';
  import Navbar from './components/navbar';
  import Sidebar from './components/Sidebar';
  import Userhome from './pages/UserHome';
  import BookList from './features/books/BookList';
  import AddBook from './features/books/AddBook';
  import StaffReg from './features/Member/StaffReg';
  import StudentRegistration from './features/Member/StudentReg';
  import MemberList from './features/Member/MemberList';
  import Home from './pages/Home';
  import Footer from './components/Footer';
  import UserProfile from './features/users/UserProfile'; 
  import axios from "axios";
  import SearchBook from './features/users/searchBook'

  function AppContent({ isSidebarOpen, toggleSidebar }) {
    const location = useLocation();

    const [books, setBooks] = useState([]);
    const [students, setStudents] = useState([]);
    const [staffs, setStaffs] = useState([]);

    const addBook = (book) => {
      setBooks([...books, { id: books.length + 1, ...book }]);
    };

    const handleStudentRegister = (studentData) => {
      setStudents([...students, studentData]);
    };

    const handleStaffRegister = (staffData) => {
      setStaffs([...staffs, staffData]);
    };

    const path = location.pathname; // current path

    // ------------ Debug (temporary) --------------
    // Open browser console and check these values if navbar still doesn't show.
    // Remove the console.log lines after you verify.
    // eslint-disable-next-line no-console
    console.log('Current pathname:', path);
    // ---------------------------------------------

    // pages where you want the navbar visible (supports nested routes)
    const navbarPages = [
      '/add-book',
      '/books',
      '/staffreg',
      '/studentreg',
      '/members',
      '/dashboard',

    ];

    // Using matchPath with end: false so '/dashboard' matches '/dashboard' and '/dashboard/123'
    const showNavbar = navbarPages.some((p) =>
      Boolean(matchPath({ path: p, end: false }, path))
    );

    // Sidebar visible only on exact /userhome (change to matchPath if you want nested)
    const showSidebar = Boolean(matchPath({ path: '/userhome', end: true }, path));

    // Footer hidden for these routes (you can add '/userhome' here if you want)
    const hideFooter = [
      '/login',
      '/register',
      '/userReg',
      '/home',
      '/',
      '/Userlog',
      '/search'
    ].includes(path);

    return (
      <div className="d-flex flex-grow-1">
        {showSidebar && <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />}

        <div className="flex-grow-1">
          {showNavbar && <Navbar />}

          <div className="p-3">
            <Routes>
              <Route
                path="/dashboard"
                element={<Dashboard books={books} students={students} staffs={staffs} />}
              />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/Userlog" element={<UserLogin />} />
              <Route path="/add-book" element={<AddBook addBook={addBook} />} />
              <Route path="/books" element={<BookList books={books} />} />
              <Route path="/staffreg" element={<StaffReg onRegister={handleStaffRegister} />} />
              <Route path="/studentreg" element={<StudentRegistration onRegister={handleStudentRegister} />} />
              <Route path="/members" element={<MemberList students={students} staffs={staffs} />} />
              <Route path="/" element={<Home />} />
              <Route path="/userhome" element={<Userhome />} />
              <Route path="/Profile" element={<UserProfile />} />
              <Route path="/search" element={<SearchBook />} />
            </Routes>
          </div>

          {!hideFooter && <Footer />}
        </div>
      </div>
    );
  }

  function App() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

    return (
      <Router>
        <div className="d-flex flex-column min-vh-100">
          <AppContent isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        </div>
      </Router>
    );
  }

  export default App;