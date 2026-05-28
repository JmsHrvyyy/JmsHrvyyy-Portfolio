// src/components/Contact.jsx
import React, { useState, useEffect, useRef } from "react";

function Contact() {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  // Form State Elements para sa input monitoring
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  // Scroll Reveal Observer Variant
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.05 },
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, []);

  // Form submit interceptor framework
  const handleSubmit = (e) => {
    e.preventDefault();
    // Dito mo pwede isaksak ang EmailJS o Formspree functionality balang araw, James!
    console.log("Transmission sent: ", formData);
    alert("SYSTEM DATA: Message successfully routed to secure queue matrix.");
    setFormData({ name: "", email: "", message: "" }); // Reset inputs
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className={`min-h-screen flex items-center justify-center py-[100px] px-5 select-none transition-all duration-1000 ease-out transform overflow-hidden
        ${isVisible ? "opacity-100 translate-y-0 filter blur-0 scale-100" : "opacity-0 translate-y-20 filter blur-[8px] scale-95"}`}
    >
      <div className="w-full max-w-[1050px] mx-auto text-left">
        {/* SECTION HEADER BLOCK */}
        <div className="text-center mb-14">
          <h2 className="font-['Orbitron'] text-[26px] md:text-[38px] font-bold text-white mb-3 tracking-widest drop-shadow-[0_0_12px_#00fff7]">
            Connect Matrix
          </h2>
          <p className="font-['Orbitron'] text-[11px] md:text-[13px] text-gray-400 max-w-[500px] mx-auto tracking-wider uppercase">
            Initialize handshake protocols or query my active distribution
            nodes.
          </p>
        </div>

        {/* --- MAIN GRID SYSTEM (Responsive Layout Flex Stack) --- */}
        <div className="flex flex-col lg:flex-row gap-10 items-stretch">
          {/* LEFT COLUMN: Terminal System Specifications & Social Nodes */}
          <div className="flex-1 bg-[rgba(1,11,20,0.65)] border border-[#00fff7]/15 rounded-[20px] p-6 backdrop-blur-[8px] flex flex-col justify-between">
            <div>
              {/* Fake System Diagnostics Mock Box Header */}
              <div className="flex items-center gap-2 mb-6 border-b border-white/5 pb-3">
                <div className="w-3 h-3 rounded-full bg-red-500/80 animate-pulse"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-[#00fff7]/80"></div>
                <span className="font-['Orbitron'] text-[9px] text-gray-500 tracking-widest uppercase ml-2">
                  Terminal // System_Node_Active
                </span>
              </div>

              <h3 className="font-['Orbitron'] text-[18px] md:text-[22px] font-bold text-white tracking-wide mb-4 uppercase">
                Let's Build Something{" "}
                <span className="text-[#00fff7] drop-shadow-[0_0_6px_#00fff7]">
                  Epic
                </span>
              </h3>
              <p className="font-['Orbitron'] text-[12px] text-gray-400 leading-[1.7] mb-6 text-justify">
                Open for junior web development roles, freelance system
                architecture deployments, or collaboration pipelines. Send a
                ping through the network matrix or reach out directly via my
                encrypted terminal nodes.
              </p>
            </div>

            {/* DIRECT CONNECTIVITY ROUTERS (Social Node Links) */}
            <div className="space-y-3.5 border-t border-white/5 pt-6 mt-6 lg:mt-0">
              {/* Mail Node Component */}
              <a
                href="mailto:james@yourdomain.com" // Palitan mo ng totoong email mo, James
                className="flex items-center gap-4 bg-[rgba(255,255,255,0.02)] border border-white/5 rounded-[12px] p-3.5 hover:border-[#00fff7]/40 hover:bg-[rgba(0,255,247,0.03)] transition-all duration-300 group"
              >
                <div className="text-[#00fff7] text-[18px] group-hover:scale-110 transition-transform duration-300 drop-shadow-[0_0_5px_#00fff7]">
                  &#9993;
                </div>
                <div>
                  <div className="font-['Orbitron'] text-[9px] text-gray-500 tracking-widest uppercase">
                    Email Protocol
                  </div>
                  <div className="font-['Orbitron'] text-[12px] text-white tracking-wide group-hover:text-[#00fff7] transition-colors duration-300">
                    james.hrvyyy@gmail.com
                  </div>
                </div>
              </a>

              {/* GitHub Link Node Component */}
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 bg-[rgba(255,255,255,0.02)] border border-white/5 rounded-[12px] p-3.5 hover:border-[#009dff]/40 hover:bg-[rgba(0,157,255,0.03)] transition-all duration-300 group"
              >
                <div className="text-[#009dff] text-[18px] group-hover:scale-110 transition-transform duration-300 drop-shadow-[0_0_5px_#009dff]">
                  &#60;&#47;&#62;
                </div>
                <div>
                  <div className="font-['Orbitron'] text-[9px] text-gray-500 tracking-widest uppercase">
                    Source Grid
                  </div>
                  <div className="font-['Orbitron'] text-[12px] text-white tracking-wide group-hover:text-[#009dff] transition-colors duration-300">
                    github.com/JmsHrvyyy
                  </div>
                </div>
              </a>
            </div>
          </div>

          {/* RIGHT COLUMN: Interactive Cyberpunk Transmission Form */}
          <div className="flex-[1.2] bg-[rgba(1,11,20,0.75)] border border-[#00fff7]/15 rounded-[20px] p-6 md:p-8 backdrop-blur-[8px] shadow-[0_4px_30px_rgba(0,0,0,0.5)] transition-all duration-300 hover:border-[#00fff7]/30">
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* FIELD 1: Sender Name Input */}
              <div className="flex flex-col space-y-1.5">
                <label className="font-['Orbitron'] text-[10px] font-bold text-[#00fff7] tracking-widest uppercase">
                  [01] Identifier Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="ENTER FULL IDENTIFIER OR INITIALS..."
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full bg-[rgba(1,11,20,0.5)] border border-white/10 rounded-[10px] px-4 py-3 font-['Orbitron'] text-[12px] text-white tracking-wide placeholder-gray-600 focus:outline-none focus:border-[#00fff7] focus:shadow-[0_0_12px_rgba(0,255,247,0.15)] transition-all duration-300 uppercase"
                />
              </div>

              {/* FIELD 2: Sender Email Address Input */}
              <div className="flex flex-col space-y-1.5">
                <label className="font-['Orbitron'] text-[10px] font-bold text-[#00fff7] tracking-widest uppercase">
                  [02] Electronic Mail Node
                </label>
                <input
                  type="email"
                  required
                  placeholder="IDENTIFIER@COMMUNICATION.NET..."
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full bg-[rgba(1,11,20,0.5)] border border-white/10 rounded-[10px] px-4 py-3 font-['Orbitron'] text-[12px] text-white tracking-wide placeholder-gray-600 focus:outline-none focus:border-[#00fff7] focus:shadow-[0_0_12px_rgba(0,255,247,0.15)] transition-all duration-300"
                />
              </div>

              {/* FIELD 3: Message Core Textarea Input Box */}
              <div className="flex flex-col space-y-1.5">
                <label className="font-['Orbitron'] text-[10px] font-bold text-[#00fff7] tracking-widest uppercase">
                  [03] Packet Message Payload
                </label>
                <textarea
                  required
                  rows="4"
                  placeholder="WRITE TRANSMISSION DATA LOGS HERE..."
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  className="w-full bg-[rgba(1,11,20,0.5)] border border-white/10 rounded-[10px] px-4 py-3 font-['Orbitron'] text-[12px] text-white tracking-wide placeholder-gray-600 focus:outline-none focus:border-[#00fff7] focus:shadow-[0_0_12px_rgba(0,255,247,0.15)] transition-all duration-300 resize-none [&::-webkit-scrollbar]:hidden [scrollbar-width:none]"
                />
              </div>

              {/* COMMAND TRANSMIT TRIGGER SUBMIT BUTTON */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full font-['Orbitron'] text-[11px] font-bold text-[#101f30] bg-[#00fff7] border border-[#00fff7] py-3 rounded-[10px] tracking-widest transition-all duration-300 shadow-[0_0_12px_rgba(0,255,247,0.2)] hover:bg-transparent hover:text-[#00fff7] hover:shadow-[0_0_20px_#00fff7] uppercase cursor-pointer"
                >
                  Execute Transmission Protocol
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;
