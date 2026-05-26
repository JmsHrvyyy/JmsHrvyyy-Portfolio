// src/components/Hero.jsx
import React, { useState, useRef, useEffect } from "react";

function Hero() {
  const imageRef = useRef(null);
  const sectionRef = useRef(null);

  // State para malaman kung nakikita na ba ang section sa screen (Scroll Reveal)
  const [isVisible, setIsVisible] = useState(false);

  // Default variables para sa 3D interaction tracking
  const [transformStyle, setTransformStyle] = useState(
    "rotateX(0deg) rotateY(0deg) scale(1)",
  );
  const [boxShadowStyle, setBoxShadowStyle] = useState(
    "0 0 15px rgba(0,255,247,0.3)",
  );

  // INTERSECTION OBSERVER: Taga-abang kung na-scroll na ng user ang section
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Kapag nakikita sa viewport, gagawing true ang state (In Animation)
        // Kapag umalis sa screen, gagawing false (Out Animation)
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }, // Itri-trigger kapag kahit 10% ng component ay nakikita na
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, []);

  // Dynamic 3D Interaction Control
  const handleMouseMove = (e) => {
    if (!imageRef.current) return;
    const rect = imageRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * 15;
    const rotateY = ((x - centerX) / centerX) * 15;

    setTransformStyle(
      `rotateX(${-rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`,
    );
    setBoxShadowStyle(
      `${rotateY * 1.5}px ${-rotateX * 1.5}px 35px rgba(0,255,247,0.6)`,
    );
  };

  const handleMouseLeave = () => {
    setTransformStyle("rotateX(0deg) rotateY(0deg) scale(1)");
    setBoxShadowStyle("0 0 15px rgba(0,255,247,0.3)");
  };

  return (
    <section
      id="home"
      ref={sectionRef}
      // PURE TAILWIND TRANSITION MATRIX: Nagbabago ang opacity at pwesto depende sa 'isVisible' state
      className={`min-h-screen flex items-center justify-center pt-[90px] md:pt-0 pb-12 md:pb-0 select-none transition-all duration-1000 ease-out
        ${isVisible ? "opacity-100 translate-y-0 filter blur-0" : "opacity-0 translate-y-12 filter blur-[4px]"}`}
    >
      <div className="flex flex-col md:flex-row items-center justify-between w-[90%] md:w-[80%] max-w-[1200px] gap-12 md:gap-[80px] text-center md:text-left">
        {/* RETRO GLOWING 3D AVATAR MATRIX */}
        <div
          ref={imageRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          // May dagdag na delay sa transition para maunang mag-load ang text bago ang picture
          className={`relative w-[220px] h-[220px] sm:w-[260px] sm:h-[260px] md:w-[320px] md:h-[320px] flex justify-center items-center group [perspective:1000px] cursor-pointer transition-all duration-1000 delay-300 ease-out
            ${isVisible ? "opacity-100 scale-100" : "opacity-0 scale-75"}`}
        >
          <div className="absolute w-[232px] h-[232px] sm:w-[272px] sm:h-[272px] md:w-[335px] md:h-[335px] rounded-[24px] bg-gradient-to-r from-[#00fff7] via-[#009dff] to-[#ff00c8] animate-[spin_8s_linear_infinite] filter blur-[15px] opacity-80 group-hover:opacity-100 group-hover:blur-[20px] transition-all duration-300 z-0"></div>
          <img
            src="/images/harvey.jpg"
            alt="James Harvey Austria"
            style={{ transform: transformStyle, boxShadow: boxShadowStyle }}
            className="w-[220px] h-[220px] sm:w-[260px] sm:h-[260px] md:w-[320px] md:h-[320px] object-cover rounded-[24px] relative z-10 border-4 border-[#00fff7]/40 group-hover:border-[#00fff7] transition-all duration-200 ease-out [transform-style:preserve-3d]"
          />
        </div>

        {/* HERO GRAPHICS DETAILS */}
        <div className="text-white max-w-[650px] flex-1">
          <h1 className="font-['Orbitron'] text-[32px] sm:text-[44px] md:text-[56px] font-bold text-[#00fff7] tracking-wide leading-tight drop-shadow-[0_0_15px_rgba(0,255,247,0.4)] transition-all duration-300 hover:text-white">
            James Harvey Austria
          </h1>

          <div className="mt-5 inline-block bg-[rgba(0,157,255,0.12)] border border-[#009dff]/40 px-5 py-2.5 rounded-[12px] shadow-[inset_0_0_12px_rgba(0,157,255,0.2)]">
            <p className="font-['Orbitron'] text-[12px] sm:text-[14px] md:text-[16px] text-gray-200 font-bold tracking-widest uppercase">
              Computer Science{" "}
              <span className="text-[#00fff7]">Batch 2026</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
