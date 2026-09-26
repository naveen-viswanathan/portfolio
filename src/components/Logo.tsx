import React from 'react';

export default function Logo() {
  return (
    <div className="w-10 h-10 flex items-center justify-center">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" width="100%" height="100%">
        <defs>
          <linearGradient id="nvGradientSidebar" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00F700" />
            <stop offset="100%" stopColor="#008f00" />
          </linearGradient>
          <filter id="sidebarGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
          <style>
            {`
              @keyframes terminalBlinkSidebar {
                0%, 100% { opacity: 1; }
                50% { opacity: 0; }
              }
              .sidebar-cursor {
                animation: terminalBlinkSidebar 1s infinite;
              }
            `}
          </style>
        </defs>

        <rect x="10" y="10" width="100" height="100" rx="16" fill="#121212" stroke="#2a2a2a" strokeWidth="2" />

        <g filter="url(#sidebarGlow)">
          <path d="M 28 36 L 28 84" fill="none" stroke="#ffffff" strokeWidth="6" strokeLinecap="round" />
          <path d="M 28 36 L 52 84" fill="none" stroke="url(#nvGradientSidebar)" strokeWidth="6" strokeLinecap="round" />
          <path d="M 52 84 L 52 36" fill="none" stroke="#ffffff" strokeWidth="6" strokeLinecap="round" />
          <path d="M 52 84 L 76 36" fill="none" stroke="url(#nvGradientSidebar)" strokeWidth="6" strokeLinecap="round" />
        </g>
        
        <rect x="80" y="74" width="7" height="10" fill="#00F700" filter="url(#sidebarGlow)" className="sidebar-cursor" />
      </svg>
    </div>
  );
}