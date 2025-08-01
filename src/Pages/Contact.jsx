import React, { useState } from "react";
import "./Contact.css";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    villageName: "",
    state: "",
    mobileNumber: "",
    email: "",
    productName: "",
    price: "",
    images: []
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setFormData({
      ...formData,
      images: files
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const emailBody = `
      Personal Information:
      Name: ${formData.name}
      Age: ${formData.age}
      Village Name: ${formData.villageName}
      State: ${formData.state}
      Mobile Number: ${formData.mobileNumber}
      Email: ${formData.email || 'Not provided'}

      Product Details:
      Product Name: ${formData.productName}
      Price: ₹${formData.price}
    `;

    const mailtoLink = `mailto:thiruvikram1504@gmail.com?subject=New Equipment Rental Form Submission&body=${encodeURIComponent(emailBody)}`;

    window.location.href = mailtoLink;
  };

  return (
    <div>
      <div className="form-container">
        <h1>RentalHub Equipment Form</h1>
        <form onSubmit={handleSubmit} className="google-form-style">
          <div className="form-section">
            <h2>Personal Information</h2>
            <div className="form-group">
              <label>Name *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Age *</label>
              <input
                type="number"
                name="age"
                value={formData.age}
                onChange={handleChange}
                min="18"
                required
              />
            </div>

            <div className="form-group">
              <label>Village Name *</label>
              <input
                type="text"
                name="villageName"
                value={formData.villageName}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>State *</label>
              <input
                type="text"
                name="state"
                value={formData.state}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Mobile Number *</label>
              <input
                type="tel"
                name="mobileNumber"
                value={formData.mobileNumber}
                onChange={handleChange}
                pattern="[0-9]{10}"
                required
              />
            </div>

            <div className="form-group">
              <label>Email (Optional)</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-section">
            <h2>Product Details</h2>
            <div className="form-group">
              <label>Product Name *</label>
              <input
                type="text"
                name="productName"
                value={formData.productName}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Price (₹) *</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                min="0"
                required
              />
            </div>

            <div className="form-group">
              <label>Upload Product Images *</label>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageChange}
                required
              />
            </div>
          </div>

          <button type="submit" className="submit-btn">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default Contact;
