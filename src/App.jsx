import React from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import MarioRun from "./components/MarioRun";

function App() {
  return (
    // Main Background at layout container gamit ang Tailwind classes
    <div className="bg-[#010b14] min-h-screen text-white font-['Press_Start_2P'] antialiased pt-[60px] overflow-x-hidden selection:bg-[#00fff7] selection:text-[#010b14]">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Projects />
        <Contact />
      </main>
      <MarioRun />
    </div>
  );
}

export default App;
