import axios from "axios";
import React, { useState } from "react";
import { IoMdAdd } from "react-icons/io";

const TaskForm = ({ onClose, onTaskAdded }) => {
  const [task, setTask] = useState("");
  const [error, setError] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (task.length === 0) {
      setError("Please add task");
    }
    setTimeout(() => {
      setError("");
    }, 2000);
    try {
      const token = localStorage.getItem("accessToken");
      await axios.post(
        "/task/add",
        {
          task,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      onTaskAdded();
      onClose();
      setTask("");
    } catch (error) {
      console.error("Error submitting task:", error);
    }
  };
  return (
    <div>
      <div className="flex items-center py-2 gap-2">
        <input
          type="text"
          onChange={(e) => setTask(e.target.value)}
          placeholder="Enter your task here..."
          className="input input-bordered input-primary w-full bg-transparent"
        />
        <button
          onClick={handleSubmit}
          className="btn btn-active btn-primary text-white"
        >
          <IoMdAdd />
          Add Task
        </button>
      </div>
      {error && (
        <div role="alert" className="alert alert-error">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="stroke-current shrink-0 h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>{error}</span>
        </div>
      )}
    </div>
  );
};

export default TaskForm;
