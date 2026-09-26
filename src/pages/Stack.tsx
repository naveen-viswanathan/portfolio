import React from 'react';

export default function Stack({ theme }: { theme: string }) {
  const stackData = {
    "Frontend": ["React 19", "TypeScript", "JavaScript", "HTML/CSS", "MUI", "Emotion"],
    "Architecture": ["React Query", "Redux Toolkit", "Formik", "REST APIs", "Component Systems"],
    "Tooling & Build": ["Webpack 5", "Yarn Workspaces", "Lerna", "Babel", "Git", "CI/CD"],
    "Quality & Testing": ["Jest", "Testing Library", "Cypress", "Cucumber", "Storybook", "ESLint", "Husky"]
  };

  return (
    <div className="max-w-4xl pt-10 pb-20">
      <h1 className="text-4xl font-bold mb-4">Engineering Stack</h1>
      <p className={`text-xl mb-12 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Structured view of the tools and systems I use.</p>

      <div className={`font-mono text-sm md:text-base p-8 rounded-xl border shadow-sm overflow-x-auto ${theme === 'dark' ? 'bg-[#0a0a0a] border-gray-800' : 'bg-white border-gray-200'}`}>
        <div className={`mb-6 font-bold text-lg ${theme === 'dark' ? 'text-[#00F700]' : 'text-green-600'}`}>SYSTEM_STACK</div>
        
        {Object.entries(stackData).map(([category, items], catIdx, catArr) => (
          <div key={category} className="mb-2">
            <div className={`flex items-center ${theme === 'dark' ? 'text-gray-200' : 'text-gray-800'}`}>
              <span className={`mr-3 ${theme === 'dark' ? 'text-gray-600' : 'text-gray-400'}`}>{catIdx === catArr.length - 1 ? '└──' : '├──'}</span>
              <span className="font-bold">{category}</span>
            </div>
            <div className="ml-1">
              <div className={`ml-[11px] border-l-2 ${catIdx === catArr.length - 1 ? 'border-transparent' : (theme === 'dark' ? 'border-gray-800' : 'border-gray-200')} pl-6 py-2`}>
                {items.map((item, itemIdx, itemArr) => (
                  <div key={item} className={`flex items-center py-1.5 ${theme === 'dark' ? 'text-gray-400 hover:text-gray-200' : 'text-gray-600 hover:text-gray-900'} transition-colors`}>
                    <span className={`mr-3 ${theme === 'dark' ? 'text-gray-700' : 'text-gray-300'}`}>{itemIdx === itemArr.length - 1 ? '└──' : '├──'}</span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}