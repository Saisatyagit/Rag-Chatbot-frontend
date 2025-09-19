// AddNews.js
import React, { useState } from "react";
import axios from "axios";

const AddNews = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleAddNews = async () => {
    if (!title || !description || !url) {
      setMessage("⚠️ All fields are required!");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const res = await axios.post("http://localhost:5000/api/news/ingest", {
        articles: [{ title, description, url }]
      });

      setMessage(`✅ ${res.data.message}`);
      setTitle("");
      setDescription("");
      setUrl("");
    } catch (err) {
      console.error(err);
      setMessage("❌ Failed to add news. Check console.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={containerStyle}>
      <h2 style={headingStyle}>Add News Article</h2>

      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        style={inputStyle}
        disabled={loading}
      />

      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        style={{ ...inputStyle, height: "100px" }}
        disabled={loading}
      />

      <input
        type="text"
        placeholder="URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        style={inputStyle}
        disabled={loading}
      />

      <button onClick={handleAddNews} style={buttonStyle} disabled={loading}>
        {loading ? "Adding..." : "Add News"}
      </button>

      {message && <p style={messageStyle}>{message}</p>}
    </div>
  );
};

// Inline SCSS-like styling
const containerStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "30px",
  background: "#f0f4f8",
  minHeight: "100vh",
  fontFamily: "sans-serif"
};

const headingStyle = {
  marginBottom: "20px",
  color: "#0d6efd"
};

const inputStyle = {
  width: "400px",
  padding: "12px",
  marginBottom: "15px",
  borderRadius: "8px",
  border: "1px solid #ccc",
  fontSize: "16px"
};

const buttonStyle = {
  width: "200px",
  padding: "12px",
  borderRadius: "8px",
  border: "none",
  background: "#0d6efd",
  color: "white",
  fontWeight: "bold",
  cursor: "pointer",
  marginTop: "10px"
};

const messageStyle = {
  marginTop: "15px",
  fontWeight: "bold",
  color: "#333"
};

export default AddNews;
