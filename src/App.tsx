import React, { useState, useEffect, useRef } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import CustomCursor from "./components/CustomCursor";
import SearchModal from "./components/SearchModal";
import Home from "./pages/Home";
import Work from "./pages/Work";
import Stack from "./pages/Stack";
import Personal from "./pages/Personal";
import { getTheme } from "./theme/theme";

export default function App() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const mainRef = useRef<HTMLElement>(null);

  const themeColors = getTheme(theme);

  useEffect(() => {
    document.documentElement.className = theme;
    document.documentElement.style.setProperty(
      "--accent-color",
      themeColors.accent,
    );
  }, [theme, themeColors.accent]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { root: mainRef.current, threshold: 0.3 },
    );

    const sections = document.querySelectorAll("section[id]");
    sections.forEach((section) => observer.observe(section));

    return () => sections.forEach((section) => observer.unobserve(section));
  }, []);

  // Reusable sleek divider component using centralized theme colors
  const SectionDivider = () => (
    <div className="w-full max-w-3xl mx-auto flex items-center justify-center py-16 opacity-70 gap-3">
      {/* Left fading line */}
      <div
        className="flex-1 h-[1px]"
        style={{
          background: `linear-gradient(90deg, transparent, ${themeColors.accent})`,
        }}
      ></div>

      {/* Center glowing dot */}
      <div
        className="w-2 h-2 rounded-full shrink-0"
        style={{
          backgroundColor: themeColors.accent,
          boxShadow: `0 0 12px 2px ${themeColors.glow.divider}`,
        }}
      ></div>

      {/* Right fading line */}
      <div
        className="flex-1 h-[1px]"
        style={{
          background: `linear-gradient(270deg, transparent, ${themeColors.accent})`,
        }}
      ></div>
    </div>
  );

  return (
    <Router>
      <div
        className={`flex flex-col md:flex-row h-[100dvh] overflow-hidden transition-colors duration-300 ${
          theme === "dark" ? "bg-[#121212] text-white" : "bg-[#F2F2F2] text-black"
        }`}
      >
        <CustomCursor theme={theme} />

        <Sidebar
          theme={theme}
          setTheme={(t) => setTheme(t as "dark" | "light")}
          onOpenSearch={() => setIsSearchOpen(true)}
          activeSection={activeSection}
        />

        {/* Main scrollable container */}
        <main
          ref={mainRef}
          className="flex-1 h-full overflow-y-auto scroll-smooth relative"
        >
          <div className="max-w-6xl mx-auto px-8 md:px-16">
            <section
              id="home"
              className="min-h-screen pt-2 md:pt-8 pb-16 flex flex-col justify-center"
            >
              <Home theme={theme} />
            </section>

            <SectionDivider />

            <section id="work" className="min-h-screen pt-2 md:pt-8 pb-24">
              <Work theme={theme} />
            </section>

            <SectionDivider />

            <section id="stack" className="min-h-screen pt-2 md:pt-8 pb-24">
              <Stack theme={theme} />
            </section>

            <SectionDivider />

            <section id="personal" className="min-h-screen pt-2 md:pt-8 pb-24">
              <Personal />
            </section>
          </div>
        </main>

        <SearchModal
          isOpen={isSearchOpen}
          onClose={() => setIsSearchOpen(false)}
          theme={theme}
        />
      </div>
    </Router>
  );
}
