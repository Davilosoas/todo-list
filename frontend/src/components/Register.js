import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { registerUser } from "../api/auth";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem("darkMode");
    return saved === "true";
  });
  const navigate = useNavigate();

  useEffect(() => {
    const savedDarkMode = localStorage.getItem("darkMode") === "true";
    setDarkMode(savedDarkMode);
  }, []);

  useEffect(() => {
    document.body.classList.toggle("bg-dark", darkMode);
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  const handleRegister = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      await registerUser({ email, password });

      const form = e.target;
      form.classList.add("was-validated");

      const currentDarkMode = localStorage.getItem("darkMode");

      setTimeout(() => {
        navigate("/login");
        localStorage.setItem("darkMode", currentDarkMode);
      }, 800);
    } catch (error) {
      setError(error.response?.data?.message || "Erro ao criar conta");
      const form = e.target;
      form.classList.add("was-validated");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDarkModeToggle = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem("darkMode", newDarkMode);
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key="register-page"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.3, ease: [0.43, 0.13, 0.23, 0.96] }}
        className={`container min-vh-100 d-flex align-items-center justify-content-center ${
          darkMode ? "bg-dark" : "bg-light"
        }`}
      >
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleDarkModeToggle}
          className={`btn ${
            darkMode ? "btn-light" : "btn-dark"
          } position-fixed top-0 end-0 m-4`}
          style={{ zIndex: 1000 }}
        >
          <i className={`bi ${darkMode ? "bi-sun" : "bi-moon"}`}></i>
        </motion.button>

        <div className="col-11 col-md-8 col-lg-5 mx-auto">
          <motion.div
            className="card border-0 rounded-4 shadow-sm"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.4, ease: "easeOut" }}
          >
            <div
              className={`card-body p-4 p-sm-5 ${
                darkMode ? "bg-dark text-light" : ""
              }`}
            >
              <motion.h1
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.4, ease: "easeOut" }}
                className={`text-center mb-5 display-6 fw-semibold ${
                  darkMode ? "text-light" : "text-primary"
                }`}
              >
                Criar Conta
              </motion.h1>

              <AnimatePresence mode="wait">
                {error && (
                  <motion.div
                    key="error"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="alert alert-danger"
                    role="alert"
                  >
                    {error}
                  </motion.div>
                )}
              </AnimatePresence>

              <form onSubmit={handleRegister} className="needs-validation">
                <div className="form-floating mb-4">
                  <input
                    type="email"
                    className={`form-control form-control-lg border border-2 transition ${
                      darkMode ? "bg-dark text-light" : "bg-light"
                    }`}
                    id="emailInput"
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Digite seu email"
                    required
                    disabled={isLoading}
                  />
                  <label
                    htmlFor="emailInput"
                    className={`${darkMode ? "text-light" : "text-secondary"}`}
                  >
                    Email
                  </label>
                </div>
                <div className="form-floating mb-5">
                  <input
                    type="password"
                    className={`form-control form-control-lg border border-2 transition ${
                      darkMode ? "bg-dark text-light" : "bg-light"
                    }`}
                    id="passwordInput"
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Digite sua senha"
                    required
                    disabled={isLoading}
                  />
                  <label
                    htmlFor="passwordInput"
                    className={`${darkMode ? "text-light" : "text-secondary"}`}
                  >
                    Senha
                  </label>
                </div>
                <div className="d-grid gap-2">
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ duration: 0.2, ease: "easeInOut" }}
                    className={`btn btn-primary btn-lg py-3 rounded-3 text-white fw-semibold transition position-relative ${
                      isLoading ? "disabled" : ""
                    }`}
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <span
                          className="spinner-border spinner-border-sm me-2"
                          role="status"
                          aria-hidden="true"
                        ></span>
                        Criando conta...
                      </>
                    ) : (
                      <>
                        <i className="bi bi-person-plus me-2"></i>
                        Criar Conta
                      </>
                    )}
                  </motion.button>

                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ duration: 0.2, ease: "easeInOut" }}
                  >
                    <Link
                      to="/login"
                      className="btn btn-outline-secondary btn-lg py-3 rounded-3 fw-semibold transition w-100"
                    >
                      <i className="bi bi-box-arrow-in-right me-2"></i>
                      Já tenho uma conta
                    </Link>
                  </motion.div>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

export default Register;
