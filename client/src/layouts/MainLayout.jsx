import { Outlet, Link, useNavigate, NavLink } from "react-router-dom";

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
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              `px-3 py-2 rounded-lg transition
    ${isActive ? "bg-white text-black" : "hover:bg-gray-800"}`
            }
          >
            Dashboard
          </NavLink>

          <NavLink
            to="/tasks"
            className={({ isActive }) =>
              `px-3 py-2 rounded-lg transition
    ${isActive ? "bg-white text-black" : "hover:bg-gray-800"}`
            }
          >
            Tasks
          </NavLink>

          <NavLink
            to="/create-task"
            className={({ isActive }) =>
              `px-3 py-2 rounded-lg transition
    ${isActive ? "bg-white text-black" : "hover:bg-gray-800"}`
            }
          >
            Create Task
          </NavLink>

          <NavLink
            to="/users"
            className={({ isActive }) =>
              `px-3 py-2 rounded-lg transition
    ${isActive ? "bg-white text-black" : "hover:bg-gray-800"}`
            }
          >
            Users
          </NavLink>

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

        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
