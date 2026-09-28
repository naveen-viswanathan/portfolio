import {
  Globe,
  FileCode2,
  TestTube2,
  Wrench,
  ShieldCheck,
  Database,
} from "lucide-react";
import React from "react";

export default function Stack({ theme }: { theme: string }) {
  const isDark = theme === "dark";
  const STACK_DATA = {
    Frontend: {
      icon: <Globe className="w-4 h-4" />,
      items: [
        "React 19",
        "AngularJS 1.8",
        "React Router 5",
        "Redux",
        "Redux Toolkit",
        "React Query",
        "UI-Router",
        "MUI",
        "Emotion",
        "Storybook",
        "UI-Grid",
      ],
    },
    Languages: {
      icon: <FileCode2 className="w-4 h-4" />,
      items: ["JavaScript", "TypeScript", "HTML", "CSS", "SCSS"],
    },
    Testing: {
      icon: <TestTube2 className="w-4 h-4" />,
      items: [
        "Jest",
        "Testing Library",
        "Cypress",
        "Cucumber",
        "Mocha",
        "Chai",
        "Sinon",
        "JSDOM",
        "Storybook",
      ],
    },
    "Build & Tooling": {
      icon: <Wrench className="w-4 h-4" />,
      items: [
        "Webpack",
        "Webpack 5",
        "Babel",
        "Yarn Workspaces",
        "Lerna",
        "Git",
      ],
    },
    Quality: {
      icon: <ShieldCheck className="w-4 h-4" />,
      items: ["ESLint", "Prettier", "Stylelint", "Husky", "lint-staged"],
    },
    "Libraries & Utilities": {
      icon: <Database className="w-4 h-4" />,
      items: [
        "Axios",
        "Formik",
        "Yup",
        "Lodash",
        "Moment",
        "Ramda",
        "D3",
        "Polished",
        "i18next",
        "react-i18next",
        "JWT",
      ],
    },
  };

  return (
    <div className="animate-fade-in py-10 max-w-5xl">
      <h2 className="text-2xl font-mono mb-10 pb-2 border-b border-current opacity-80 uppercase tracking-widest ${theme === 'dark' ? 'text-[#00F700]' : 'text-[#cb3131]'}`">
        / Tech Stack Directory
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {Object.entries(STACK_DATA).map(([category, data], idx) => (
          <div
            key={idx}
            className={`p-6 rounded border border-current border-opacity-10 transition-colors ${isDark ? "bg-white/[0.02] hover:bg-white/[0.04]" : "bg-black/[0.02] hover:bg-black/[0.04]"}`}
          >
            <div className="flex items-center gap-3 mb-6 opacity-70">
              {data.icon}
              <h3 className="font-mono font-bold tracking-wider uppercase text-sm">
                {category}
              </h3>
            </div>
            <div className="space-y-2 font-mono text-sm flex flex-col">
              {data.items.map((item, i) => {
                const isLast = i === data.items.length - 1;
                return (
                  <div
                    key={i}
                    className="flex items-center group cursor-default"
                  >
                    <span className="opacity-30 mr-3 select-none">
                      {isLast ? "└──" : "├──"}
                    </span>
                    <span className="opacity-80 group-hover:opacity-100 group-hover:translate-x-1 transition-all">
                      {item}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
