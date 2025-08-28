import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../assets/CSS/FormStyles.css';

function AddBook() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: '',
    author: '',
    year: '',
    quantity: '',
    status: 'Available',
  });
  const [image, setImage] = useState(null);

  // Handle text/number/radio inputs
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  // Handle image input
  const handleSubmit = async (e) => {
  e.preventDefault();
  const { title, author, year, quantity, status } = formData;

  if (!title || !author || !year || !quantity || !status) {
    alert('All fields are required');
    return;
  }

  try {
    const formDataToSend = new FormData();
    formDataToSend.append('title', title);
    formDataToSend.append('author', author);
    formDataToSend.append('year', year);
    formDataToSend.append('quantity', quantity);
    formDataToSend.append('status', status);
    if (image) formDataToSend.append('image', image);

    const token = localStorage.getItem('token');
if (!token) {
  alert('Please login first');
  navigate('/login');
  return;
}

const res = await fetch('http://localhost:5000/api/books/add-book', {
  method: 'POST',
  headers: {
    Authorization: `Bearer ${token}`, // ✅ correct
  },
  body: formDataToSend, // FormData includes image
});

    if (res.status === 401 || res.status === 403) {
      alert('Session expired or unauthorized. Please login again.');
      navigate('/login');
      return;
    }

    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to add book');
    navigate('/books');
  } catch (err) {
    console.error('Error adding book:', err);
    alert(err.message);
  }
};


  return (
    <div className="page-bg">
      <div className="form-glass w-100" style={{ maxWidth: '450px' }}>
        <h2 className="mb-4 text-center text-gradient">📚 Add New Book</h2>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="mb-3">
            <input
              type="text"
              name="title"
              className="form-control"
              placeholder="Title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <input
              type="text"
              name="author"
              className="form-control"
              placeholder="Author"
              value={formData.author}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <input
              type="number"
              name="year"
              className="form-control"
              placeholder="Year"
              value={formData.year}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <input
              type="number"
              name="quantity"
              className="form-control"
              placeholder="Quantity"
              value={formData.quantity}
              onChange={handleChange}
              required
            />
          </div>

          {/* Image Upload */}
          <div className="mb-3">
            <label className="form-label">Upload Book Image:</label>
            <input
              type="file"
              name="image"
              className="form-control"
              onChange={handleImageChange}
              accept="image/*"
            />
          </div>

          {/* Status Radio Buttons */}
          <div className="mb-3">
            <label className="form-label me-3">Status:</label>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="status"
                value="Available"
                checked={formData.status === 'Available'}
                onChange={handleChange}
              />
              <label className="form-check-label">Available</label>
            </div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="status"
                value="Not Available"
                checked={formData.status === 'Not Available'}
                onChange={handleChange}
              />
              <label className="form-check-label">Not Available</label>
            </div>
          </div>

          <button type="submit" className="btn btn-gradient w-100">
            Add Book
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddBook;
