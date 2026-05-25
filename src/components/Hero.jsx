// src/components/Hero.jsx
import React from "react";

function Hero() {
  return (
    <section
      id="home"
      className="h-screen flex items-center justify-center text-center"
    >
      <div>
        <h1 className="text-[32px] md:text-[60px] text-white drop-shadow-[0_0_10px_#00fff7]">
          James Harvey Austria
        </h1>
        <p className="text-[16px] md:text-[20px] text-gray-400 mt-2">
          Computer Science Batch 2026
        </p>
      </div>
    </section>
  );
}

export default Hero;
