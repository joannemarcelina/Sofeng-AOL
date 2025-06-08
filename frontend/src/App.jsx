import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Discover from "./pages/Discover";
import Home from "./pages/HomePage";
import Profile from './pages/Profile';
import PrivateRoute from './components/PrivateRoute'; // <-- add this

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />

        {/* Protected Routes */}
        <Route path="/discover" element={
          <PrivateRoute><Discover /></PrivateRoute>
        } />
        <Route path="/home" element={
          <PrivateRoute><Home /></PrivateRoute>
        } />
        <Route path="/profile" element={
          <PrivateRoute><Profile /></PrivateRoute>
        } />
      </Routes>
    </Router>
  );
}

export default App;
