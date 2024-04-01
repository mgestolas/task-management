import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./routes/Routes";
import axios from "axios";
axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const App = () => {
  return (
    <div>
      <ToastContainer />
      <Router>
        <AppRoutes />
      </Router>
    </div>
  );
};

export default App;
