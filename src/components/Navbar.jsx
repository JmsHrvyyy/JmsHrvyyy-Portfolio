// src/components/Navbar.jsx
import React, { useState } from "react";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Projects", href: "#projects" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-[1000] bg-[rgba(1,11,20,0.8)] border-b border-[#00fff7]/20 backdrop-blur-[12px] shadow-[0_4px_20px_rgba(0,255,247,0.15)] transition-all duration-300">
      <div className="flex justify-between items-center p-[18px_24px] max-w-7xl mx-auto">
        {/* LOGO gamit ang Orbitron Font */}
        <div className="font-['Orbitron'] text-[16px] md:text-[20px] font-bold text-white tracking-widest select-none drop-shadow-[0_0_8px_#00fff7]">
          JmsHrvyyy's Portfolio
        </div>

        {/* Hamburger Menu Icon (Mobile) */}
        <button
          onClick={toggleMenu}
          className="flex flex-col gap-[6px] cursor-pointer md:hidden z-[1100] focus:outline-none bg-transparent border-none p-1"
        >
          <span
            className={`w-[24px] h-[3px] bg-white rounded-full transition-all duration-300 shadow-[0_0_8px_#00fff7] ${isOpen ? "rotate-45 translate-y-[9px] bg-[#00fff7]" : ""}`}
          ></span>
          <span
            className={`w-[24px] h-[3px] bg-white rounded-full transition-all duration-300 shadow-[0_0_8px_#00fff7] ${isOpen ? "opacity-0" : ""}`}
          ></span>
          <span
            className={`w-[24px] h-[3px] bg-white rounded-full transition-all duration-300 shadow-[0_0_8px_#00fff7] ${isOpen ? "-rotate-45 -translate-y-[9px] bg-[#00fff7]" : ""}`}
          ></span>
        </button>

        {/* NAV LINKS: Malaki, No Underline, Pure Neon Text Hover Effect */}
        <ul
          className={`
          flex flex-col md:flex-row list-none m-0 p-0 transition-all duration-400 ease-in-out
          absolute md:static top-[65px] left-0 w-full md:w-auto
          bg-[rgba(1,11,20,0.95)] md:bg-transparent backdrop-blur-[15px] md:backdrop-blur-none
          ${isOpen ? "max-h-[400px] opacity-100 visible" : "max-h-0 md:max-h-none opacity-0 md:opacity-100 overflow-hidden md:overflow-visible pointer-events-none md:pointer-events-auto"}
        `}
        >
          {navLinks.map((link) => (
            <li key={link.name} className="w-full md:w-auto px-2">
              <a
                href={link.href}
                onClick={() => setIsOpen(false)}
                // Dito pinalaki natin sa text-[15px] at md:text-[16px] gamit ang font-['Orbitron']
                className="block text-center text-gray-300 font-['Orbitron'] font-bold text-[15px] md:text-[16px] tracking-widest p-[12px_20px] no-underline relative transition-all duration-200 rounded-[8px]
                           hover:text-[#00fff7] hover:bg-[rgba(0,255,247,0.08)] hover:scale-105 hover:drop-shadow-[0_0_12px_#00fff7]"
              >
                {link.name}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
