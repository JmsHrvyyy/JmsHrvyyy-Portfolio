// src/components/About.jsx
import React, { useState, useEffect, useRef } from "react";

function About() {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [angle, setAngle] = useState(0);

  const skills = [
    { name: "HTML5", src: "html-5.png" },
    { name: "CSS3", src: "css-3.png" },
    { name: "JavaScript", src: "js.png" },
    { name: "PHP", src: "php.png" },
    { name: "MySQL", src: "mysql.png" },
    { name: "Java", src: "java.png" },
    { name: "Dart", src: "dart.svg" },
    { name: "FlutterFlow", src: "flutterflow.svg" },
    { name: "Python", src: "python.png" },
    { name: "Git", src: "git.png" },
    { name: "React", src: "react.png" },
    { name: "Firebase", src: "firebase.png" },
    { name: "Tailwind CSS", src: "tailwindcss.png" },
  ];

  // Scroll Reveal Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.15 },
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, []);

  // ANIMATION LOOP ENGINE: Continuous uniform speed tracking
  useEffect(() => {
    let animationFrameId;
    const updateRotation = () => {
      setAngle((prev) => (prev + 0.012) % (2 * Math.PI));
      animationFrameId = requestAnimationFrame(updateRotation);
    };

    if (isVisible) {
      animationFrameId = requestAnimationFrame(updateRotation);
    }
    return () => cancelAnimationFrame(animationFrameId);
  }, [isVisible]);

  return (
    <section
      id="about"
      ref={sectionRef}
      className={`min-h-screen flex items-center justify-center py-[80px] md:py-[120px] px-5 select-none transition-all duration-1000 ease-out transform
        ${isVisible ? "opacity-100 translate-y-0 filter blur-0 scale-100" : "opacity-0 translate-y-16 filter blur-[6px] scale-95"}`}
    >
      <div className="w-full max-w-[1000px] text-center">
        {/* About Title */}
        <h2 className="font-['Orbitron'] text-[28px] md:text-[42px] font-bold text-white mb-10 tracking-widest drop-shadow-[0_0_12px_#00fff7]">
          About Me
        </h2>

        {/* Profile Glass Card */}
        <div className="w-[95%] md:w-[80%] mx-auto bg-[rgba(0,255,247,0.03)] border border-[#00fff7]/20 p-6 md:p-12 rounded-[24px] backdrop-blur-[10px] shadow-[0_4px_30px_rgba(0,255,247,0.05)] text-justify md:text-center mb-16">
          <p className="font-['Orbitron'] text-[13px] md:text-[16px] leading-[1.8] mb-6 text-gray-200 tracking-wide">
            Hi! I'm{" "}
            <strong className="text-[#00fff7] drop-shadow-[0_0_5px_rgba(0,255,247,0.5)]">
              James Harvey Austria
            </strong>
            , a Computer Science student graduating in 2026. I enjoy building
            systems, websites, and applications using programming languages like
            HTML, CSS, Java, and Python.
          </p>
        </div>

        {/* --- 3D ELLIPTICAL ORBIT CONTAINER --- */}
        <div className="mt-20 relative w-full h-[28px] md:h-[380px] flex items-center justify-center overflow-visible">
          {/* Main 3D Perspective Arena */}
          <div className="relative w-full h-full flex items-center justify-center [perspective:1000px] [transform-style:preserve-3d]">
            {/* THE ATOMIC CENTER CORE TEXT: Dito sa element na ito umiikot ang lahat */}
            <div
              style={{ zIndex: 100 }} // Naka-lock sa gitna (para matakpan ng icons sa harap, pero tatakpan niya ang icons sa likod)
              className="absolute pointer-events-none select-none text-center"
            >
              <h3 className="font-['Orbitron'] text-[15px] sm:text-[20px] md:text-[26px] font-bold text-white tracking-widest drop-shadow-[0_0_10px_rgba(0,255,247,0.6)] uppercase animate-[pulse_2s_infinite]">
                Familiar <br className="block sm:hidden" />{" "}
                <span className="text-[#00fff7]">With</span>
              </h3>
              {/* Optional: Subtle neon grid ring sa background ng center core */}
              <div className="absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] w-[180px] md:w-[280px] h-[40px] md:h-[60px] border border-[#00fff7]/10 rounded-[50%] pointer-events-none [transform:rotateX(75deg)]"></div>
            </div>

            {/* TRIGONOMETRIC ORBITING BADGES LAYER */}
            {skills.map((skill, index) => {
              const skillAngle =
                angle + (index * (2 * Math.PI)) / skills.length;

              // Radius calibrations para sa responsive viewport screens
              const radiusX = window.innerWidth > 768 ? 400 : 145; // Lapad pakaliwa at kanan
              const radiusY = window.innerWidth > 768 ? 70 : 30; // Lalim paitaas at paibaba

              const translateX = Math.cos(skillAngle) * radiusX;
              const translateY = Math.sin(skillAngle) * radiusY;

              const sinValue = Math.sin(skillAngle);

              // 3D Depth Interpolations
              const scale = 0.85 + sinValue * 0.2;
              const opacity = 0.55 + sinValue * 0.45;
              const zIndex = Math.round((sinValue + 1) * 100);
              const blur =
                sinValue < 0
                  ? `blur(${Math.abs(sinValue) * 1.5}px)`
                  : "blur(0px)";

              return (
                <div
                  key={index}
                  style={{
                    transform: `translate3d(${translateX}px, ${translateY}px, 0px) scale(${scale})`,
                    opacity: opacity,
                    zIndex: zIndex,
                    filter: blur,
                  }}
                  className="absolute flex flex-col items-center justify-center p-3 w-[65px] h-[65px] md:w-[92px] md:h-[92px] bg-[rgba(1,11,20,0.9)] border border-[#00fff7]/25 rounded-[20px] shadow-[0_4px_25px_rgba(0,255,247,0.08)] transition-all duration-300 group cursor-pointer
                             hover:border-[#00fff7] hover:bg-[rgba(0,255,247,0.15)] hover:shadow-[0_0_25px_#00fff7] hover:scale-110"
                >
                  <img
                    src={`/images/${skill.src}`}
                    alt={skill.name}
                    className="w-[32px] h-[32px] md:w-[46px] md:h-[46px] object-contain transition-transform group-hover:rotate-6"
                  />

                  {/* Floating floating tooltip label tags */}
                  {sinValue > 0.4 && (
                    <span className="absolute bottom-[-24px] text-white font-['Orbitron'] text-[8px] md:text-[9px] tracking-widest bg-[rgba(1,11,20,0.9)] px-2 py-0.5 rounded border border-[#00fff7]/30 whitespace-nowrap drop-shadow-[0_0_6px_#00fff7]">
                      {skill.name}
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
