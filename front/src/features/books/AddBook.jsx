// src/pages/AddBook.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
//import '../assets/CSS/Style.css';

function AddBook({ addBook }) {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: '',
    author: '',
    year: '',
  });

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.title && formData.author && formData.year) {
      addBook(formData);
      navigate('/books'); // Redirect to Book List
    }
  };

  return (
    <div className="add-book-container">
      <h1>Add New Book</h1>
      <form onSubmit={handleSubmit} className="book-form">
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="author"
          placeholder="Author"
          value={formData.author}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="year"
          placeholder="Year"
          value={formData.year}
          onChange={handleChange}
          required
        />
        <button type="submit">Add Book</button>
      </form>
    </div>
  );
}

export default AddBook;
