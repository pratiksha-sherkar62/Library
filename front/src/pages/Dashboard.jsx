import React, { useEffect, useState } from 'react';
import '../assets/CSS/Style.css';

const Dashboard = ({ books, students, staffs }) => {
  const [bookCount, setBookCount] = useState(0);
  const [memberCount, setMemberCount] = useState(0);

  useEffect(() => {
    // Count based on passed props
    setBookCount(books.length);
    setMemberCount(students.length + staffs.length);
  }, [books, students, staffs]);

  return (
    <div className="dashboard-content" style={{ padding: '2rem' }}>
      <h1 className="mb-4 text-center">Welcome to the Library Dashboard</h1>
      <p className="text-center mb-5">Use the navigation bar to manage books and users.</p>

      <div className="row justify-content-center">
        {/* Book List Box */}
        <div className="col-md-4 mb-4">
          <div className="card text-center shadow-sm p-4 h-100">
            <h3>📚 Book List</h3>
            <h2 className="text-success">{bookCount}</h2>
            <p>Total books available in the library.</p>
            <button className="btn btn-success mt-3">View Books</button>
          </div>
        </div>

        {/* Member List Box */}
        <div className="col-md-4 mb-4">
          <div className="card text-center shadow-sm p-4 h-100">
            <h3>👥 Member List</h3>
            <h2 className="text-primary">{memberCount}</h2>
            <p>Registered library members.</p>
            <button className="btn btn-primary mt-3">View Members</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;