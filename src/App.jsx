import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';  
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import './App.css';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/sign" element={<SignUpPage />} />

      </Routes>
    </Router>
  );
};

export default App;
