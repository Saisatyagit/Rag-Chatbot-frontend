import { useEffect, useState, useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import { sendMessage, getHistory, clearSession } from "../api";
import ChatMessage from "./ChatMessage";

const ChatScreen = () => {
  const [sessionId, setSessionId] = useState("");
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [typingMessage, setTypingMessage] = useState("");
  const [showTypingDots, setShowTypingDots] = useState(false);
  const messagesEndRef = useRef(null);
  const containerRef = useRef(null);

  // Scroll to bottom dynamically
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Observe container size changes (like ChatGPT)
  useEffect(() => {
    const observer = new ResizeObserver(scrollToBottom);
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  // Initialize session and fetch history
  useEffect(() => {
    let id = localStorage.getItem("sessionId");
    if (!id) {
      id = uuidv4();
      localStorage.setItem("sessionId", id);
    }
    setSessionId(id);

    getHistory(id).then(res => setMessages(res.data.messages || []));
  }, []);

  // Handle sending message
  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { role: "user", content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setShowTypingDots(true);
    setTypingMessage("");

    try {
      const res = await sendMessage(sessionId, userMessage.content);
      const botResponse = res.data.response;

      // Streaming effect
      let i = 0;
      const interval = setInterval(() => {
        setTypingMessage(botResponse.slice(0, i + 1));
        i++;
        if (i === botResponse.length) {
          clearInterval(interval);
          setMessages(prev => [...prev, { role: "assistant", content: botResponse }]);
          setTypingMessage("");
          setShowTypingDots(false);
        }
      }, 25); // speed of typing
    } catch (err) {
      setMessages(prev => [...prev, { role: "assistant", content: "⚠️ Error fetching response." }]);
      setTypingMessage("");
      setShowTypingDots(false);
      console.error(err);
    }
  };

  const handleClear = async () => {
    await clearSession(sessionId);
    setMessages([]);
  };

  return (
    <div
      style={{
        height: "100vh",
        width: "100%",
        background: "linear-gradient(135deg, #667eea, #764ba2)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
      }}
    >
      <div
        ref={containerRef}
        style={{
          background: "#f7f7f7",
          borderRadius: "20px",
          width: "100%",
          maxWidth: "600px",
          maxHeight: "90vh",
          display: "flex",
          flexDirection: "column",
          boxShadow: "0 15px 35px rgba(0,0,0,0.3)",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            flex: 1,
            padding: "15px",
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            overflowY: "auto",
          }}
        >
          {messages.map((m, idx) => (
            <ChatMessage key={idx} {...m} />
          ))}

          {typingMessage && <ChatMessage role="assistant" content={typingMessage + "▌"} />}

          {showTypingDots && !typingMessage && (
            <div style={{ display: "flex", gap: "5px", alignItems: "center" }}>
              <span style={dotStyle(0)}></span>
              <span style={dotStyle(0.2)}></span>
              <span style={dotStyle(0.4)}></span>
            </div>
          )}

          <div ref={messagesEndRef}></div>
        </div>

        <div style={{ display: "flex", gap: "10px", padding: "10px", borderTop: "1px solid #ddd", background: "#fff" }}>
          <input
            style={{
              flex: 1,
              padding: "10px 15px",
              borderRadius: "25px",
              border: "1px solid #ccc",
              outline: "none",
              fontSize: "14px",
            }}
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === "Enter" && handleSend()}
            placeholder="Type your message..."
          />
          <button style={buttonStyle("#0d6efd")} onClick={handleSend}>Send</button>
          <button style={buttonStyle("#dc3545")} onClick={handleClear}>Reset</button>
        </div>
      </div>
    </div>
  );
};

// Reusable styles for buttons
const buttonStyle = (bg) => ({
  borderRadius: "25px",
  border: "none",
  cursor: "pointer",
  fontWeight: 500,
  padding: "10px 20px",
  background: bg,
  color: "white",
});

// Reusable styles for typing dots
const dotStyle = (delay) => ({
  width: "8px",
  height: "8px",
  background: "#6c757d",
  borderRadius: "50%",
  animation: `blink 1s infinite`,
  animationDelay: `${delay}s`,
});

// Add inline keyframes for blinking
const styleSheet = document.styleSheets[0];
const keyframes =
  `@keyframes blink {
    0%, 80%, 100% { opacity: 0; }
    40% { opacity: 1; }
  }`;
styleSheet.insertRule(keyframes, styleSheet.cssRules.length);

export default ChatScreen;
