import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; 
import SignUp from './pages/SignUp';
import Home from './pages/Home'; 
import Main from './pages/Main'; 
import Login from './pages/Login';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignUp />} />
        <Route path="/login" element={<Login />} /> {/* Note: Change path to lowercase */}
        <Route path="/home" element={<Home />} />  {/* Uncomment when ready to use */}
        <Route path="/main" element={<Main />} />  {/* Uncomment when ready to use */}
      </Routes>
    </Router>
  );
}
