import React from "react";

const ChatMessage = ({ role, content }) => {
  const baseStyle = {
    display: "flex",
    wordBreak: "break-word",
    marginBottom: "8px",
    opacity: 0,
    animation: "fadeIn 0.3s forwards",
  };

  const userStyle = {
    justifyContent: "flex-end",
  };

  const assistantStyle = {
    justifyContent: "flex-start",
  };

  const bubbleStyle = {
    padding: "10px 15px",
    maxWidth: "70%",
    fontSize: "14px",
    borderRadius: role === "user" ? "15px 15px 0 15px" : "15px 15px 15px 0",
    background: role === "user" ? "#0d6efd" : "#e9ecef",
    color: role === "user" ? "white" : "#212529",
  };

  return (
    <div style={{ ...baseStyle, ...(role === "user" ? userStyle : assistantStyle) }}>
      <div style={bubbleStyle}>{content}</div>
      {/* Inline keyframes */}
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}
      </style>
    </div>
  );
};

export default ChatMessage;
