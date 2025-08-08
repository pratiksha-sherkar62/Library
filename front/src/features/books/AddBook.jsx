import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../assets/CSS/FormStyles.css';

function AddBook({ addBook }) {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: '',
    author: '',
    year: '',
    quantity: '',
    status: 'Available'
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { title, author, year, quantity, status } = formData;
    if (title && author && year && quantity && status) {
      addBook({ ...formData, quantity: parseInt(quantity) });
      navigate('/books');
    }
  };

  return (
    <div className="page-bg">
      <div className="form-glass w-100" style={{ maxWidth: '450px' }}>
        <h2 className="mb-4 text-center text-gradient">📚 Add New Book</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input type="text" name="title" className="form-control" placeholder="Title" value={formData.title} onChange={handleChange} required />
          </div>
          <div className="mb-3">
            <input type="text" name="author" className="form-control" placeholder="Author" value={formData.author} onChange={handleChange} required />
          </div>
          <div className="mb-3">
            <input type="number" name="year" className="form-control" placeholder="Year" value={formData.year} onChange={handleChange} required />
          </div>
          <div className="mb-3">
            <input type="number" name="quantity" className="form-control" placeholder="Quantity" value={formData.quantity} onChange={handleChange} required />
          </div>
          <div className="mb-3">
            <label className="form-label me-3">Status:</label>
            <div className="form-check form-check-inline">
              <input className="form-check-input" type="radio" name="status" value="Available" checked={formData.status === 'Available'} onChange={handleChange} />
              <label className="form-check-label">Available</label>
            </div>
            <div className="form-check form-check-inline">
              <input className="form-check-input" type="radio" name="status" value="Not Available" checked={formData.status === 'Not Available'} onChange={handleChange} />
              <label className="form-check-label">Not Available</label>
            </div>
          </div>
          <button type="submit" className="btn btn-gradient w-100">Add Book</button>
        </form>
      </div>
    </div>
  );
}

export default AddBook;
