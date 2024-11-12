import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Box } from '@mui/material';  // Import Box from Material-UI
import SignUp from './pages/SignUp';
import Home from './pages/Home';
import Main from './pages/Main';
import Login from './pages/Login';
import Model from './pages/Model';

export default function App() {
  return (
    <Router>
      <Box sx={{ backgroundColor: '#fff', minHeight: '100vh' }}>
        {/* This will set the background color to light blue across the whole page */}
        <Routes>
          <Route path="/" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/main" element={<Main />} />
          <Route path="/model" element={<Model />} />
        </Routes>
      </Box>
    </Router>
  );
}
