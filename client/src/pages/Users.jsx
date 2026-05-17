import { useEffect, useState } from "react";

import api from "../api/axios";

const Users = () => {
  const [users, setUsers] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  // fetch users
  const fetchUsers = async () => {
    try {
      setLoading(true);

      const res = await api.get("/users");

      setUsers(res.data.data.users);
    } catch (error) {
      setError(error.response?.data?.message || "Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // delete user
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Delete this user?");

    if (!confirmDelete) return;

    try {
      await api.delete(`/users/${id}`);

      fetchUsers();
    } catch (error) {
      console.log(error);
    }
  };

  // update role
  const handleRoleChange = async (id, role) => {
    try {
      await api.put(`/users/${id}`, { role });

      fetchUsers();
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) {
    return <p className="text-xl">Loading users...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Users</h1>

      <div className="bg-white rounded-xl shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="text-left p-4">Email</th>

              <th className="text-left p-4">Role</th>

              <th className="text-left p-4">Actions</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user) => (
              <tr key={user._id} className="border-t">
                <td className="p-4">{user.email}</td>

                <td className="p-4">
                  <select
                    value={user.role}
                    onChange={(e) => handleRoleChange(user._id, e.target.value)}
                    className="border p-2 rounded-lg"
                  >
                    <option value="user">User</option>

                    <option value="admin">Admin</option>
                  </select>
                </td>

                <td className="p-4">
                  {user.role !== "admin" && (
                    <button
                      onClick={() => handleDelete(user._id)}
                      className="bg-red-500 text-white px-4 py-2 rounded-lg"
                    >
                      Delete
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;
