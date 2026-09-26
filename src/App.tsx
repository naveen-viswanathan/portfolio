import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import CustomCursor from './components/CustomCursor';
import SearchModal from './components/SearchModal';
import Home from './pages/Home';
import Work from './pages/Work';
import Stack from './pages/Stack';
import Personal from './pages/Personal';

export default function App() {
  const [theme, setTheme] = useState('dark');
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  useEffect(() => {
    document.documentElement.className = theme;
  }, [theme]);

  return (
    <Router>
      <div className={`flex flex-col md:flex-row min-h-screen h-screen overflow-hidden transition-colors duration-300 ${theme === 'dark' ? 'bg-[#121212] text-white' : 'bg-[#F2F2F2] text-black'}`}>
        <CustomCursor />
        
        <Sidebar theme={theme} setTheme={setTheme} onOpenSearch={() => setIsSearchOpen(true)} />
        
        <main className="flex-1 h-full overflow-y-auto p-8 md:p-16 relative">
          <Routes>
            <Route path="/" element={<Home theme={theme} />} />
            <Route path="/work" element={<Work theme={theme} />} />
            <Route path="/stack" element={<Stack theme={theme} />} />
            <Route path="/personal" element={<Personal theme={theme} />} />
          </Routes>
        </main>

        <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} theme={theme} />
      </div>
    </Router>
  );
}