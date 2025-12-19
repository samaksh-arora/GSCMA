import React, { useState } from 'react';
import { FaLinkedin, FaInstagram, FaTwitter, FaFacebook, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // In production, this would send to backend
    console.log('Contact form submitted:', formData);
    setSubmitted(true);
    setFormData({ name: '', email: '', subject: '', message: '' });
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold mb-4">Contact Us</h1>
        <p className="text-lg">Get in touch with GSCMA - we'd love to hear from you!</p>
      </div>

      <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
        {/* Contact Information */}
        <div>
          <h2 className="text-3xl font-bold mb-6">Get In Touch</h2>
          
          <div className="space-y-4 mb-8">
            <div className="flex items-center">
              <FaEnvelope className="w-6 h-6 mr-4 text-primary" />
              <div>
                <p className="font-semibold">Email</p>
                <a href="mailto:info@gscma.org" className="link link-primary">info@gscma.org</a>
              </div>
            </div>

            <div className="flex items-center">
              <FaPhone className="w-6 h-6 mr-4 text-primary" />
              <div>
                <p className="font-semibold">Phone</p>
                <p>(313) 555-0123</p>
              </div>
            </div>

            <div className="flex items-center">
              <FaMapMarkerAlt className="w-6 h-6 mr-4 text-primary" />
              <div>
                <p className="font-semibold">Location</p>
                <p>Mike Ilitch School of Business<br />Wayne State University<br />Detroit, MI 48202</p>
              </div>
            </div>
          </div>

          {/* Social Media Links */}
          <div>
            <h3 className="text-2xl font-bold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="btn btn-circle btn-outline">
                <FaLinkedin className="w-6 h-6" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="btn btn-circle btn-outline">
                <FaInstagram className="w-6 h-6" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="btn btn-circle btn-outline">
                <FaTwitter className="w-6 h-6" />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="btn btn-circle btn-outline">
                <FaFacebook className="w-6 h-6" />
              </a>
            </div>
          </div>

          {/* Office Hours */}
          <div className="mt-8 bg-base-200 rounded-lg p-6">
            <h3 className="text-xl font-bold mb-4">Office Hours</h3>
            <p className="mb-2"><strong>Monday - Thursday:</strong> 2:00 PM - 5:00 PM</p>
            <p className="mb-2"><strong>Friday:</strong> 1:00 PM - 4:00 PM</p>
            <p><strong>Saturday - Sunday:</strong> Closed</p>
          </div>
        </div>

        {/* Contact Form */}
        <div>
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <h2 className="card-title mb-4">Send Us a Message</h2>
              
              {submitted && (
                <div className="alert alert-success mb-4">
                  <span>Thank you! Your message has been sent successfully.</span>
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="form-control mb-4">
                  <label className="label">
                    <span className="label-text">Name</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="input input-bordered"
                    required
                  />
                </div>

                <div className="form-control mb-4">
                  <label className="label">
                    <span className="label-text">Email</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="input input-bordered"
                    required
                  />
                </div>

                <div className="form-control mb-4">
                  <label className="label">
                    <span className="label-text">Subject</span>
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="input input-bordered"
                    required
                  />
                </div>

                <div className="form-control mb-4">
                  <label className="label">
                    <span className="label-text">Message</span>
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    className="textarea textarea-bordered h-32"
                    required
                  />
                </div>

                <button type="submit" className="btn btn-primary w-full">
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
