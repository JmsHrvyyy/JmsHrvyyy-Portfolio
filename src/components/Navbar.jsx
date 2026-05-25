// src/components/Navbar.jsx
import React, { useState } from "react";

function Navbar() {
  // State para sa pag-control ng mobile menu hamburger toggle
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
    <nav className="fixed top-0 left-0 w-full z-[1000] bg-[#009dff]/10 backdrop-blur-md shadow-[0_5px_20px_rgba(0,157,255,0.2)]">
      <div className="flex justify-between items-center px-5 py-[15px] max-w-7xl mx-auto">
        {/* Logo Section */}
        <div className="text-[10px] md:text-[16px] text-white tracking-wider drop-shadow-[0_0_8px_#00fff7]">
          JmsHrvyyy's Portfolio
        </div>

        {/* Hamburger Menu Icon para sa Mobile */}
        <button
          onClick={toggleMenu}
          className="flex flex-col gap-1.5 cursor-pointer md:hidden z-[1100] focus:outline-none"
          aria-label="Toggle Menu"
        >
          <span
            className={`w-[25px] h-[3px] bg-white transition-all duration-300 ${isOpen ? "rotate-45 translate-y-[9px]" : ""}`}
          ></span>
          <span
            className={`w-[25px] h-[3px] bg-white transition-all duration-300 ${isOpen ? "opacity-0" : ""}`}
          ></span>
          <span
            className={`w-[25px] h-[3px] bg-white transition-all duration-300 ${isOpen ? "-rotate-45 -translate-y-[9px]" : ""}`}
          ></span>
        </button>

        {/* Navigation Links - Mobile-First at Responsive Grid/Flex layout */}
        <ul
          className={`
          flex flex-col md:flex-row list-none m-0 p-0 transition-all duration-400 ease-in-out
          absolute md:static top-[54px] left-0 w-full md:w-auto
          bg-[#0f2e83]/30 md:bg-transparent backdrop-blur-lg md:backdrop-blur-none
          ${isOpen ? "max-h-[400px] opacity-100 translate-y-0" : "max-h-0 md:max-h-none opacity-0 md:opacity-100 overflow-hidden pointer-events-none md:pointer-events-auto"}
        `}
        >
          {navLinks.map((link) => (
            <li key={link.name} className="w-full md:w-auto">
              <a
                href={link.href}
                onClick={() => setIsOpen(false)} // Isasara ang menu kapag pinindot sa mobile
                className="block text-center text-white font-bold text-[12px] md:text-[14px] p-4 text-shadow-md no-underline relative transition-all duration-300
                           border-t border-white/20 md:border-none
                           hover:bg-[#00fff7]/10 hover:text-[#00fff7] hover:scale-105
                           before:content-[''] before:absolute before:bottom-0 before:left-0 before:w-0 before:h-[2px] before:bg-[#00fff7] before:transition-all before:duration-300 hover:before:w-full"
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
