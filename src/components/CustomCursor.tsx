import React, { useEffect, useRef, useState } from "react";

export default function CustomCursor({ theme = "dark" }: { theme?: string }) {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    // Detect mobile / touch devices
    if ("ontouchstart" in window || navigator.maxTouchPoints > 0) {
      setIsTouch(true);
      return;
    }

    // Direct DOM manipulation for zero-lag cursor movement
    const moveCursor = (e: MouseEvent) => {
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }
    };

    window.addEventListener("mousemove", moveCursor);
    return () => window.removeEventListener("mousemove", moveCursor);
  }, []);

  // If the user is on a phone or tablet, don't render the custom cursor at all
  if (isTouch) return null;

  const accentColor = theme === "dark" ? "#00F700" : "#cb3131";
  const shadowColor =
    theme === "dark" ? "rgba(0,247,0,0.5)" : "rgba(203,49,49,0.5)";
  const strokeColor = theme === "dark" ? "#ffffff" : "#000000";

  return (
    <>
      <style>
        {`
          * {
            cursor: none !important;
          }
        `}
      </style>

      <div
        ref={cursorRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
        style={{
          // The tip of the 2x scaled arrow is at 3px/3px in physical space
          marginLeft: "-3px",
          marginTop: "-3px",
          willChange: "transform",
        }}
      >
        <svg
          width="28"
          height="28"
          viewBox="0 0 56 56"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ filter: `drop-shadow(0 0 12px ${shadowColor})` }}
          shapeRendering="geometricPrecision"
        >
          {/* Doubled internal coordinates for absolute crispness on high-DPI screens */}
          <path
            d="M6 6L22 48L29 29L48 22L6 6Z"
            fill={accentColor}
            stroke={strokeColor}
            strokeWidth="3"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </>
  );
}
