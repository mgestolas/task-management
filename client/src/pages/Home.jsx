import React, { useEffect, useState } from "react";
import { IoMdAdd } from "react-icons/io";
import { IoIosSettings } from "react-icons/io";
import TaskItems from "../components/TaskItems";
import TaskForm from "../modals/TaskForm";
import axios from "axios";
import ChangePassword from "../modals/ChangePassword";
const Home = () => {
  const [showForm, setShowForm] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("username");
    window.location.href = "/login";
  };

  const storedUsername = localStorage.getItem("username");
  let username = "";

  if (storedUsername) {
    try {
      username = JSON.parse(storedUsername);
    } catch (error) {
      console.error("Error parsing username from localStorage:", error);
    }
  }

  const handleShowForm = () => {
    setShowForm(true);
  };
  const handeCloseForm = () => {
    setShowForm(false);
  };

  const fetchTask = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      const response = await axios.get("/task/tasks", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTasks(response.data.tasks);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching task: " + error.message);
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchTask();
  }, []);

  const onFetch = () => {
    fetchTask();
  };

  return (
    <div className="bg-white min-h-screen w-full py-12 px-8">
      <h1 className="text-gray-500 text-2xl font-semibold text-center">
        Task Management
      </h1>
      <ChangePassword />
      <div className="navbar rounded-box flex justify-between">
        <div>
          <h1 className="text-indigo-500 font-semibold text-lg ">
            Hello {username}!
          </h1>
        </div>
        <div>
          {!showForm && (
            <button
              onClick={handleShowForm}
              className="btn btn-active btn-primary text-white"
            >
              <IoMdAdd />
              Add Task
            </button>
          )}

          <div className="flex items-stretch">
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost rounded-btn"
              >
                <IoIosSettings /> Settings
              </div>
              <ul
                tabIndex={0}
                className="menu dropdown-content z-[1] p-2 bg-white shadow rounded-box w-52 mt-4"
              >
                <li>
                  <label htmlFor="my_modal_6">Change Password</label>
                </li>
                <li onClick={handleLogout}>
                  <a>Log Out</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      {showForm && <TaskForm onClose={handeCloseForm} onTaskAdded={onFetch} />}
      <TaskItems tasks={tasks} onDelete={onFetch} isLoading={isLoading} />
    </div>
  );
};

export default Home;
