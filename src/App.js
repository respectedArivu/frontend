import React, { useState } from 'react';
import axios from 'axios';

const API_BASE_URL = "ttps://95a7-106-216-173-143.ngrok-free.app"; // Replace with your backend URL

function App() {
  const [form, setForm] = useState({ name: '', number: '', message: '' });
  const [search, setSearch] = useState({ name: '', number: '' });
  const [feedback, setFeedback] = useState(null);
  const [message, setMessage] = useState('');

  // Handle input change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSearchChange = (e) => {
    setSearch({ ...search, [e.target.name]: e.target.value });
  };

  // Send Feedback
  const sendFeedback = async () => {
    if (!form.name || !form.number || !form.message) {
      setMessage("All fields are required");
      return;
    }

    try {
      const response = await axios.post(`${API_BASE_URL}/send-feedback`, form);
      setMessage(response.data.message);
      setForm({ name: '', number: '', message: '' }); // Reset form
    } catch (error) {
      setMessage('Error submitting feedback');
    }
  };

  // Get Feedback by BOTH Name & Number
  const getFeedback = async () => {
    if (!search.name || !search.number) {
      setMessage("Both name and number are required");
      return;
    }

    try {
      const response = await axios.get(`${API_BASE_URL}/get-feedback`, {
        params: { name: search.name, number: search.number } // ✅ Corrected to use GET params
      });

      if (response.data.success && response.data.feedbacks.length > 0) {
        setFeedback(response.data.feedbacks);
        setMessage('');
      } else {
        setFeedback(null);
        setMessage('No feedback found');
      }
    } catch (error) {
      setMessage('Error fetching feedback');
      setFeedback(null);
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
        <h2>Search Feedback</h2>
        <input type="text" name="name" placeholder="Enter Name" value={search.name} onChange={handleSearchChange} /><br />
        <input type="text" name="number" placeholder="Enter Number" value={search.number} onChange={handleSearchChange} /><br />
        <button onClick={getFeedback}>Get Feedback</button>
      </div>

      {/* Display Feedback */}
      <div>
        {feedback ? (
          <div style={{ border: "1px solid black", margin: "10px", padding: "10px" }}>
            <h2>Feedback Details</h2>
            {feedback.map((item, index) => (
              <p key={index}><strong>Message:</strong> {item.message}</p>
            ))}
          </div>
        ) : (
          <p>No feedback available</p>
        )}
      </div>
    </div>
  );
}

export default App;
