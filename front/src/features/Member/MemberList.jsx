// src/pages/MemberList.jsx
import React, { useEffect, useState } from "react";

function MemberList() {
  const [staff, setStaff] = useState([]);
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Search states
  const [staffSearch, setStaffSearch] = useState("");
  const [studentSearch, setStudentSearch] = useState("");

  useEffect(() => {
    Promise.all([
      fetch("http://localhost:5000/api/staff").then((res) => res.json()),
      fetch("http://localhost:5000/api/student").then((res) => res.json()),
    ])
      .then(([staffData, studentData]) => {
        setStaff(Array.isArray(staffData) ? staffData : staffData.staff || []);
        setStudents(
          Array.isArray(studentData) ? studentData : studentData.students || []
        );
      })
      .catch((err) => {
        console.error("Error fetching members:", err);
        setError("Failed to load members. Please try again later.");
      })
      .finally(() => setLoading(false));
  }, []);

  // 🔹 Filter staff
  const filteredStaff = staff.filter(
    (s) =>
      s.name.toLowerCase().includes(staffSearch.toLowerCase()) ||
      s.email.toLowerCase().includes(staffSearch.toLowerCase())
  );

  // 🔹 Filter students
  const filteredStudents = students.filter(
    (st) =>
      st.name.toLowerCase().includes(studentSearch.toLowerCase()) ||
      st.email.toLowerCase().includes(studentSearch.toLowerCase()) ||
      st.PRN.toString().includes(studentSearch)
  );

  if (loading) return <p className="text-center mt-5">Loading members...</p>;
  if (error) return <p className="text-center text-danger mt-5">{error}</p>;

  return (
    <div className="container my-5">
      <h1 className="text-center mb-5">👥 Member List</h1>

      {/* 🔹 Staff Section */}
      <div className="card shadow-sm mb-5">
        <div className="card-body">
          <h2 className="card-title text-center mb-4">👩‍🏫 Staff Members</h2>

          {/* Search bar */}
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="🔍 Search staff by name or email..."
              value={staffSearch}
              onChange={(e) => setStaffSearch(e.target.value)}
            />
          </div>

          {filteredStaff.length === 0 ? (
            <p className="text-muted text-center">No staff found.</p>
          ) : (
            <div className="table-responsive">
              <table className="table table-striped table-bordered text-center">
                <thead className="table-dark">
                  <tr>
                    <th>Staff ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone No</th>
                    <th>Position</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredStaff.map((s) => (
                    <tr key={s.staffid}>
                      <td>{s.staffid}</td>
                      <td>{s.name}</td>
                      <td>{s.email}</td>
                      <td>{s.phonno}</td>
                      <td>{s.position}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* 🔹 Student Section */}
      <div className="card shadow-sm">
        <div className="card-body">
          <h2 className="card-title text-center mb-4">🎓 Student Members</h2>

          {/* Search bar */}
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="🔍 Search students by name, email, or PRN..."
              value={studentSearch}
              onChange={(e) => setStudentSearch(e.target.value)}
            />
          </div>

          {filteredStudents.length === 0 ? (
            <p className="text-muted text-center">No students found.</p>
          ) : (
            <div className="table-responsive">
              <table className="table table-striped table-bordered text-center">
                <thead className="table-dark">
                  <tr>
                    <th>PRN</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone No</th>
                    <th>Class</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredStudents.map((st) => (
                    <tr key={st.PRN}>
                      <td>{st.PRN}</td>
                      <td>{st.name}</td>
                      <td>{st.email}</td>
                      <td>{st.phoneno}</td>
                      <td>{st.class}</td>
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

export default MemberList;
