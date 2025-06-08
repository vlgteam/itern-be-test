// src/routes/PrivateRoute.tsx
import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import type { JSX } from "react";

interface PrivateRouteProps {
  children: JSX.Element;
  allowedRoles: string[]; // ví dụ: ['admin'], ['user']
}

interface DecodedToken {
  role: string;
  exp: number;
}

const getUserRole = (): string | null => {
  const token = Cookies.get("accessToken");
  if (!token) return null;

  try {
    const decoded = jwtDecode<DecodedToken>(token);
    console.log("🚀 User role:", decoded.role);
    return decoded.role;
  } catch (error) {
    return null;
  }
};

const PrivateRoute = ({ children, allowedRoles }: PrivateRouteProps) => {
  const role = getUserRole();

  if (!role) return <Navigate to="/" replace />;
  if (!allowedRoles.includes(role)) return <Navigate to="/" replace />;

  return children;
};

export default PrivateRoute;
