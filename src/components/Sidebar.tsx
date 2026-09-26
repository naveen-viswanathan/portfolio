import React from 'react';
import { NavLink } from 'react-router-dom';
import { User, Briefcase, Layers, Heart, Moon, Sun, Search } from 'lucide-react';
import Logo from './Logo';

interface SidebarProps {
  theme: string;
  setTheme: (theme: string) => void;
  onOpenSearch: () => void;
}

export default function Sidebar({ theme, setTheme, onOpenSearch }: SidebarProps) {
  const navItems = [
    { path: '/', icon: User, label: '/home' },
    { path: '/work', icon: Briefcase, label: '/work' },
    { path: '/stack', icon: Layers, label: '/stack' },
    { path: '/personal', icon: Heart, label: '/personal' }
  ];

  return (
    <aside className={`w-full md:w-64 h-auto md:h-full flex flex-col justify-between p-6 border-b md:border-b-0 md:border-r ${theme === 'dark' ? 'border-gray-800 bg-[#0a0a0a]' : 'border-gray-300 bg-white'} z-30 shrink-0`}>
      <div>
        <div className="mb-10 flex items-center gap-4">
          <Logo />
          <div>
            <div className={`text-xs font-bold tracking-widest uppercase ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}`}>Workspace</div>
            <div className={`font-mono font-bold ${theme === 'dark' ? 'text-white' : 'text-black'}`}>naveen.dev</div>
          </div>
        </div>
        
        <div className="flex flex-col gap-2">
          {navItems.map((item) => (
            <NavLink 
              key={item.path} 
              to={item.path}
              className={({ isActive }) => `flex items-center gap-4 px-4 py-3 rounded-md transition-colors ${isActive ? (theme === 'dark' ? 'bg-[#1a1a1a] text-[#00F700]' : 'bg-gray-100 text-[#00F700]') : (theme === 'dark' ? 'text-gray-400 hover:text-gray-200 hover:bg-[#111]' : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50')}`}
            >
              {({ isActive }) => (
                <>
                  <item.icon className={isActive ? 'glow-icon' : ''} size={20} color={isActive ? '#00F700' : 'currentColor'} />
                  <span className={`font-mono text-sm ${isActive ? 'font-bold' : 'font-medium'}`}>{item.label}</span>
                </>
              )}
            </NavLink>
          ))}
        </div>
      </div>

      <div className="mt-8 flex flex-col gap-3">
        <button 
          onClick={onOpenSearch}
          className={`flex items-center justify-between px-4 py-3 rounded-md border transition-colors ${theme === 'dark' ? 'bg-[#1a1a1a] border-gray-700 hover:bg-[#222] text-gray-300' : 'bg-gray-50 border-gray-200 hover:bg-gray-100 text-gray-700'}`}
          style={{ cursor: 'none' }}
        >
          <div className="flex items-center gap-3">
            <Search size={18} />
            <span className="text-sm font-medium">Search</span>
          </div>
          <kbd className={`text-xs font-mono px-2 py-1 rounded ${theme === 'dark' ? 'bg-gray-800 text-gray-400' : 'bg-gray-200 text-gray-600'}`}>⌘K</kbd>
        </button>

        <button 
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          className={`flex items-center gap-4 px-4 py-3 rounded-md transition-colors ${theme === 'dark' ? 'text-gray-400 hover:text-gray-200 hover:bg-[#111]' : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'}`}
        >
          {theme === 'dark' ? <><Sun size={20} /><span className="text-sm font-medium">Light Mode</span></> : <><Moon size={20} /><span className="text-sm font-medium">Dark Mode</span></>}
        </button>
      </div>
    </aside>
  );
}