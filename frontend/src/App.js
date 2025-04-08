import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import TodoList from "./components/TodoList";

import { AuthProvider, AuthContext } from "./AuthContext";

function App() {
  const isAuthenticated = !!localStorage.getItem("token");

  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route
            path="/login"
            element={
              <AuthContext.Consumer>
                {({ isAuthenticated }) =>
                  isAuthenticated ? <Navigate to="/todos" /> : <Login />
                }
              </AuthContext.Consumer>
            }
          />
          <Route
            path="/register"
            element={
              <AuthContext.Consumer>
                {({ isAuthenticated }) =>
                  isAuthenticated ? <Navigate to="/todos" /> : <Register />
                }
              </AuthContext.Consumer>
            }
          />
          <Route
            path="/todos"
            element={
              <AuthContext.Consumer>
                {({ isAuthenticated }) =>
                  isAuthenticated ? <TodoList /> : <Navigate to="/login" />
                }
              </AuthContext.Consumer>
            }
          />
          <Route
            path="*"
            element={
              <AuthContext.Consumer>
                {({ isAuthenticated }) => (
                  <Navigate to={isAuthenticated ? "/todos" : "/login"} />
                )}
              </AuthContext.Consumer>
            }
          />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
