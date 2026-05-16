import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import api from "../api/axios";

const CreateTask = () => {
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);

  const [error, setError] = useState("");

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "pending",
    priority: "medium",
    dueDate: "",
    assignedTo: "",
  });

  const [documents, setDocuments] = useState([]);

  // fetch users
  const fetchUsers = async () => {
    try {
      const res = await api.get("/users");

      setUsers(res.data.data.users);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // handle text input
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // handle files
  const handleFileChange = (e) => {
    setDocuments(e.target.files);
  };

  // submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (documents.length > 3) {
      return setError("Maximum 3 PDFs allowed");
    }

    try {
      setLoading(true);

      const taskData = new FormData();

      Object.keys(formData).forEach((key) => {
        taskData.append(key, formData[key]);
      });

      // append files
      for (let i = 0; i < documents.length; i++) {
        taskData.append("documents", documents[i]);
      }

      await api.post("/tasks", taskData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      navigate("/tasks");
    } catch (error) {
      setError(error.response?.data?.message || "Task creation failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow">
      <h1 className="text-3xl font-bold mb-6">Create Task</h1>

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
          required
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

        {/* File Upload */}
        <div>
          <label className="block mb-2 font-semibold">Upload PDFs</label>

          <input
            type="file"
            multiple
            accept="application/pdf"
            onChange={handleFileChange}
            className="w-full border p-3 rounded-lg"
          />
        </div>
        {documents.length > 0 && (
          <ul className="mt-2">
            {[...documents].map((file, index) => (
              <li key={index}>{file.name}</li>
            ))}
          </ul>
        )}

        {/* Submit */}

        <button
          type="submit"
          disabled={loading}
          className="bg-black text-white px-6 py-3 rounded-lg"
        >
          {loading ? "Creating..." : "Create Task"}
        </button>
      </form>
    </div>
  );
};

export default CreateTask;
