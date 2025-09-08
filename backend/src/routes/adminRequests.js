// src/pages/AdminRequests.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchRequests = async () => {
    try {
      const token = localStorage.getItem('token'); // if you store JWT in localStorage
      const res = await axios.get('http://localhost:5000/api/books/requests', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setRequests(res.data.requests || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  if (loading) return <p className="text-center mt-5">Loading requests...</p>;

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">📋 Book Requests</h2>
      {requests.length === 0 ? (
        <p className="text-center">No requests found.</p>
      ) : (
        <div className="table-responsive">
          <table className="table table-bordered text-center">
            <thead className="table-dark">
              <tr>
                <th>#</th>
                <th>User</th>
                <th>Book</th>
                <th>Status</th>
                <th>Request Date</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((req, idx) => (
                <tr key={req.requestId}>
                  <td>{idx + 1}</td>
                  <td>{req.userName}</td>
                  <td>{req.bookTitle}</td>
                  <td>{req.status}</td>
                  <td>{new Date(req.request_date).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminRequests;
