import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [isProfileComplete, setIsProfileComplete] = useState(null);
  const [shouldRedirect, setShouldRedirect] = useState(false);


  useEffect(() => {
    axios.get('http://localhost:3001/profile/me', { withCredentials: true })
      .then(() => setIsAuthenticated(true))
      .catch(() => setIsAuthenticated(false));

    axios.get('http://localhost:3001/profile/check-profile-complete', { withCredentials: true })
      .then(res => {
        console.log("Check profile complete response:", res.data);
        setIsProfileComplete(res.data.complete); //
      })
      .catch(err => {
        console.error("Profile check failed", err);
        setIsProfileComplete(false);
      });
  }, []);

  useEffect(() => {
    if (isAuthenticated && isProfileComplete === false) {
      alert("Please complete your profile first.");
      setShouldRedirect(true);
    }
  }, [isAuthenticated, isProfileComplete]);

  if (isAuthenticated === null || isProfileComplete === null) return null;
  if (!isAuthenticated) return <Navigate to="/sign-in" />;
  if (shouldRedirect) return <Navigate to="/profile" />;

  return children;
}
