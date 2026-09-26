import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  theme: string;
}

export default function SearchModal({ isOpen, onClose, theme }: SearchModalProps) {
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-start justify-center pt-[20vh]">
      <div className={`w-full max-w-lg rounded-xl shadow-2xl border ${theme === 'dark' ? 'bg-[#1a1a1a] border-gray-700' : 'bg-white border-gray-200'} overflow-hidden`}>
        <div className="p-4 border-b border-gray-700/50">
          <input 
            autoFocus
            type="text" 
            placeholder="Search portfolio..." 
            className={`w-full bg-transparent border-none outline-none text-lg ${theme === 'dark' ? 'text-white placeholder-gray-500' : 'text-black placeholder-gray-400'}`}
          />
        </div>
        <div className="p-2">
          <div className={`px-4 py-3 cursor-pointer rounded-lg ${theme === 'dark' ? 'hover:bg-gray-800' : 'hover:bg-gray-100'} transition-colors`} onClick={() => { navigate('/'); onClose(); }}>
            <span className={theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}>Go to Profile</span>
          </div>
          <div className={`px-4 py-3 cursor-pointer rounded-lg ${theme === 'dark' ? 'hover:bg-gray-800' : 'hover:bg-gray-100'} transition-colors`} onClick={() => { navigate('/work'); onClose(); }}>
            <span className={theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}>Go to Experience</span>
          </div>
          <div className={`px-4 py-3 cursor-pointer rounded-lg ${theme === 'dark' ? 'hover:bg-gray-800' : 'hover:bg-gray-100'} transition-colors`} onClick={() => { navigate('/stack'); onClose(); }}>
            <span className={theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}>Go to Stack</span>
          </div>
          <div className={`px-4 py-3 cursor-pointer rounded-lg ${theme === 'dark' ? 'hover:bg-gray-800' : 'hover:bg-gray-100'} transition-colors`} onClick={() => { navigate('/personal'); onClose(); }}>
            <span className={theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}>Go to Personal</span>
          </div>
        </div>
        <div className={`p-3 text-xs flex justify-between border-t ${theme === 'dark' ? 'border-gray-800 text-gray-500' : 'border-gray-200 text-gray-400'}`}>
          <span>↑↓ navigate</span>
          <span>↵ open</span>
          <span>esc close</span>
        </div>
      </div>
      <div className="absolute inset-0 -z-10" onClick={onClose}></div>
    </div>
  );
}