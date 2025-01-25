import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';  
import './App.css';
import Register from './pages/Register';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import { Logout } from './components/Logout'; // Import Logout component
import  ProtectedRoute  from "./components/ProtectedRoute"; // Import ProtectedRoute

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} /> {/* No protection on Home */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        {/* Protect only the Dashboard route */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        
        <Route path="/logout" element={<Logout />} /> {/* Redirects to / after logout */}
      </Routes>
    </Router>
  );
};

export default App;
