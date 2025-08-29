
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../../assets/CSS/FormStyles.css";

function AddBook() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    author: "",
  });
  const [image, setImage] = useState(null);

  // Handle text inputs
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle image input
  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title) {
      alert("Title is required");
      return;
    }

    try {
      const data = new FormData();
      data.append("title", formData.title);
      data.append("author", formData.author);
      if (image) data.append("image", image);

      const res = await axios.post("http://localhost:5000/api/books/add", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      alert(res.data.message);
      navigate("/dashboard"); // go back to dashboard after adding
    } catch (err) {
      console.error(err);
      alert("Error adding book");
    }
  };

  return (
    <div className="page-bg d-flex justify-content-center align-items-center vh-100">
      <div className="form-glass w-100" style={{ maxWidth: "450px" }}>
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
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Upload Book Image:</label>
            <input type="file"
                    name="image"   // ✅ must match upload.single("image")
                    onChange={handleImageChange}
            />
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