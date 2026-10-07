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

  // Move this above the isBooting check so both returns can use it
  const cardBg =
    theme === "dark"
      ? "bg-[#181818] border-gray-800"
      : "bg-white border-gray-200";

  if (isBooting) {
    return (
      <div className="w-full h-[60vh] flex flex-col items-center justify-center">
        <style>{`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}</style>

        {/* The New Bento Boot Box */}
        <div
          className={`flex flex-col justify-center gap-6 w-full max-w-md p-10 md:p-14 rounded-[2.5rem] md:rounded-[3rem] border transition-all duration-300 ${cardBg}`}
          style={{
            boxShadow: `0 0 60px 10px ${themeColors.accent}20`,
            animation: "fadeIn 0.5s ease-out",
          }}
        >
          <div className="flex justify-between w-full items-end font-mono">
            <span
              className={`text-xs md:text-sm tracking-widest uppercase animate-pulse ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}
            >
              Initializing System
            </span>
            <span
              className="text-sm md:text-base font-bold"
              style={{ color: themeColors.accent }}
            >
              {bootProgress}%
            </span>
          </div>

          <div
            className={`w-full h-1.5 rounded-full overflow-hidden border ${theme === "dark" ? "bg-[#111] border-gray-800" : "bg-gray-100 border-gray-200"}`}
          >
            <div
              className="h-full transition-all duration-150 ease-out"
              style={{
                width: `${bootProgress}%`,
                backgroundColor: themeColors.accent,
                boxShadow: `0 0 15px ${themeColors.accent}`,
              }}
            ></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="w-full max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6 px-4 md:px-0 pb-10 md:pb-20"
      style={{ animation: "fadeIn 0.5s ease-out" }}
    >
      {/* 
        Using !important to ensure Tailwind border colors are overridden on hover.
        Added translateY to give a nice lift effect.
      */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .bento-card {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
        }
        .bento-card:hover {
          box-shadow: 0 0 40px 8px ${themeColors.accent}40 !important; 
          border-color: ${themeColors.accent}A0 !important;
          transform: translateY(-5px) !important;
        }
      `}</style>

      {/* 1. Main Identity Tile (Spans 8 columns) */}
      <div
        className={`bento-card md:col-span-8 p-8 sm:p-10 md:p-14 flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-8 rounded-[2.5rem] md:rounded-[3rem] border ${cardBg}`}
      >
        <div className="w-32 h-32 sm:w-40 sm:h-40 shrink-0">
          <img
            src={`${process.env.PUBLIC_URL}/avatar.jpg`}
            alt="Profile"
            className="w-full h-full object-cover rounded-full transition-all duration-300"
            style={{ filter: `drop-shadow(0 0 20px ${themeColors.accent}80)` }}
          />
        </div>
        <div className="flex flex-col justify-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-4 break-words">
            {DATA.profile.name}
          </h1>
          <h2
            className={`text-xl md:text-2xl font-light ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}
          >
            {DATA.profile.title}
          </h2>
        </div>
      </div>

      {/* 2. Status Tile (Spans 4 columns) */}
      <div
        className={`bento-card md:col-span-4 p-8 sm:p-10 flex flex-col justify-center items-center md:items-start text-center md:text-left rounded-[2.5rem] md:rounded-[3rem] border ${cardBg}`}
      >
        <div className="flex items-center gap-3 mb-4 md:mb-6">
          <div className="relative w-5 h-5 flex items-center justify-center shrink-0">
            {currentStatus === "Probably debugging something" ? (
              <>
                {glitchState === "normal" && (
                  <div className="w-5 h-5 border-[3px] border-gray-400 border-t-transparent rounded-full animate-spin"></div>
                )}
                {glitchState === "green" && (
                  <div
                    className="w-5 h-5 rounded-full"
                    style={{ backgroundColor: themeColors.accent }}
                  ></div>
                )}
                {glitchState === "red" && (
                  <div className="w-5 h-5 bg-red-500 rounded-full"></div>
                )}
              </>
            ) : (
              <div className="w-5 h-5 border-[3px] border-gray-400 border-t-transparent rounded-full animate-spin"></div>
            )}
          </div>
          <h3
            className={`text-sm font-bold tracking-widest uppercase ${theme === "dark" ? "text-gray-500" : "text-gray-400"}`}
          >
            Status
          </h3>
        </div>

        {/* Added fixed min-height and whitespace-nowrap to prevent layout jumping */}
        <div className="w-full flex items-center justify-center md:justify-start min-h-[3.5rem] md:min-h-[4.5rem]">
          <span
            className={`whitespace-nowrap text-lg sm:text-xl md:text-2xl lg:text-3xl font-medium leading-tight ${theme === "dark" ? "text-gray-200" : "text-gray-800"}`}
          >
            {currentStatus}
          </span>
        </div>
      </div>

      {/* 3. Tech Focus Tile (Spans 6 columns) */}
      <div
        className={`bento-card md:col-span-6 p-8 sm:p-10 flex flex-col justify-center items-center md:items-start rounded-[2.5rem] md:rounded-[3rem] border ${cardBg}`}
      >
        <h3
          className={`text-sm font-bold tracking-widest uppercase mb-6 ${theme === "dark" ? "text-gray-500" : "text-gray-400"}`}
        >
          Core Focus
        </h3>
        <div className="flex flex-wrap justify-center md:justify-start gap-3">
          {["React", "TypeScript", "AI-assisted development"].map((item) => (
            <div
              key={item}
              className={`px-4 py-2 rounded-xl font-mono text-sm border transition-colors ${
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
      </div>

      {/* 4. Location Tile (Spans 3 columns) */}
      <div
        className={`bento-card md:col-span-3 p-8 sm:p-10 flex flex-col items-center justify-center text-center rounded-[2.5rem] md:rounded-[3rem] border ${cardBg}`}
      >
        <svg
          width="32"
          height="32"
          className="mb-4"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ color: themeColors.accent }}
        >
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
          <circle cx="12" cy="10" r="3"></circle>
        </svg>
        <h3
          className={`text-xs font-bold tracking-widest uppercase mb-2 ${theme === "dark" ? "text-gray-500" : "text-gray-400"}`}
        >
          Base
        </h3>
        <p
          className={`text-lg font-medium ${theme === "dark" ? "text-gray-200" : "text-gray-800"}`}
        >
          {DATA.profile.location}
        </p>
      </div>

      {/* 5. Social Grid Tile (Spans 3 columns) */}
      <div
        className={`bento-card md:col-span-3 p-6 sm:p-8 grid grid-cols-2 gap-4 rounded-[2.5rem] md:rounded-[3rem] border ${cardBg}`}
      >
        {[
          {
            name: "LinkedIn",
            url: "https://www.linkedin.com/in/naveenviswanathan",
            path: "M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z M2 9h4v12H2z M4 4a2 2 0 1 0 0 4 2 2 0 0 0 0-4z",
          },
          {
            name: "GitHub",
            url: "https://github.com/naveen-viswanathan",
            path: "M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22",
          },
          {
            name: "Mail",
            url: "mailto:naveen.g4e@gmail.com",
            path: "M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z M22 6l-10 7L2 6",
          },
          {
            name: "Instagram",
            url: "https://www.instagram.com/bcosimbatman",
            path: "M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z M17.5 6.5h.01 M2 2h20v20H2z",
          },
        ].map((icon, i) => (
          <a
            key={i}
            href={icon.url}
            target="_blank"
            rel="noopener noreferrer"
            title={icon.name}
            className={`flex items-center justify-center p-3 md:p-4 rounded-2xl border transition-all duration-300 ${
              theme === "dark"
                ? "bg-[#111] border-gray-800 hover:border-gray-600 hover:bg-[#1a1a1a]"
                : "bg-gray-50 border-gray-200 hover:border-gray-300 hover:bg-white"
            }`}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ color: themeColors.accent }}
            >
              <path d={icon.path}></path>
            </svg>
          </a>
        ))}
      </div>
    </div>
  );
}
