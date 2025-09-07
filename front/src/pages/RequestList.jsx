import React, { useEffect, useState } from "react";
import axios from "axios";
import { io } from "socket.io-client";

const socket = io("http://localhost:5000");

function RequestList() {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/books/requests")
      .then(res => setRequests(res.data.requests));

    socket.on("newRequest", (req) => {
      alert("New book request received!");
    });

    return () => socket.off("newRequest");
  }, []);

  const handleUpdate = async (id, status) => {
    await axios.put(`http://localhost:5000/api/books/request/${id}`, { status });
    setRequests((prev) =>
      prev.map(r => (r.id === id ? { ...r, status } : r))
    );
  };

  return (
    <div>
      <h2>Book Requests</h2>
      <ul>
        {requests.map((r) => (
          <li key={r.id}>
            {r.userName} requested "{r.bookTitle}" → {r.status}
            <button onClick={() => handleUpdate(r.id, "approved")}>Approve</button>
            <button onClick={() => handleUpdate(r.id, "rejected")}>Reject</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default RequestList;
