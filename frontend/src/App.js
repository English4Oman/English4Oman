import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';

// Import pages
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Quizzes from './pages/Quizzes';
import Progress from './pages/Progress';
import Forum from './pages/Forum';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1>English4Oman</h1>
          <nav>
            <ul className="nav-links">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/dashboard">Dashboard</Link></li>
              <li><Link to="/quizzes">Quizzes</Link></li>
              <li><Link to="/progress">Progress</Link></li>
              <li><Link to="/forum">Forum</Link></li>
            </ul>
          </nav>
        </header>
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/quizzes" element={<Quizzes />} />
            <Route path="/progress" element={<Progress />} />
            <Route path="/forum" element={<Forum />} />
          </Routes>
        </main>
        <footer>
          <p>&copy; 2025 English4Oman. All rights reserved.</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
