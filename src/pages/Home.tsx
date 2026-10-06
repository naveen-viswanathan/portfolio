import React, { useState, useEffect } from "react";
import { DATA } from "../data/portfolioData";
import { getTheme } from "../theme/theme";

export default function Home({ theme }: { theme: string }) {
  const [isBooting, setIsBooting] = useState(true);
  const [bootProgress, setBootProgress] = useState(0);

  const [statusIndex, setStatusIndex] = useState(0);
  const [glitchState, setGlitchState] = useState<"normal" | "green" | "red">(
    "normal",
  );

  useEffect(() => {
    const bootInterval = setInterval(() => {
      setBootProgress((prev) => {
        const next = prev + Math.floor(Math.random() * 15) + 5;
        if (next >= 100) {
          clearInterval(bootInterval);
          setTimeout(() => setIsBooting(false), 500);
          return 100;
        }
        return next;
      });
    }, 150);

    return () => clearInterval(bootInterval);
  }, []);

  useEffect(() => {
    if (isBooting) return;

    const cycleTime = 3000;
    const interval = setInterval(() => {
      setStatusIndex((prev) => (prev + 1) % DATA.profile.status.length);
    }, cycleTime);

    return () => clearInterval(interval);
  }, [isBooting]);

  useEffect(() => {
    if (DATA.profile.status[statusIndex] === "Probably debugging something") {
      setGlitchState("normal");
      const t1 = setTimeout(() => setGlitchState("green"), 300);
      const t2 = setTimeout(() => setGlitchState("normal"), 500);
      const t3 = setTimeout(() => setGlitchState("red"), 800);
      const t4 = setTimeout(() => setGlitchState("normal"), 1000);
      return () => {
        clearTimeout(t1);
        clearTimeout(t2);
        clearTimeout(t3);
        clearTimeout(t4);
      };
    }
  }, [statusIndex]);

  const currentStatus = DATA.profile.status[statusIndex];
  const themeColors = getTheme(theme);

  if (isBooting) {
    return (
      <div className="w-full h-[60vh] flex flex-col items-center justify-center pointer-events-none">
        <div className="flex flex-col items-center gap-6 w-full max-w-xs">
          <div className="flex justify-between w-full items-end font-mono">
            <span
              className={`text-xs tracking-widest uppercase animate-pulse ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}
            >
              Initializing System
            </span>
            <span
              className="text-sm font-bold"
              style={{ color: themeColors.accent }}
            >
              {bootProgress}%
            </span>
          </div>
          <div
            className={`w-full h-1 rounded-full overflow-hidden ${theme === "dark" ? "bg-gray-800" : "bg-gray-200"}`}
          >
            <div
              className="h-full transition-all duration-150 ease-out"
              style={{
                width: `${bootProgress}%`,
                backgroundColor: themeColors.accent,
                boxShadow: `0 0 10px ${themeColors.accent}`,
              }}
            ></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`w-full max-w-6xl mx-auto flex flex-col md:flex-row items-center text-center md:text-left px-6 py-4 sm:p-10 md:p-20 gap-0 sm:gap-12 md:gap-20 rounded-[2.5rem] md:rounded-[3rem] border transition-colors duration-300 ${
        theme === "dark"
          ? "bg-[#181818] border-gray-800"
          : "bg-white border-gray-200"
      }`}
      style={{
        // Increased spread radius to 20px and blur to 200px for a massive aura
        boxShadow: `0 0 200px 20px ${themeColors.accent}`,
        animation: "fadeIn 0.5s ease-out",
      }}
    >
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      {/* Profile Image */}
      <div className="w-40 h-40 sm:w-48 sm:h-48 md:w-80 md:h-80 shrink-0">
        <img
          src={`${process.env.PUBLIC_URL}/avatar.jpg`}
          alt="Profile"
          className="w-full h-full object-cover rounded-full transition-all duration-300"
          style={{
            filter: `drop-shadow(0 0 5px ${themeColors.accent})`,
          }}
        />
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 w-full justify-center">
        {/* Name & Title */}
        <h1 className="text-4xl sm:text-5xl lg:text-7xl xl:text-8xl font-bold tracking-tight mb-4 break-words">
          {DATA.profile.name}
        </h1>
        <h2
          className={`text-xl sm:text-2xl md:text-4xl font-light mb-6 ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}
        >
          {DATA.profile.title}
        </h2>

        {/* Compact Highlights */}
        <div className="flex flex-wrap justify-center md:justify-start gap-3 mb-10 md:mb-14">
          {["React", "TypeScript", "AI-assisted development"].map((item) => (
            <div
              key={item}
              className={`px-3 py-1.5 md:px-4 md:py-2 rounded-lg font-mono text-xs sm:text-sm md:text-base border transition-colors ${
                theme === "dark"
                  ? "bg-[#111] border-gray-800"
                  : "bg-gray-50 border-gray-200"
              }`}
              style={{ color: themeColors.accent }}
            >
              {item}
            </div>
          ))}
        </div>

        {/* Info Stack: Location & Status */}
        <div className="flex flex-col sm:flex-row items-center md:items-start gap-6 sm:gap-10 lg:gap-20 w-full mb-10 md:mb-14">
          <section className="flex flex-col items-center md:items-start shrink-0 min-h-[4rem] md:min-h-[6rem] justify-start">
            <div className="flex items-center justify-center md:justify-start gap-2 mb-3">
              <svg
                width="18"
                height="18"
                className="md:w-5 md:h-5 shrink-0"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ color: themeColors.accent }}
              >
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
              <h3
                className={`text-sm md:text-base font-bold tracking-widest uppercase ${theme === "dark" ? "text-gray-500" : "text-gray-400"}`}
              >
                Location
              </h3>
            </div>
            <p
              className={`text-lg sm:text-xl md:text-3xl font-medium leading-tight ${theme === "dark" ? "text-gray-200" : "text-gray-800"}`}
            >
              {DATA.profile.location}
            </p>
          </section>

          <section className="flex flex-col items-center md:items-start">
            <div className="flex items-center justify-center md:justify-start gap-2 mb-3">
              <div className="relative w-4 h-4 md:w-5 md:h-5 flex items-center justify-center shrink-0">
                {currentStatus === "Probably debugging something" ? (
                  <>
                    {glitchState === "normal" && (
                      <div className="w-4 h-4 md:w-5 md:h-5 border-[2px] md:border-[3px] border-gray-400 border-t-transparent rounded-full animate-spin"></div>
                    )}
                    {glitchState === "green" && (
                      <div
                        className="w-4 h-4 md:w-5 md:h-5 rounded-full"
                        style={{ backgroundColor: themeColors.accent }}
                      ></div>
                    )}
                    {glitchState === "red" && (
                      <div className="w-4 h-4 md:w-5 md:h-5 bg-red-500 rounded-full"></div>
                    )}
                  </>
                ) : (
                  <div className="w-4 h-4 md:w-5 md:h-5 border-[2px] md:border-[3px] border-gray-400 border-t-transparent rounded-full animate-spin"></div>
                )}
              </div>
              <h3
                className={`text-sm md:text-base font-bold tracking-widest uppercase ${theme === "dark" ? "text-gray-500" : "text-gray-400"}`}
              >
                Status
              </h3>
            </div>
            <div className="w-[15rem] sm:w-[17rem] md:w-[28rem] text-center md:text-left overflow-visible min-h-[2rem] md:min-h-[3rem]">
              <span
                className={`whitespace-nowrap text-base sm:text-lg md:text-3xl font-medium leading-tight block ${theme === "dark" ? "text-gray-200" : "text-gray-800"}`}
              >
                {currentStatus}
              </span>
            </div>
          </section>
        </div>

        {/* Social / Contact Icons */}
        <div className="flex items-center justify-center md:justify-start gap-4 md:gap-5">
          <a
            href="#"
            className={`p-3 md:p-4 rounded-xl md:rounded-2xl border transition-all duration-300 ${theme === "dark" ? "bg-[#111] border-gray-800 hover:border-gray-600" : "bg-gray-50 border-gray-200 hover:border-gray-300"}`}
          >
            <svg
              width="22"
              height="22"
              className="md:w-6 md:h-6"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ color: themeColors.accent }}
            >
              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
              <rect x="2" y="9" width="4" height="12"></rect>
              <circle cx="4" cy="4" r="2"></circle>
            </svg>
          </a>
          <a
            href="#"
            className={`p-3 md:p-4 rounded-xl md:rounded-2xl border transition-all duration-300 ${theme === "dark" ? "bg-[#111] border-gray-800 hover:border-gray-600" : "bg-gray-50 border-gray-200 hover:border-gray-300"}`}
          >
            <svg
              width="22"
              height="22"
              className="md:w-6 md:h-6"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ color: themeColors.accent }}
            >
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
              <polyline points="22,6 12,13 2,6"></polyline>
            </svg>
          </a>
          <a
            href="#"
            className={`p-3 md:p-4 rounded-xl md:rounded-2xl border transition-all duration-300 ${theme === "dark" ? "bg-[#111] border-gray-800 hover:border-gray-600" : "bg-gray-50 border-gray-200 hover:border-gray-300"}`}
          >
            <svg
              width="22"
              height="22"
              className="md:w-6 md:h-6"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ color: themeColors.accent }}
            >
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}
