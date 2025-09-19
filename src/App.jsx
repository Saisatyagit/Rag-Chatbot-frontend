import React from "react";
import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router-dom";
import ChatScreen from "./components/ChatScreen";
import NewsPage from "./components/NewsWidget";
import AddNews from "./components/NewsPage";

const App = () => {
  return (
    <Router>
      <div style={containerStyle}>
        {/* Navbar */}
        <nav style={navStyle}>
          <NavLink style={linkStyle} to="/">ChatBot</NavLink>
          <NavLink style={linkStyle} to="/news">Latest News</NavLink>
          <NavLink style={linkStyle} to="/add-news">Add News</NavLink>

        </nav>

        {/* Main content */}
        <div style={contentStyle}>
          <Routes>
            <Route path="/" element={<ChatScreen />} />
            <Route path="/news" element={<NewsPage />} />
            <Route path="/add-news" element={<AddNews />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

// Full container
const containerStyle = {
  height: "100vh",
  width: "100vw",
  display: "flex",
  flexDirection: "column",
  fontFamily: "Arial, sans-serif",
  backgroundColor: "#f4f7f8",
};

// Navbar
const navStyle = {
  display: "flex",
  justifyContent: "center",
  gap: "40px",
  padding: "15px 0",
  background: "#0d6efd",
  position: "sticky",
  top: 0,
  zIndex: 1000,
  boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
};

// NavLink styles
const linkStyle = ({ isActive }) => ({
  color: isActive ? "#ffdd57" : "#ffffff",
  textDecoration: "none",
  fontWeight: 600,
  fontSize: "16px",
  transition: "color 0.3s",
});

// Main content
const contentStyle = {
  flex: 1,
  overflow: "hidden",
  display: "flex",
  flexDirection: "column",
};

export default App;

