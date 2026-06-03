// src/App.jsx
// ==========================================
// MASTER CORE APPLICATION PIPELINE
// ==========================================
import React from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import MarioRun from "./components/MarioRun";
import DotField from "./components/ui/DotField";

function App() {
  return (
    /* FIXED TYPO: Ginawa nating 'overflow-x-hidden' gamit ang tamang Tailwind configuration setup */
    <div className="bg-[#010b14] min-h-screen text-white font-sans w-full max-w-[100vw] overflow-x-hidden relative">
      {/* ==========================================
          LAYER 1: THE INTERACTIVE CANVAS BACKGROUND
          ========================================== */}
      {/* Naka-fixed para sakop ang buong screen kahit mag-scroll, z-0 para nasa pinakalikod, 
          at pointer-events-none para hindi harangan ang mga clicks sa links mo */}
      <div className="fixed inset-0 w-full h-full z-0 pointer-events-none opacity-10 mix-blend-screen">
        <DotField
          dotRadius={1.2}
          dotSpacing={30}
          cursorRadius={200} // Bahagyang niliitan para mas swabe at localized ang pag-iwas ng dots
          cursorForce={-0.6} // CRITICAL CHANGE: Negatibo (-0.6) para LUMAYO o UMIIWAS ang mga dots sa cursor
          bulgeOnly={false} // CRITICAL CHANGE: Ginawang false para gumalaw sila pabalagbag sa screen (Evasion mode)
          bulgeStrength={0} // In-off na natin ang umbok dahil XY displacement na ang gamit natin
          glowRadius={120}
          sparkle={false}
          waveAmplitude={2.5}
          /* THE PURE PREMIUM CYBERPUNK PALETTE */
          gradientFrom="rgba(0, 255, 247, 0.15)"
          gradientTo="rgba(0, 85, 255, 0.04)"
          glowColor="#010b14"
        />
      </div>

      {/* ==========================================
          LAYER 2: THE FOREGROUND CONTENT MATRIX
          ========================================== */}
      {/* Binibigyan natin ng 'relative z-10' para lumutang ang lahat ng text at cards sa ibabaw ng DotField */}
      <div className="relative z-10 w-full">
        <Navbar />
        <main>
          <Hero />
          <About />
          <Projects />
          <Contact />
        </main>
      </div>

      {/* ==========================================
          LAYER 3: FOREGROUND SYSTEM INTERFACE
          ========================================== */}
      {/* Si Mario ay mananatiling naka-fixed sa pinaka-ibabaw na layer (z-[9999] sa loob ng component niya) */}
      <MarioRun />
    </div>
  );
}

export default App;
