// src/components/Hero.jsx
import React, { useState, useRef } from "react";

function Hero() {
  const imageRef = useRef(null);
  const [transformStyle, setTransformStyle] = useState(
    "rotateX(0deg) rotateY(0deg) scale(1)",
  );
  const [boxShadowStyle, setBoxShadowStyle] = useState(
    "0 0 15px rgba(0,255,247,0.3)",
  );

  // Function para sa 3D Tilt at Dynamic Glow effect sa Mouse Move (Desktop)
  const handleMouseMove = (e) => {
    if (!imageRef.current) return;

    const rect = imageRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Max tilt angle na 20 degrees gaya ng lumang code mo
    const rotateX = ((y - centerY) / centerY) * 20;
    const rotateY = ((x - centerX) / centerX) * 20;

    setTransformStyle(
      `rotateX(${-rotateX}deg) rotateY(${rotateY}deg) scale(1.1)`,
    );
    setBoxShadowStyle(`${rotateY}px ${-rotateX}px 30px rgba(0,255,247,0.5)`);
  };

  // Ibalik sa default kapag umalis ang mouse
  const handleMouseLeave = () => {
    setTransformStyle("rotateX(0deg) rotateY(0deg) scale(1)");
    setBoxShadowStyle("0 0 15px rgba(0,255,247,0.3)");
  };

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center py-[60px] md:py-0"
    >
      <div className="flex flex-col md:flex-row items-center justify-between w-[95%] md:w-[80%] gap-10 md:gap-[100px] text-center md:text-left">
        {/* Hero Image Container */}
        <div
          ref={imageRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="relative w-[200px] h-[200px] md:w-[300px] md:h-[300px] flex justify-center items-center group perspective-[1000px]"
        >
          {/* Glowing Animated Frame background */}
          <div className="absolute w-[215px] h-[215px] md:w-[315px] md:h-[315px] rounded-[20px] bg-gradient-to-r from-[#00fff7] via-[#009dff] to-[#00fff7] animate-[spin_6s_linear_infinite] filter blur-[12px] opacity-100 group-hover:blur-[15px] transition-all duration-150 z-0"></div>

          {/* Main Image */}
          <img
            src="images/harvey.jpg"
            alt="James Harvey Austria"
            style={{ transform: transformStyle, boxShadow: boxShadowStyle }}
            className="w-[200px] h-[200px] md:w-[300px] md:h-[300px] object-cover rounded-[20px] relative z-10 border-3 border-[#00fff7]/40 group-hover:border-[#00fff7] transition-all duration-150 ease-out preserve-3d"
          />
        </div>

        {/* Hero Text with Glitch Effect */}
        <div className="select-none text-white md:max-w-[600px]">
          {/* Gagamit tayo ng normal na tailwind typography pero naka-inject yung glitch values */}
          <h1
            data-text="James Harvey Austria"
            className="text-[24px] sm:text-[32px] md:text-[60px] font-bold text-[#00fff7] drop-shadow-[0_0_10px_#00fff7] animate-[flicker_2s_infinite] relative
                       before:content-[attr(data-text)] before:absolute before:left-0 before:top-0 before:w-full before:overflow-hidden before:text-[#00fff7] before:text-shadow-[2px_0_#ff00c8] before:clip-rect-top before:animate-[glitchTop_2s_infinite_linear_alternate-reverse]
                       after:content-[attr(data-text)] after:absolute after:left-0 after:top-0 after:w-full after:overflow-hidden after:text-[#00fff7] after:text-shadow-[-2px_0_#00fff7] after:clip-rect-bottom after:animate-[glitchBottom_2s_infinite_linear_alternate-reverse]"
          >
            James Harvey Austria
          </h1>

          <p
            data-text="Computer Science Batch 2026"
            className="text-[12px] sm:text-[16px] md:text-[20px] text-gray-300 mt-[10px] drop-shadow-[0_0_10px_#00fff7] animate-[flicker_2s_infinite] relative"
          >
            Computer Science Batch 2026
          </p>
        </div>
      </div>
    </section>
  );
}

export default Hero;
