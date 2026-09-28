import { Code } from "lucide-react";
import React from "react";
import { getTheme } from "../theme/theme";

export default function Personal({ theme = "dark" }: { theme?: string }) {
  const themeColors = getTheme(theme);

  return (
    <div className="animate-fade-in py-20 h-full flex flex-col items-center justify-center text-center max-w-md mx-auto">
      <Code className="w-12 h-12 mb-6 opacity-20" />
      <h2
        className="text-2xl font-mono mb-4 uppercase tracking-widest opacity-80"
        style={{ color: themeColors.accent }}
      >
        / Personal
      </h2>
      <p className="font-mono opacity-50">Information coming soon.</p>
    </div>
  );
}
