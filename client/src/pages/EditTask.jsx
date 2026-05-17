import { useEffect, useState } from "react";

import { useNavigate, useParams } from "react-router-dom";

import api from "../api/axios";

const EditTask = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const [users, setUsers] = useState([]);

  const [existingDocs, setExistingDocs] = useState([]);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const [documents, setDocuments] = useState([]);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "pending",
    priority: "medium",
    dueDate: "",
    assignedTo: "",
  });

  // fetch users
  const fetchUsers = async () => {
    try {
      const res = await api.get("/users/list");

      setUsers(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  // fetch task
  const fetchTask = async () => {
    try {
      const res = await api.get(`/tasks/${id}`);

      const task = res.data.data;

      setExistingDocs(task.documents || []);

      setFormData({
        title: task.title || "",

        description: task.description || "",

        status: task.status || "pending",

        priority: task.priority || "medium",

        dueDate: task.dueDate?.split("T")[0] || "",

        assignedTo: task.assignedTo?._id || "",
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUsers();

    fetchTask();
  }, []);

  // input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // file upload
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);

    if (files.length > 3) {
      setError("Maximum 3 PDFs allowed");

      return;
    }

    setDocuments(files);
  };

  // update task
  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    try {
      setLoading(true);

      const taskData = new FormData();

      Object.keys(formData).forEach((key) => {
        taskData.append(key, formData[key]);
      });

      // append files
      documents.forEach((file) => {
        taskData.append("documents", file);
      });

      await api.put(`/tasks/${id}`, taskData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      navigate("/tasks");
    } catch (error) {
      setError(error.response?.data?.message || "Task update failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white p-8 rounded-2xl shadow">
      <h1 className="text-3xl font-bold mb-6">Edit Task</h1>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Title */}
        <input
          type="text"
          name="title"
          placeholder="Task title"
          value={formData.title}
          onChange={handleChange}
          className="w-full border p-3 rounded-lg"
        />

        {/* Description */}
        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          className="w-full border p-3 rounded-lg"
          rows="4"
        />

        {/* Status */}
        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="w-full border p-3 rounded-lg"
        >
          <option value="pending">Pending</option>

          <option value="in-progress">In Progress</option>

          <option value="completed">Completed</option>
        </select>

        {/* Priority */}
        <select
          name="priority"
          value={formData.priority}
          onChange={handleChange}
          className="w-full border p-3 rounded-lg"
        >
          <option value="low">Low</option>

          <option value="medium">Medium</option>

          <option value="high">High</option>
        </select>

        {/* Due Date */}
        <input
          type="date"
          name="dueDate"
          value={formData.dueDate}
          onChange={handleChange}
          className="w-full border p-3 rounded-lg"
        />

        {/* Assign User */}
        <select
          name="assignedTo"
          value={formData.assignedTo}
          onChange={handleChange}
          className="w-full border p-3 rounded-lg"
        >
          <option value="">Assign User</option>

          {users.map((user) => (
            <option key={user._id} value={user._id}>
              {user.email}
            </option>
          ))}
        </select>

        {/* PDFs */}
        <input
          type="file"
          multiple
          accept="application/pdf"
          onChange={handleFileChange}
          className="w-full border p-3 rounded-lg"
        />
        {/* Existing Documents */}
        {existingDocs.length > 0 && (
          <div className="mt-4">
            <h3 className="font-semibold mb-2">Existing Documents</h3>

            <div className="flex flex-col gap-2">
              {existingDocs.map((doc, index) => (
                <a
                  key={index}
                  href={`http://localhost:8000${doc.filePath}`}
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-500 underline"
                >
                  View PDF {index + 1}
                </a>
              ))}
            </div>
          </div>
        )}

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className={`px-6 py-3 rounded-lg text-white
          ${loading ? "bg-gray-400" : "bg-black"}`}
        >
          {loading ? "Updating..." : "Update Task"}
        </button>
      </form>
    </div>
  );
};

export default EditTask;
