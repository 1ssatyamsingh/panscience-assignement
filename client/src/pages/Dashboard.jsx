import { useEffect, useState } from "react";

import api from "../api/axios";

const Dashboard = () => {
  const [stats, setStats] = useState(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const fetchStats = async () => {
    try {
      setLoading(true);

      const res = await api.get("/tasks/stats/dashboard");

      setStats(res.data.data);
    } catch (error) {
      setError("Failed to fetch dashboard");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  if (loading) {
    return <p className="text-xl">Loading dashboard...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <div className="space-y-8">
      {/* Stats Cards */}
      <div className="bg-white shadow-md rounded-xl p-4 mb-6">
        <h2 className="text-2xl font-semibold">Dashboard</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-lg font-semibold">Total Tasks</h2>

          <p className="text-4xl font-bold mt-4">{stats.totalTasks}</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-lg font-semibold">Completed</h2>

          <p className="text-4xl font-bold mt-4 text-green-500">
            {stats.completedTasks}
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-lg font-semibold">Pending</h2>

          <p className="text-4xl font-bold mt-4 text-red-500">
            {stats.pendingTasks}
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-lg font-semibold">In Progress</h2>

          <p className="text-4xl font-bold mt-4 text-yellow-500">
            {stats.inProgressTasks}
          </p>
        </div>
      </div>

      {/* Recent Tasks */}
      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="text-2xl font-bold mb-6">Recent Tasks</h2>

        <div className="space-y-4">
          {stats.recentTasks.map((task) => (
            <div
              key={task._id}
              className="flex justify-between items-center border-b pb-3"
            >
              <div>
                <h3 className="font-semibold">{task.title}</h3>

                <p className="text-sm text-gray-500">{task.priority}</p>
              </div>

              <span
                className={`px-3 py-1 rounded-full text-white text-sm
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
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
