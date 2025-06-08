import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Discover from "./pages/Discover";
import Home from "./pages/HomePage";
import Profile from "./pages/Profile";
import PrivateRoute from './components/PrivateRoute'; // <-- add this
import Chat from "./pages/Chat";
import ChatList from "./pages/ChatList";

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
        <Route path="/discover" element={<Discover />} />
        <Route path="/home" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/chat" element={<ChatList />} />
        <Route path="/chat-room" element={<Chat />} />

      </Routes>
    </Router>
  );
}

export default App;
