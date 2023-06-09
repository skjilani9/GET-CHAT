import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Chat from './pages/Chat'
import Login from './pages/Login'
import Register from './pages/Register'
import SetAvatar from "./pages/SetAvatar";
import Home from "./pages/Home";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/chat' element={<Chat />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/setavatar' element={<SetAvatar />} />
      </Routes>
    </Router>
  );
}

export default App;
