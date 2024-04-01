import { FaRegTrashAlt, FaRegEdit } from "react-icons/fa";
import { formatDistanceToNow } from "date-fns";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
const TaskItems = ({ tasks, onDelete, isLoading }) => {
  const formatMessageDate = (date) => {
    return formatDistanceToNow(new Date(date), { addSuffix: true });
  };
  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("accessToken");
      const response = await axios.delete(`/task/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success(response.data.message);
      onDelete();
    } catch (error) {
      console.error("Error deleting task: " + error);
    }
  };
  return (
    <div className="w-full min-h-screen  py-8">
      <div className="text-gray-500">
        {isLoading ? (
          <span className="loading loading-spinner text-primary"></span>
        ) : tasks.length === 0 ? (
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
            <span>No tasks available.</span>
          </div>
        ) : (
          tasks.map((task, i) => (
            <div key={i} className="bg-gray-200 mb-2 p-4 rounded-md ">
              <div className="flex justify-between items-center">
                <div className="flex flex-col">
                  <p> {task.task}</p>
                  <span className="text-xs text-gray-400">
                    {formatMessageDate(task.createdAt)}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <Link to={`/update/${task._id}`}>
                    <FaRegEdit
                      size={20}
                      title="Update"
                      className="text-indigo-500 cursor-pointer"
                    />
                  </Link>
                  <FaRegTrashAlt
                    size={20}
                    title="Delete"
                    className="text-red-500 cursor-pointer"
                    onClick={() => handleDelete(task._id)}
                  />
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default TaskItems;
