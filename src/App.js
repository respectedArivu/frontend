import React, { useState } from 'react';
import axios from 'axios';

const API_BASE_URL = "https://frontend-2t7p.onrender.com"; // Replace with your backend URL

function App() {
  const [form, setForm] = useState({ name: '', number: '', message: '' });
  const [searchNumber, setSearchNumber] = useState('');
  const [feedbacks, setFeedbacks] = useState([]);
  const [message, setMessage] = useState('');

  // Handle input change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Send Feedback
  const sendFeedback = async () => {
    try {
      const response = await axios.post(`${API_BASE_URL}/send-feedback`, form);
      setMessage(response.data.message);
      setForm({ name: '', number: '', message: '' });
    } catch (error) {
      setMessage('Error submitting feedback');
    }
  };

  // Get Feedback
  const getFeedback = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/get-feedback/${searchNumber}`);
      setFeedbacks(response.data.feedbacks);
    } catch (error) {
      setMessage('Error fetching feedback');
      setFeedbacks([]);
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Feedback Form</h2>

      {/* Send Feedback Form */}
      <div>
        <input type="text" name="name" placeholder="Name" value={form.name} onChange={handleChange} /><br />
        <input type="text" name="number" placeholder="Phone Number" value={form.number} onChange={handleChange} /><br />
        <textarea name="message" placeholder="Message" value={form.message} onChange={handleChange}></textarea><br />
        <button onClick={sendFeedback}>Send Feedback</button>
      </div>

      <h3>{message}</h3>

      {/* Get Feedback */}
      <div>
        <h2>Search Feedback by Number</h2>
        <input type="text" placeholder="Enter Number" value={searchNumber} onChange={(e) => setSearchNumber(e.target.value)} />
        <button onClick={getFeedback}>Get Feedback</button>
      </div>

      {/* Display Feedbacks */}
      <div>
        {feedbacks.length > 0 && (
          <div>
            <h2>Feedbacks</h2>
            {feedbacks.map((fb, index) => (
              <div key={index} style={{ border: "1px solid black", margin: "10px", padding: "10px" }}>
                <p><strong>Name:</strong> {fb.name}</p>
                <p><strong>Number:</strong> {fb.number}</p>
                <p><strong>Message:</strong> {fb.message}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
