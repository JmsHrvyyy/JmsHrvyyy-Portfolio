import React, { useState, useEffect, useRef } from "react";

function MarioRun() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const timeoutRef = useRef(null);

  useEffect(() => {
    const handleScrollTracking = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;

      if (documentHeight === windowHeight) {
        setScrollProgress(100);
        return;
      }

      const totalScrollableDistance = documentHeight - windowHeight;
      const currentPercentage = (scrollTop / totalScrollableDistance) * 100;
      setScrollProgress(currentPercentage);

      // Auto-fade sequence logs
      setIsVisible(true);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        setIsVisible(false);
      }, 2000);
    };

    handleScrollTracking();
    window.addEventListener("scroll", handleScrollTracking);

    return () => {
      window.removeEventListener("scroll", handleScrollTracking);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <div
      className={`fixed bottom-0 left-0 w-full h-[60px] md:h-[70px] z-[9999] pointer-events-none overflow-hidden select-none px-4 transition-opacity duration-500 ease-in-out
        ${isVisible ? "opacity-100" : "opacity-0"}`}
    >
      {/* THE SLIDER TRACK ARENA */}
      <div className="relative w-full h-full mx-auto">
        {/* MARIO SPRITE CORE ENGINE */}
        <div
          className="absolute bottom-1 w-[45px] h-[45px] md:w-[55px] md:h-[55px] transition-transform duration-75 ease-out"
          style={{
            left: `${scrollProgress}%`,
          }}
        >
          <img
            src="/images/mario.gif"
            alt="Mario Progress Indicator"
            className="w-full h-full object-contain"
          />
        </div>
      </div>
    </div>
  );
}

export default MarioRun;
