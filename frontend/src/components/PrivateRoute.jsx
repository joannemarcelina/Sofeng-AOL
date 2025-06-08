import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function PrivateRoute({ children }) {
  const [authChecked, setAuthChecked] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:3001/me", { withCredentials: true })
      .then(() => {
        setIsAuthenticated(true);
        setAuthChecked(true);
      })
      .catch(() => {
        setIsAuthenticated(false);
        setAuthChecked(true);
      });
  }, []);

  if (!authChecked) return null; // You can replace with loading spinner

  return isAuthenticated ? children : <Navigate to="/sign-in" />;
}
