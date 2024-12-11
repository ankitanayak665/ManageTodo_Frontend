import logo from './logo.svg';
import './App.css';
import HeaderSection from './HeaderSection';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './LoginPage';
import Tasks from './Tasks';
import SignUp from './SignUp';

// import MenuIcon from '@mui/icons-material/Menu';

function App() {

  return (
    <Router>
      <HeaderSection />
      <Routes>
        <Route path="/login" element={<LoginPage />} /> {/* Main/Home route */}
        <Route path="/tasks" element={<Tasks />} /> {/* Tasks route */}
        <Route path="/signUp" element={<SignUp />} /> {/* Tasks route */}

      </Routes>
    </Router>

  );
}

export default App;
