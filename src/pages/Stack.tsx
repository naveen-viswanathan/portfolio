import {
  Globe,
  FileCode2,
  TestTube2,
  Wrench,
  ShieldCheck,
  Database,
} from "lucide-react";
import React from "react";
import { getTheme, hexToRgba } from "../theme/theme";

export default function Stack({ theme }: { theme: string }) {
  const isDark = theme === "dark";
  const themeColors = getTheme(theme);

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
    <div className="animate-fade-in max-w-5xl w-full mx-auto">
      <div className="mb-6 md:mb-8 pb-3 border-b border-current opacity-80 flex items-center justify-between">
        <h2
          className="text-2xl font-mono uppercase tracking-widest"
          style={{ color: themeColors.accent }}
        >
          / Tech Stack
        </h2>
        <span className="text-xs font-mono opacity-50 hidden sm:inline-block">
          Core toolchain & technologies
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
        {Object.entries(STACK_DATA).map(([category, data], idx) => (
          <div
            key={idx}
            className={`p-4 sm:p-5 rounded-xl border transition-all duration-300 flex flex-col ${
              isDark
                ? "bg-[#181818]/90 border-gray-800 hover:border-gray-700 hover:shadow-lg"
                : "bg-white border-gray-200 hover:border-gray-300 hover:shadow-md"
            }`}
          >
            <div className="flex items-center gap-2.5 mb-3.5">
              <span
                className="p-1.5 rounded-lg shrink-0 flex items-center justify-center"
                style={{
                  color: themeColors.accent,
                  backgroundColor: hexToRgba(themeColors.accent, 0.12),
                }}
              >
                {data.icon}
              </span>
              <h3
                className={`font-mono font-bold tracking-wider uppercase text-xs sm:text-sm ${
                  isDark ? "text-gray-200" : "text-gray-800"
                }`}
              >
                {category}
              </h3>
              <span className="ml-auto font-mono text-[11px] text-gray-500 font-medium">
                {data.items.length}
              </span>
            </div>

            <div className="flex flex-wrap gap-1.5 sm:gap-2">
              {data.items.map((item, i) => (
                <span
                  key={i}
                  className={`px-2.5 py-1 rounded-md font-mono text-xs border transition-all duration-200 cursor-default ${
                    isDark
                      ? "bg-[#121212] border-gray-800/90 text-gray-300 hover:border-gray-600 hover:text-white"
                      : "bg-gray-50 border-gray-200 text-gray-700 hover:border-gray-400 hover:text-black"
                  }`}
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
