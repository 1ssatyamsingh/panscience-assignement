import { useEffect, useState } from "react";

import api from "../api/axios";
import { Link } from "react-router-dom";

const Tasks = () => {
  const [tasks, setTasks] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const [statusFilter, setStatusFilter] = useState("");

  // fetch tasks
  const fetchTasks = async () => {
    try {
      setLoading(true);

      const res = await api.get(`/tasks?status=${statusFilter}`);

      setTasks(res.data.data.tasks);
    } catch (error) {
      setError("Failed to fetch tasks");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [statusFilter]);

  // delete task
  const handleDelete = async (id) => {
    try {
      await api.delete(`/tasks/${id}`);

      fetchTasks();
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) {
    return <p className="text-xl">Loading tasks...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <div>
      {/* Header */}

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Tasks</h1>
        <Link
          to="/create-task"
          className="bg-black text-white px-4 py-2 rounded-lg"
        >
          Create Task
        </Link>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="border p-2 rounded-lg"
        >
          <option value="">All Status</option>

          <option value="pending">Pending</option>

          <option value="in-progress">In Progress</option>

          <option value="completed">Completed</option>
        </select>
      </div>

      {tasks.length === 0 && <p className="text-gray-500">No tasks found</p>}
      {/* Task Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tasks.map((task) => (
          <div key={task._id} className="bg-white p-6 rounded-xl shadow">
            <div className="flex justify-between items-start">
              <h2 className="text-xl font-semibold">{task.title}</h2>

              <span
                className={`px-3 py-1 rounded-full text-sm text-white
                ${
                  task.status === "completed"
                    ? "bg-green-500"
                    : task.status === "in-progress"
                      ? "bg-yellow-500"
                      : "bg-red-500"
                }`}
              >
                {task.status}
              </span>
            </div>

            <p className="text-gray-600 mt-3">{task.description}</p>

            <div className="mt-4">
              <p>
                <span className="font-semibold">Priority:</span> {task.priority}
              </p>

              <p>
                <span className="font-semibold">Due:</span>{" "}
                {task.dueDate
                  ? new Date(task.dueDate).toLocaleDateString()
                  : "N/A"}
              </p>
            </div>

            {/* Documents */}
            {task.documents?.length > 0 && (
              <div className="mt-4">
                <h3 className="font-semibold mb-2">Documents</h3>

                <div className="flex flex-col gap-2">
                  {task.documents.map((doc, index) => (
                    <a
                      key={index}
                      href={`http://localhost:8000${doc.filePath}`}
                      target="_blank"
                      rel="noreferrer"
                      className="text-blue-500 underline"
                    >
                      View PDF
                    </a>
                  ))}
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="flex gap-3 mt-6">
              <button className="bg-blue-500 text-white px-4 py-2 rounded-lg">
                Edit
              </button>

              <button
                onClick={() => handleDelete(task._id)}
                className="bg-red-500 text-white px-4 py-2 rounded-lg"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tasks;
