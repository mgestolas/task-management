import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
const UpdateTask = () => {
  const [task, setTask] = useState("");
  const [error, setError] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  const fetchTask = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      const response = await axios.get(`/task/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTask(response.data.task);
    } catch (error) {
      console.error("Error fetching task: " + error.message);
    }
  };
  useEffect(() => {
    fetchTask();
  }, []);
  const handleUpdate = async (e) => {
    e.preventDefault();
    if (task.length === 0) {
      setError("Please add task");
    }
    setTimeout(() => {
      setError("");
    }, 2000);
    try {
      const token = localStorage.getItem("accessToken");
      const response = await axios.put(
        `/task/update/${id}`,
        {
          task,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success(response.data.message);
      navigate("/");
    } catch (error) {
      console.error("Error submitting task:", error);
    }
  };
  return (
    <div className="bg-white min-h-screen">
      <div className="flex items-center justify-center">
        <div className="max-w-sm mt-60 flex flex-col w-full gap-4">
          <h1 className="text-gray-500 text-2xl font-semibold text-center">
            Update Task
          </h1>
          <input
            type="text"
            onChange={(e) => setTask(e.target.value)}
            placeholder="Enter your task here..."
            className="input input-bordered input-primary w-full bg-transparent"
            value={task}
          />
          <button
            onClick={handleUpdate}
            className="btn btn-active btn-primary text-white"
          >
            <FaRegEdit />
            Update Task
          </button>
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
      </div>
    </div>
  );
};

export default UpdateTask;
