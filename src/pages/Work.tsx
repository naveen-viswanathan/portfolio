import React, { useState } from "react";
import { DATA } from "../data/portfolioData";
import { getTheme } from "../theme/theme";

export default function Work({ theme }: { theme: string }) {
  const [activeExp, setActiveExp] = useState(DATA.experience[0]);
  const themeColors = getTheme(theme);

  return (
    <div className="flex flex-col lg:flex-row gap-12 w-full">
      <div
        className={`w-full lg:w-1/3 flex flex-col border-b lg:border-b-0 lg:border-r ${
          theme === "dark" ? "border-gray-800" : "border-gray-300"
        } pr-6 pb-6 lg:pb-0 shrink-0`}
      >
        <h2 className="text-3xl font-bold mb-10">Career Timeline</h2>
        <div className="space-y-4 relative">
          <div
            className={`absolute left-[15px] top-4 bottom-4 w-0.5 ${
              theme === "dark" ? "bg-gray-800" : "bg-gray-300"
            } -z-10`}
          ></div>
          {DATA.experience.map((exp) => {
            const isActive = activeExp.id === exp.id;
            return (
              <button
                key={exp.id}
                onClick={() => setActiveExp(exp)}
                className={`w-full text-left p-4 rounded-xl flex gap-5 items-start transition-all ${
                  isActive
                    ? theme === "dark"
                      ? "bg-[#1a1a1a] shadow-md border border-gray-800"
                      : "bg-white shadow-md border border-gray-200"
                    : theme === "dark"
                      ? "hover:bg-[#151515] border border-transparent"
                      : "hover:bg-gray-50 border border-transparent"
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex-shrink-0 mt-1 flex items-center justify-center ${
                    isActive ? "" : "bg-gray-500"
                  }`}
                  style={{
                    backgroundColor: isActive ? themeColors.accent : undefined,
                    boxShadow: isActive
                      ? `0 0 10px ${themeColors.glow.timeline}`
                      : undefined,
                  }}
                >
                  <div
                    className={`w-3 h-3 rounded-full ${
                      theme === "dark" ? "bg-dark" : "bg-[#F2F2F2]"
                    }`}
                  ></div>
                </div>
                <div>
                  <div
                    className={`text-sm font-bold tracking-wider mb-1 ${
                      isActive
                        ? theme === "dark"
                          ? "text-white"
                          : "text-black"
                        : "text-gray-500"
                    }`}
                  >
                    {exp.period.split("-")[0].trim()}
                  </div>
                  <div
                    className={`font-medium ${
                      isActive
                        ? theme === "dark"
                          ? "text-white"
                          : "text-black"
                        : theme === "dark"
                          ? "text-gray-400"
                          : "text-gray-600"
                    }`}
                  >
                    {exp.company}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <div className="flex-1">
        <div className="flex items-center gap-6 mb-8">
          <div className="w-20 h-20 bg-white rounded-xl flex items-center justify-center p-3 shadow-md border border-gray-200 shrink-0">
            <img
              src={activeExp.logo}
              alt={`${activeExp.company} logo`}
              className="max-w-full max-h-full object-contain"
            />
          </div>
          {activeExp.clientLogo && (
            <div className="w-20 h-20 bg-white rounded-xl flex items-center justify-center p-3 shadow-md border border-gray-200 shrink-0">
              <img
                src={activeExp.clientLogo}
                alt={`${activeExp.client} logo`}
                className="max-w-full max-h-full object-contain"
              />
            </div>
          )}
          <div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2">
              {activeExp.role}
            </h1>
            <h2
              className={`text-xl ${
                theme === "dark" ? "text-gray-400" : "text-gray-600"
              }`}
            >
              {activeExp.company}{" "}
              {activeExp.client ? `(Client: ${activeExp.client})` : ""}
            </h2>
            <div
              className="text-sm font-medium tracking-wide mt-2"
              style={{ color: themeColors.accent }}
            >
              {activeExp.period}
            </div>
          </div>
        </div>

        <div
          className={`p-6 rounded-xl mb-10 text-lg leading-relaxed border ${
            theme === "dark"
              ? "bg-[#1a1a1a] border-gray-800 text-gray-300"
              : "bg-white border-gray-200 text-gray-700"
          }`}
        >
          {activeExp.description}
        </div>

        <h3
          className={`text-sm font-bold tracking-widest mb-6 uppercase ${
            theme === "dark" ? "text-gray-600" : "text-gray-400"
          }`}
        >
          Key Contributions
        </h3>
        <ul
          className={`space-y-4 mb-12 list-disc pl-5 ${
            theme === "dark" ? "text-gray-300" : "text-gray-700"
          }`}
        >
          {activeExp.bullets.map((bullet, idx) => (
            <li key={idx} className="pl-2 leading-relaxed">
              {bullet}
            </li>
          ))}
        </ul>

        <div>
          <h3
            className={`text-sm font-bold tracking-widest mb-6 uppercase ${
              theme === "dark" ? "text-gray-600" : "text-gray-400"
            }`}
          >
            Technologies Used
          </h3>
          <div className="flex flex-wrap gap-3">
            {activeExp.tech.map((t, idx) => (
              <span
                key={idx}
                className={`px-4 py-2 font-mono text-sm rounded-lg border shadow-sm ${
                  theme === "dark"
                    ? "bg-[#151515] border-gray-700 text-gray-200"
                    : "bg-gray-50 border-gray-200 text-gray-800"
                }`}
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
