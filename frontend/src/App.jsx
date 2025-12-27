import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Discover from "./pages/Discover";
import Home from "./pages/HomePage";
import Profile from "./pages/Profile";
import PrivateRoute from './components/PrivateRoute';
import Chat from './pages/Chat';
import ChatList from "./pages/ChatList";
import ProtectedRoute from './components/ProtectedRoute';

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
          <PrivateRoute><ProtectedRoute><Home /></ProtectedRoute></PrivateRoute>
        } />
        <Route path="/profile" element={
          <PrivateRoute><Profile /></PrivateRoute>
        } />
        <Route path="/discover" element={
          <PrivateRoute><ProtectedRoute><Discover /></ProtectedRoute></PrivateRoute>
        } />
        <Route path="/home" element={
          <PrivateRoute><ProtectedRoute><Home /></ProtectedRoute></PrivateRoute>
        } />
        <Route path="/chat" element={
          <PrivateRoute><ProtectedRoute><ChatList /></ProtectedRoute></PrivateRoute>
        } />
        <Route path="/chat-room/:chatroomID" element={
          <PrivateRoute><Chat /></PrivateRoute>
        } />

      </Routes>
    </Router>
  );
}

export default App;
