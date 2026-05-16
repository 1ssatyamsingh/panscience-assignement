import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import Login from "../pages/Login";
import Register from "../pages/Register";
import Dashboard from "../pages/Dashboard";
import Tasks from "../pages/Tasks";
import CreateTask from "../pages/CreateTask";
import Users from "../pages/Users";

const AppRoutes = () => {

  return (
    <BrowserRouter>

      <Routes>

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/dashboard"
          element={<Dashboard />}
        />

        <Route
          path="/tasks"
          element={<Tasks />}
        />

        <Route
          path="/create-task"
          element={<CreateTask />}
        />

        <Route
          path="/users"
          element={<Users />}
        />

      </Routes>

    </BrowserRouter>
  );
};

export default AppRoutes;