// src/routes/AppRouter.tsx
import { Routes, Route } from "react-router-dom";
import Login from "../pages/authentication/Login";
import Register from "../pages/authentication/Register";
import HomeContentForm from "../pages/home/HomeContentCreate";
import UserHome from "../pages/home/UserHome";
import PrivateRoute from "./PrivateRoute";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Chỉ cho role "admin" truy cập */}
      <Route
        path="/admin/homepage"
        element={
          <PrivateRoute allowedRoles={["admin"]}>
            <HomeContentForm />
          </PrivateRoute>
        }
      />

      {/* Chỉ cho role "user" truy cập */}
      <Route
        path="/user/homepage"
        element={
          <PrivateRoute allowedRoles={["user"]}>
            <UserHome />
          </PrivateRoute>
        }
      />
    </Routes>
  );
};

export default AppRouter;
