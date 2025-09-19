import React, { useEffect, useState } from "react";
import { getLatestNews } from "../api";

const NewsPage = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getLatestNews()
      .then(res => setArticles(res.data.articles || []))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Latest News</h2>
      {loading ? (
        <p>Loading news...</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0, gap: "15px", display: "flex", flexDirection: "column" }}>
          {articles.map((a, idx) => (
            <li key={idx} style={{ padding: "10px", border: "1px solid #ddd", borderRadius: "10px" }}>
              <a href={a.url} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none", color: "#0d6efd", fontWeight: 500 }}>
                {a.title}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default NewsPage;
