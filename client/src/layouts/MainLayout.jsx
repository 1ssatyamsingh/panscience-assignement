import { Outlet, Link, useNavigate } from "react-router-dom";

import { useDispatch } from "react-redux";

import { logout } from "../features/auth/authSlice";

const MainLayout = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());

    navigate("/login");
  };

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-black text-white p-6">
        <h1 className="text-2xl font-bold mb-10">Task Manager</h1>

        <nav className="flex flex-col gap-4">
          <Link to="/dashboard" className="hover:bg-gray-800 p-2 rounded-lg">
            Dashboard
          </Link>

          <Link to="/tasks" className="hover:bg-gray-800 p-2 rounded-lg">
            Tasks
          </Link>

          <Link to="/create-task" className="hover:bg-gray-800 p-2 rounded-lg">
            Create Task
          </Link>

          <Link to="/users" className="hover:bg-gray-800 p-2 rounded-lg">
            Users
          </Link>

          <button
            onClick={handleLogout}
            className="bg-red-500 py-2 rounded-lg mt-6"
          >
            Logout
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        {/* Navbar */}
        <div className="bg-white shadow-md rounded-xl p-4 mb-6">
          <h2 className="text-2xl font-semibold">Dashboard</h2>
        </div>

        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
