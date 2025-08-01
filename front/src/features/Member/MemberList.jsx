import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../assets/CSS/list.css'; 

function MemberList({ students, staffs }) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredStudents = students.filter((student) =>
    student.fullName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredStaffs = staffs.filter((staff) =>
    staff.fullName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container my-5">
      <h2 className="text-center mb-4">📋 Member List</h2>

      <div className="mb-4">
        <input
          type="text"
          className="form-control"
          placeholder="Search by name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="card mb-4 shadow-sm">
        <div className="card-header bg-primary text-white">
          <h4 className="mb-0">🧑‍🎓 Students</h4>
        </div>
        <ul className="list-group list-group-flush">
          {filteredStudents.length > 0 ? (
            filteredStudents.map((student, index) => (
              <li className="list-group-item" key={index}>
                <strong>{student.fullName}</strong> — Class: {student.studentClass}, PRN: {student.prn}
              </li>
            ))
          ) : (
            <li className="list-group-item text-muted">No matching students</li>
          )}
        </ul>
      </div>

      <div className="card shadow-sm">
        <div className="card-header bg-success text-white">
          <h4 className="mb-0">👨‍🏫 Staff</h4>
        </div>
        <ul className="list-group list-group-flush">
          {filteredStaffs.length > 0 ? (
            filteredStaffs.map((staff, index) => (
              <li className="list-group-item" key={index}>
                <strong>{staff.fullName}</strong> — Position: {staff.position}, Staff ID: {staff.staffId}
              </li>
            ))
          ) : (
            <li className="list-group-item text-muted">No matching staff</li>
          )}
        </ul>
      </div>
    </div>
  );
}

export default MemberList;
