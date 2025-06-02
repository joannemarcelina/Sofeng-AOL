import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import SignIn from './pages/SignIn';
// import SignUp from './pages/SignUp';
import Discover from './pages/Discover';
// import Profile from './pages/Profile';

function App() {
  return (
    <Router>
      <Routes>
        {/* <Route path="/" element={<SignIn />} /> */}
        {/* <Route path="/signUp" element={<SignUp />} /> */}
        <Route path="/discover" element={<Discover />} />
        {/* <Route path="/profile" element={<Profile />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
