import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Navbar from './components/Navbar';
import Authenticate from './components/Authenticate';
import Reflect from './components/Reflect';
import Welcome from './components/Welcome';
import Personal from './components/Personal';

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<Welcome />} />
            <Route path="/auth" element={<Authenticate />} />
            <Route path="/reflect" element={<Reflect />} />
            <Route path="/personal" element={<Personal editable={true} />} />
            <Route path="/explore" element={<Personal editable={false} />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
