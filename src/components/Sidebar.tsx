import React, { useState } from "react";
import {
  User,
  Briefcase,
  Layers,
  Heart,
  Moon,
  Sun,
  Search,
  Menu,
  X,
} from "lucide-react";
import Logo from "./Logo";
import { getTheme } from "../theme/theme";

interface SidebarProps {
  theme: string;
  setTheme: (theme: string) => void;
  onOpenSearch: () => void;
  activeSection: string;
}

export default function Sidebar({
  theme,
  setTheme,
  onOpenSearch,
  activeSection,
}: SidebarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const themeColors = getTheme(theme);

  const navItems = [
    { id: "home", icon: User, label: "/home" },
    { id: "work", icon: Briefcase, label: "/work" },
    { id: "stack", icon: Layers, label: "/stack" },
    { id: "personal", icon: Heart, label: "/personal" },
  ];

  const handleScroll = (id: string) => {
    const section = document.getElementById(id);
    const mainContainer = document.querySelector("main");

    if (section && mainContainer) {
      // Exclusively scroll the main container, preventing the browser window from jumping
      mainContainer.scrollTo({
        top: section.offsetTop,
        behavior: "smooth",
      });
    }

    // Close the mobile menu
    setIsMobileMenuOpen(false);
  };

  return (
    <aside
      className={`w-full md:w-64 flex flex-col md:h-full p-5 md:p-6 border-b md:border-b-0 md:border-r ${
        theme === "dark"
          ? "border-gray-800 bg-[#0a0a0a]"
          : "border-gray-300 bg-white"
      } z-40 shrink-0 transition-all duration-300`}
    >
      <div className="flex items-center justify-between md:mb-10">
        <div className="flex items-center gap-4">
          <Logo theme={theme} />
          <div>
            <div
              className={`text-xs font-bold tracking-widest uppercase ${
                theme === "dark" ? "text-gray-500" : "text-gray-400"
              }`}
            >
              Workspace
            </div>
            <div
              className={`font-mono font-bold ${
                theme === "dark" ? "text-white" : "text-black"
              }`}
            >
              naveen.dev
            </div>
          </div>
        </div>
        <button
          className={`md:hidden p-2 rounded-md transition-colors ${
            theme === "dark"
              ? "hover:bg-gray-800 text-gray-300"
              : "hover:bg-gray-100 text-gray-700"
          }`}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <div
        className={`${
          isMobileMenuOpen ? "flex" : "hidden"
        } md:flex flex-col flex-1 justify-between mt-8 md:mt-0`}
      >
        <div className="flex flex-col gap-2">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleScroll(item.id)}
                className={`flex items-center w-full text-left gap-4 px-4 py-3 rounded-md transition-colors ${
                  isActive
                    ? theme === "dark"
                      ? "bg-[#1a1a1a]"
                      : "bg-gray-100"
                    : theme === "dark"
                      ? "text-gray-400 hover:text-gray-200 hover:bg-[#111]"
                      : "text-gray-500 hover:text-gray-900 hover:bg-gray-50"
                }`}
                style={{
                  color: isActive ? themeColors.accent : undefined,
                }}
              >
                <item.icon
                  className={isActive ? "glow-icon" : ""}
                  size={20}
                  color={isActive ? themeColors.accent : "currentColor"}
                />
                <span
                  className={`font-mono text-sm ${
                    isActive ? "font-bold" : "font-medium"
                  }`}
                >
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>

        <div className="mt-8 flex flex-col gap-3">
          <button
            onClick={() => {
              onOpenSearch();
              setIsMobileMenuOpen(false);
            }}
            className={`flex items-center justify-between px-4 py-3 rounded-md border transition-colors ${
              theme === "dark"
                ? "bg-[#1a1a1a] border-gray-700 hover:bg-[#222] text-gray-300"
                : "bg-gray-50 border-gray-200 hover:bg-gray-100 text-gray-700"
            }`}
            style={{ cursor: "none" }}
          >
            <div className="flex items-center gap-3">
              <Search size={18} />
              <span className="text-sm font-medium">Search</span>
            </div>
            <kbd
              className={`text-xs font-mono px-2 py-1 rounded ${
                theme === "dark"
                  ? "bg-gray-800 text-gray-400"
                  : "bg-gray-200 text-gray-600"
              }`}
            >
              ⌘K
            </kbd>
          </button>

          <button
            onClick={() => {
              setTheme(theme === "dark" ? "light" : "dark");
              setIsMobileMenuOpen(false);
            }}
            className={`flex items-center gap-4 px-4 py-3 rounded-md transition-colors ${
              theme === "dark"
                ? "text-gray-400 hover:text-gray-200 hover:bg-[#111]"
                : "text-gray-500 hover:text-gray-900 hover:bg-gray-50"
            }`}
          >
            {theme === "dark" ? (
              <>
                <Sun size={20} />
                <span className="text-sm font-medium">Light Mode</span>
              </>
            ) : (
              <>
                <Moon size={20} />
                <span className="text-sm font-medium">Dark Mode</span>
              </>
            )}
          </button>
        </div>
      </div>
    </aside>
  );
}
