import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { AdminProvider } from './contexts/AdminContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import Projects from './pages/Projects';
import Features from './pages/Features';
import Skills from './pages/Skills';
import Contact from './pages/Contact';
import AdminPanel from './components/AdminPanel';
import './App.css';

function App() {
  return (
    <ThemeProvider>
      <AdminProvider>
        <Router>
          <div className="App">
            <Navbar />
            <main>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/features" element={<Features />} />
                <Route path="/skills" element={<Skills />} />
                <Route path="/contact" element={<Contact />} />
              </Routes>
            </main>
            <AdminPanel />
          </div>
        </Router>
      </AdminProvider>
    </ThemeProvider>
  );
}

export default App;
