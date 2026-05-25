// src/components/About.jsx
import React from "react";

function About() {
  const skills = [
    "html-5.png",
    "css-3.png",
    "js.png",
    "php.png",
    "mysql.png",
    "java.png",
    "dart.svg",
    "flutterflow.svg",
  ];

  return (
    <section
      id="about"
      className="py-[60px] md:py-[120px] px-5 flex justify-center"
    >
      <div className="w-[95%] md:w-[80%] max-w-[1000px] text-center select-none">
        <h2 className="text-[28px] md:text-[40px] mb-10 drop-shadow-[0_0_10px_#00fff7]">
          About Me
        </h2>

        {/* Interactive Box */}
        <div className="bg-[#00fff7]/5 border border-[#00fff7]/20 p-6 md:p-10 rounded-[20px] backdrop-blur-md shadow-md hover:shadow-[0_0_25px_rgba(0,255,247,0.3)] transition-all duration-300">
          <p className="text-[12px] md:text-[14px] leading-[1.8] mb-5 text-justify md:text-center">
            Hi! I'm{" "}
            <strong className="text-[#00fff7]">James Harvey Austria</strong>, a
            Computer Science student graduating in 2026. I enjoy building
            systems, websites, and applications using programming languages like
            HTML, CSS, Java, and Python.
          </p>
          <p className="text-[12px] md:text-[14px] leading-[1.8] text-justify md:text-center">
            I'm currently improving my skills in web development and software
            development while building projects for my portfolio.
          </p>
        </div>

        {/* Familiar With Section */}
        <div className="mt-[30px] text-center">
          <h3 className="text-[16px] md:text-[20px] mb-[15px] drop-shadow-[0_0_8px_#00fff7]">
            Familiar With
          </h3>
          <div className="flex justify-center flex-wrap gap-5">
            {skills.map((skill, index) => (
              <img
                key={index}
                src={`images/${skill}`}
                alt="Skill Icon"
                className="w-[40px] h-[40px] md:w-[50px] md:h-[50px] object-contain transition-all duration-300 cursor-default hover:scale-125 hover:filter hover:drop-shadow-[0_0_10px_#00fff7]"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ITO ANG KRITIKAL NA LINE NA NAWALA KAYA NAG-ERROR:
export default About;
