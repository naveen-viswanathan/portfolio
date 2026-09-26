import React, { useState, useEffect } from 'react';
import { DATA } from '../data/portfolioData';

export default function Home({ theme }: { theme: string }) {
  const [statusIndex, setStatusIndex] = useState(0);
  const [glitchState, setGlitchState] = useState<'normal' | 'green' | 'red'>('normal');

  useEffect(() => {
    const cycleTime = 1200;
    const interval = setInterval(() => {
      setStatusIndex((prev) => (prev + 1) % DATA.profile.status.length);
    }, cycleTime);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (DATA.profile.status[statusIndex] === "Probably debugging something") {
      setGlitchState('normal');
      const t1 = setTimeout(() => setGlitchState('green'), 300);
      const t2 = setTimeout(() => setGlitchState('normal'), 500);
      const t3 = setTimeout(() => setGlitchState('red'), 800);
      const t4 = setTimeout(() => setGlitchState('normal'), 1000);
      return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); };
    }
  }, [statusIndex]);

  const currentStatus = DATA.profile.status[statusIndex];

  return (
    <div className="max-w-4xl pt-10">
      <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-4">{DATA.profile.name}</h1>
      <h2 className={`text-2xl md:text-3xl font-light mb-16 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>{DATA.profile.title}</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <section>
          <h3 className={`text-sm font-bold tracking-widest mb-6 uppercase ${theme === 'dark' ? 'text-gray-600' : 'text-gray-400'}`}>Status</h3>
          <div className="flex items-center gap-4">
            <div className="relative w-4 h-4 flex items-center justify-center">
              {currentStatus === "Probably debugging something" ? (
                <>
                  {glitchState === 'normal' && <div className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>}
                  {glitchState === 'green' && <div className="w-4 h-4 bg-[#00F700] rounded-full"></div>}
                  {glitchState === 'red' && <div className="w-4 h-4 bg-red-500 rounded-full"></div>}
                </>
              ) : (
                <div className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
              )}
            </div>
            <span className={`text-xl font-medium ${theme === 'dark' ? 'text-gray-200' : 'text-gray-800'}`}>{currentStatus}</span>
          </div>
        </section>

        <section>
          <h3 className={`text-sm font-bold tracking-widest mb-6 uppercase ${theme === 'dark' ? 'text-gray-600' : 'text-gray-400'}`}>Location</h3>
          <p className={`text-xl font-medium ${theme === 'dark' ? 'text-gray-200' : 'text-gray-800'}`}>{DATA.profile.location}</p>
        </section>
        
        <section className="md:col-span-2 mt-4">
          <h3 className={`text-sm font-bold tracking-widest mb-6 uppercase ${theme === 'dark' ? 'text-gray-600' : 'text-gray-400'}`}>Currently</h3>
          <div className="flex flex-wrap gap-4">
             {["React", "TypeScript", "AI-assisted development"].map(item => (
                <div key={item} className={`px-5 py-2 rounded-lg font-mono text-sm border shadow-sm ${theme === 'dark' ? 'bg-[#1a1a1a] border-gray-800 text-[#00F700]' : 'bg-white border-gray-200 text-green-600'}`}>
                  {item}
                </div>
             ))}
          </div>
        </section>
      </div>
    </div>
  );
}