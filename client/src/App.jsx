import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';  
import './App.css';
import Register from './pages/Register';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import { Logout } from './components/Logout'; // Import Logout component
import Report from './pages/Report';
import  ProtectedRoute  from "./components/ProtectedRoute"; // Import ProtectedRoute
import AdminLayout from './components/layouts/AdminLayout';
import AdminUsers from './pages/AdminUsers';
import AdminUpdate from './pages/AdminUpdate';
import Account from './pages/Account';
import About from './pages/About';
import Help from "./pages/Help";
import ChangePassword from './pages/ChangePassword';

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
        <Route path="/report" element={<Report />} /> 
        <Route path="/account" element={<Account />} /> 
        <Route path="/users/:id/change-password" element={<ChangePassword />} />
        <Route path="/help" element={<Help />} /> 
        <Route path="/about" element={<About />} /> 
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="users" element={<AdminUsers />} />
       
          <Route path="users/:id/edit" element={<AdminUpdate />} />
          
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
