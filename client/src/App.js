import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import './App.css';
import { Login } from './components/login';
import { Register } from './components/register';
import { Dashboard } from './components/admin/dashboard';
import { Home } from './components/home';
import { Navbar } from './components/navbar';

function App() {
  return (
    <div className='main'>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
