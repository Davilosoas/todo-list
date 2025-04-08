import React, { useEffect, useState } from "react";
import { fetchRandomQuote, translateText } from "../api/quote";

function MotivationalQuote() {
  const [quote, setQuote] = useState("");
  const [author, setAuthor] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchQuote = async () => {
    try {
      setLoading(true);
      setError(false);

      const data = await fetchRandomQuote();
      const translated = await translateText(data.content);

      setQuote(translated);
      setAuthor(data.author);
    } catch (error) {
      setError(true);
      setQuote("Erro ao carregar frase.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuote();
  }, []);

  if (loading) {
    return (
      <div className="text-center mb-4">
        <div className="placeholder-glow">
          <p
            className="placeholder col-12 mb-2"
            style={{ height: "1.5rem" }}
          ></p>
          <p
            className="placeholder col-8 mb-2"
            style={{ height: "1.5rem" }}
          ></p>
          <p className="placeholder col-4" style={{ height: "1.2rem" }}></p>
        </div>
      </div>
    );
  }

  return (
    <div className={`text-center mb-4 ${error ? "text-danger" : ""}`}>
      <div className="card border-0 shadow-sm p-4 fade show">
        <div className="d-flex justify-content-between align-items-start">
          <blockquote className="blockquote mb-0 w-100 me-5">
            <p className="mb-0 fst-italic lead">"{quote}"</p>
            {author && (
              <footer className="blockquote-footer mt-3 opacity-75">
                {author}
              </footer>
            )}
          </blockquote>
          <button
            className="btn btn-outline-secondary btn-sm rounded-circle ms-3"
            onClick={fetchQuote}
            title="Carregar nova frase"
            style={{ width: "40px", height: "40px", flexShrink: 0 }}
          >
            <i className="bi bi-arrow-clockwise"></i>
          </button>
        </div>
      </div>
    </div>
  );
}

export default MotivationalQuote;
