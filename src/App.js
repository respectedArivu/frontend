import React, { useState } from 'react';
import axios from 'axios';

const API_BASE_URL = "https://aaef-106-216-173-143.ngrok-free.app";

function App() {
  const [form, setForm] = useState({ name: '', number: '', message: '' });
  const [search, setSearch] = useState({ name: '', number: '' });
  const [feedbacks, setFeedbacks] = useState([]);
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSearchChange = (e) => {
    setSearch({ ...search, [e.target.name]: e.target.value });
  };

  // ✅ Send Feedback (POST)
  const sendFeedback = async () => {
    try {
      const response = await axios.post(`${API_BASE_URL}/send-feedback`, form);
      setMessage(response.data.message);
      setForm({ name: '', number: '', message: '' });
    } catch (error) {
      setMessage(error.response?.data?.message || 'Error submitting feedback');
    }
  };

  // ✅ Get Feedback (GET)
  const getFeedback = async () => {
    try {
      const { name, number } = search;
      if (!name || !number) {
        setMessage("Both Name and Number are required!");
        return;
      }

      const response = await axios.get(`${API_BASE_URL}/get-feedback`, { params: { name, number } });
      setFeedbacks(response.data.feedbacks || []);
      setMessage(response.data.message);
    } catch (error) {
      setMessage(error.response?.data?.message || 'Error fetching feedback');
      setFeedbacks([]);
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Feedback Form</h2>
      <div>
        <input type="text" name="name" placeholder="Name" value={form.name} onChange={handleChange} /><br />
        <input type="text" name="number" placeholder="Phone Number" value={form.number} onChange={handleChange} /><br />
        <textarea name="message" placeholder="Message" value={form.message} onChange={handleChange}></textarea><br />
        <button onClick={sendFeedback}>Send Feedback</button>
      </div>

      <h3>{message}</h3>

      <div>
        <h2>Search Feedback</h2>
        <input type="text" name="name" placeholder="Enter Name" value={search.name} onChange={handleSearchChange} /><br />
        <input type="text" name="number" placeholder="Enter Number" value={search.number} onChange={handleSearchChange} /><br />
        <button onClick={getFeedback}>Get Feedback</button>
      </div>

      <div>
        {feedbacks.length > 0 ? (
          <div style={{ border: "1px solid black", margin: "10px", padding: "10px" }}>
            <h2>Feedback Details</h2>
            {feedbacks.map((fb, index) => (
              <p key={index}><strong>Message:</strong> {fb.message}</p>
            ))}
          </div>
        ) : (
          <p>{message || "No feedback available"}</p>
        )}
      </div>
    </div>
  );
}

export default App;
