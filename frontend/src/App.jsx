import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Discover from "./pages/Discover";
import Home from "./pages/HomePage";
import Profile from "./pages/Profile";
import Chat from "./pages/Chat";
import ChatList from "./pages/ChatList";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
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
