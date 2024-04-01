import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../forms/Login";
import Home from "../pages/Home";
import NotFound from "../404/NotFound";
import Register from "../forms/Register";
import UpdateTask from "../pages/UpdateTask";

const AppRoutes = () => {
  const isAuthenticated = localStorage.getItem("accessToken");

  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={isAuthenticated ? <Home /> : <Navigate to="/login" />}
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/update/:id" element={<UpdateTask />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

export default AppRoutes;
