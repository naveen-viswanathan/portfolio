import React from 'react';

export default function Personal({ theme }: { theme: string }) {
  return (
    <div className="max-w-4xl pt-10">
      <h1 className="text-4xl font-bold mb-6">Personal</h1>
      <div className={`p-8 rounded-xl border border-dashed ${theme === 'dark' ? 'bg-[#1a1a1a] border-gray-700 text-gray-400' : 'bg-white border-gray-300 text-gray-500'}`}>
        <p className="text-lg">Personal information placeholder. More details will be shared later.</p>
      </div>
    </div>
  );
}