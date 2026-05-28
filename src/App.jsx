import React from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import MarioRun from "./components/MarioRun";

function App() {
  return (
    <div className="bg-[#010b14] min-h-screen text-white font-sans w-full max-w-[100vw] overflow-x:hidden relative">
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
