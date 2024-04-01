import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";

const ChangePassword = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState("");
  const [togglePassword, setTogglePassword] = useState(false);
  const handleTogglePassword = () => {
    setTogglePassword(!togglePassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (currentPassword.length === 0 || newPassword.length === 0) {
      setError("All fields are required");
    }
    setTimeout(() => {
      setError("");
    }, 2000);
    try {
      const token = localStorage.getItem("accessToken");
      const response = await axios.put(
        "/auth/changePassword",
        {
          currentPassword,
          newPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success(response.data.message);
    } catch (error) {
      console.error("Error submitting task:", error);
      setTimeout(() => {
        setError("");
      }, 2000);
    }
  };
  return (
    <div>
      {/* Put this part before </body> tag */}
      <input type="checkbox" id="my_modal_6" className="modal-toggle" />
      <div className="modal" role="dialog">
        <div className="modal-box bg-white">
          <h3 className="font-bold text-lg">Change Password</h3>
          <div className="py-8 flex flex-col gap-4">
            <div>
              <label>Current Password</label>
              <input
                onChange={(e) => setCurrentPassword(e.target.value)}
                type={`${!togglePassword ? "password" : "text"}`}
                placeholder="Enter your current password "
                className="input input-bordered input-primary w-full bg-transparent"
              />
            </div>
            <div>
              <label>New Password</label>
              <input
                onChange={(e) => setNewPassword(e.target.value)}
                type={`${!togglePassword ? "password" : "text"}`}
                placeholder="Enter your new password "
                className="input input-bordered input-primary w-full bg-transparent"
              />
            </div>

            <div className="flex items-center">
              <input
                id="showPassword"
                name="showPassword"
                type="checkbox"
                onChange={handleTogglePassword}
                checked={togglePassword}
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <label
                htmlFor="showPassword"
                className="ml-2 block text-sm text-gray-900"
              >
                Show password
              </label>
            </div>
            <div>
              <button
                onClick={handleSubmit}
                className="btn btn-active btn-primary text-white"
              >
                Submit
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
          <div className="modal-action">
            <label htmlFor="my_modal_6" className="btn btn-neutral">
              Close!
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
