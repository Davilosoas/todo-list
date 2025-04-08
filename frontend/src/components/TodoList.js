import React, { useState, useEffect } from "react";
import MotivationalQuote from "./MotivationalQuote";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useContext } from "react";
import { AuthContext } from "../AuthContext";
import { getTasks, createTask, updateTask, deleteTask } from "../api/tasks";

const DarkModeInput = styled.input`
  &::placeholder {
    ${(props) =>
      props.darkMode &&
      `
      color: rgba(255, 255, 255, 0.6) !important;
      opacity: 1;
    `}
  }
`;

const DarkModeTextArea = styled.textarea`
  &::placeholder {
    ${(props) =>
      props.darkMode &&
      `
      color: rgba(255, 255, 255, 0.6) !important;
      opacity: 1;
    `}
  }
`;

function TodoList() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [expandedTaskId, setExpandedTaskId] = useState(null);
  const [editingTask, setEditingTask] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem("darkMode");
    return saved === "true";
  });
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);

  const fetchTasks = async () => {
    try {
      const res = await getTasks(token);
      setTasks(res.data);
    } catch (error) {
      console.error("Erro ao buscar tarefas:", error.message);
    }
  };

  useEffect(() => {
    fetchTasks();
    const savedDarkMode = localStorage.getItem("darkMode") === "true";
    setDarkMode(savedDarkMode);
  }, []);

  useEffect(() => {
    document.body.classList.toggle("bg-dark", darkMode);
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleAddTask = async (e) => {
    e.preventDefault();
    try {
      await createTask({ title, description }, token);
      setTitle("");
      setDescription("");
      fetchTasks();
    } catch (error) {
      console.error("Erro ao adicionar tarefa:", error.message);
    }
  };

  const handleToggleTask = async (id, currentStatus) => {
    try {
      const newStatus = currentStatus === "pending" ? "completed" : "pending";
      await updateTask(id, { status: newStatus }, token);
      fetchTasks();
    } catch (error) {
      console.error("Erro ao atualizar tarefa:", error.message);
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      await deleteTask(id, token);
      fetchTasks();
    } catch (error) {
      console.error("Erro ao excluir tarefa:", error.message);
    }
  };

  const toggleDescription = (taskId) => {
    setExpandedTaskId((prevId) => (prevId === taskId ? null : taskId));
  };

  const openEditModal = (task) => {
    setEditingTask(task);
    setEditTitle(task.title);
    setEditDescription(task.description || "");
  };

  const handleEditTask = async () => {
    try {
      await updateTask(
        editingTask.id,
        {
          title: editTitle,
          description: editDescription,
          status: editingTask.status,
        },
        token
      );
      setEditingTask(null);
      fetchTasks();
    } catch (error) {
      console.error("Erro ao editar tarefa:", error.message);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={`min-vh-100 py-5 ${
        darkMode ? "bg-dark text-light" : "bg-light"
      }`}
    >
      <div className="container">
        <header className="mb-5">
          <div className="d-flex justify-content-end gap-3 mb-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setDarkMode(!darkMode)}
              className={`btn ${darkMode ? "btn-light" : "btn-dark"} px-4 py-2`}
            >
              <i className={`bi ${darkMode ? "bi-sun" : "bi-moon"} me-2`}></i>
              {darkMode ? "Modo Claro" : "Modo Escuro"}
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleLogout}
              className={`btn ${
                darkMode ? "btn-outline-light" : "btn-outline-danger"
              } px-4 py-2`}
            >
              <i className="bi bi-box-arrow-right me-2"></i>
              Sair
            </motion.button>
          </div>

          <motion.h1
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className={`display-4 text-center fw-bold mb-4 ${
              darkMode ? "text-info" : "text-primary"
            }`}
          >
            Minhas Tarefas
          </motion.h1>

          <MotivationalQuote />
        </header>

        <main className="row justify-content-center">
          <div className="col-12 col-md-10 col-lg-8">
            <motion.form
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              onSubmit={handleAddTask}
              className="mb-5"
            >
              <div className="d-flex gap-2 flex-column flex-md-row">
                <DarkModeInput
                  type="text"
                  className={`form-control form-control-lg ${
                    darkMode ? "bg-dark text-light border-secondary" : ""
                  }`}
                  placeholder="Digite uma nova tarefa"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  darkMode={darkMode}
                />
                <DarkModeInput
                  type="text"
                  className={`form-control form-control-lg ${
                    darkMode ? "bg-dark text-light border-secondary" : ""
                  }`}
                  placeholder="Descrição (opcional)"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  darkMode={darkMode}
                />
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className={`btn ${
                    darkMode ? "btn-info" : "btn-primary"
                  } btn-lg px-4`}
                >
                  <i className="bi bi-plus-lg me-2"></i>
                  Adicionar
                </motion.button>
              </div>
            </motion.form>

            <AnimatePresence mode="wait">
              <motion.div className="d-flex flex-column gap-3">
                {tasks.map((task) => (
                  <motion.div
                    key={task.id}
                    onClick={(e) => {
                      if (!e.target.closest("button")) {
                        toggleDescription(task.id);
                      }
                    }}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: 20, opacity: 0 }}
                    whileHover={{ scale: 1.01, transition: { duration: 0.2 } }}
                    className={`card shadow-sm ${
                      darkMode
                        ? "bg-transparent text-light border border-info"
                        : "bg-white border-0"
                    } transition-all`}
                  >
                    <div className="card-body p-4">
                      <div className="d-flex justify-content-between align-items-start gap-3 flex-column flex-md-row">
                        <div
                          className="flex-grow-1 cursor-pointer"
                          style={{ cursor: "pointer" }}
                        >
                          <h3
                            className={`h5 mb-0 ${
                              task.status === "completed"
                                ? "text-decoration-line-through opacity-50"
                                : darkMode
                                ? "text-info"
                                : ""
                            }`}
                          >
                            {task.title}
                          </h3>

                          {expandedTaskId === task.id && task.description && (
                            <motion.p
                              initial={{ opacity: 0, y: -5 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -5 }}
                              className={`mt-2 mb-0 ${
                                darkMode
                                  ? "text-light opacity-75"
                                  : "text-muted"
                              } small`}
                            >
                              {task.description}
                            </motion.p>
                          )}
                        </div>

                        <div className="d-flex gap-2 flex-wrap">
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() =>
                              handleToggleTask(task.id, task.status)
                            }
                            className={`btn ${
                              task.status === "pending"
                                ? darkMode
                                  ? "btn-outline-success"
                                  : "btn-outline-success"
                                : darkMode
                                ? "btn-outline-warning"
                                : "btn-outline-warning"
                            } btn-sm px-3`}
                          >
                            <i
                              className={`bi ${
                                task.status === "pending"
                                  ? "bi-check-lg"
                                  : "bi-arrow-counterclockwise"
                              } me-2`}
                            ></i>
                            {task.status === "pending" ? "Concluir" : "Reabrir"}
                          </motion.button>

                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={(e) => {
                              e.stopPropagation();
                              openEditModal(task);
                            }}
                            className={`btn ${
                              darkMode
                                ? "btn-outline-info"
                                : "btn-outline-primary"
                            } btn-sm px-3`}
                          >
                            <i className="bi bi-pencil me-2"></i>
                            Editar
                          </motion.button>

                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleDeleteTask(task.id)}
                            className={`btn ${
                              darkMode
                                ? "btn-outline-danger"
                                : "btn-outline-danger"
                            } btn-sm px-3`}
                          >
                            <i className="bi bi-trash me-2"></i>
                            Excluir
                          </motion.button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </main>
      </div>

      {editingTask && (
        <>
          <div className="modal-backdrop fade show"></div>
          <div className="modal show d-block" tabIndex="-1">
            <div className="modal-dialog modal-dialog-centered">
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className={`modal-content border-0 shadow ${
                  darkMode ? "bg-dark-subtle text-light border-info" : ""
                }`}
              >
                <div className="modal-header border-bottom-0">
                  <h5 className="modal-title h4">Editar Tarefa</h5>
                  <button
                    type="button"
                    className={`btn-close ${darkMode ? "btn-close-white" : ""}`}
                    onClick={() => setEditingTask(null)}
                  />
                </div>
                <div className="modal-body px-4">
                  <div className="mb-4">
                    <label className="form-label">Título</label>
                    <DarkModeInput
                      type="text"
                      className={`form-control form-control-lg ${
                        darkMode ? "bg-dark text-light border-info" : ""
                      }`}
                      value={editTitle}
                      onChange={(e) => setEditTitle(e.target.value)}
                      darkMode={darkMode}
                    />
                  </div>
                  <div className="mb-4">
                    <label className="form-label">Descrição</label>
                    <DarkModeTextArea
                      className={`form-control ${
                        darkMode ? "bg-dark text-light border-info" : ""
                      }`}
                      rows="3"
                      value={editDescription}
                      onChange={(e) => setEditDescription(e.target.value)}
                      darkMode={darkMode}
                    />
                  </div>
                </div>
                <div className="modal-footer border-top-0">
                  <button
                    type="button"
                    className={`btn btn-link text-decoration-none ${
                      darkMode ? "text-info" : ""
                    }`}
                    onClick={() => setEditingTask(null)}
                  >
                    Cancelar
                  </button>
                  <button
                    type="button"
                    className={`btn ${
                      darkMode ? "btn-info" : "btn-primary"
                    } px-4`}
                    onClick={handleEditTask}
                  >
                    Salvar alterações
                  </button>
                </div>
              </motion.div>
            </div>
          </div>
        </>
      )}
    </motion.div>
  );
}

export default TodoList;
