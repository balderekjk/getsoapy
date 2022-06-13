import './App.css';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import { AuthProvider } from './contexts/AuthContext';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ForgotPassword from './pages/ForgotPassword';

function App() {
  return (
    <div className="App">
      <SignUp />
    </div>
  );
}

export default App;
