import React, { useState, useEffect, useRef } from "react";
import emailjs from "@emailjs/browser"; // Ini-import ang EmailJS package

function Contact() {
  const sectionRef = useRef(null);
  const formRef = useRef(null); // Ref para sa mismong HTML form element
  const [isVisible, setIsVisible] = useState(false);

  // State para sa tracking ng text inputs (para malinis ang form pagkatapos mag-send)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  // Intersection Observer para sa page scroll reveal animation
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

  const handleSubmit = (e) => {
    e.preventDefault(); // Pinipigilan ang pag-refresh ng page

    // Hinihila ang mga variables nang ligtas mula sa .env environment arena
    const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    // REMOVED FOR SECURITY: Tinanggal na natin ang console.log() dito para hindi na mag-print ang keys sa browser!

    // System validation guard lock
    if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
      alert(
        "SYSTEM ERROR: Environment variables are missing. Handshake aborted.",
      );
      return;
    }

    emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, formRef.current, PUBLIC_KEY).then(
      (result) => {
        // Ligtas i-log ang text confirmation tulad ng "OK" o "SUCCESS" dahil walang sensitibong keys dito
        console.log("Transmission Successful:", result.text);
        alert(
          "SYSTEM DATA: Message successfully routed to your personal Gmail inbox!",
        );
        setFormData({ name: "", email: "", message: "" }); // I-reset ang data fields
      },
      (error) => {
        // I-log ang error status code lang para sa safe monitoring
        console.error("Transmission Failed Code:", error.status);
        alert(`SYSTEM ERROR: Handshake protocol failed. Protocol breakdown.`);
      },
    );
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      /* Mobile-First: py-[60px] sa phone, aangat sa py-[100px] sa malalaking monitor */
      className={`w-full min-h-screen flex items-center justify-center py-[60px] md:py-[100px] px-5 select-none transition-all duration-1000 ease-out transform overflow-hidden relative
        ${isVisible ? "opacity-100 translate-y-0 filter blur-0 scale-100" : "opacity-0 translate-y-20 filter blur-[8px] scale-95"}`}
    >
      <div className="w-full max-w-[1050px] mx-auto text-left">
        {/* SECTION HEADER BLOCK */}
        <div className="text-center mb-10 md:mb-14">
          <h2 className="font-['Orbitron'] text-[26px] md:text-[38px] font-bold text-white mb-3 tracking-widest drop-shadow-[0_0_12px_#00fff7]">
            Connect Matrix
          </h2>
          <p className="font-['Orbitron'] text-[11px] md:text-[13px] text-gray-400 max-w-[500px] mx-auto tracking-wider uppercase">
            Initialize handshake protocols or query my active distribution
            nodes.
          </p>
        </div>

        {/* MAIN LAYOUT STACK (Mobile-First: flex-col sa phone, flex-row kapag desktop screens) */}
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-10 items-stretch">
          {/* LEFT COLUMN: Direct Contact Nodes & Resume Download Card */}
          <div className="flex-1 bg-[rgba(1,11,20,0.65)] border border-[#00fff7]/15 rounded-[20px] p-5 md:p-6 backdrop-blur-[8px] flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-6 border-b border-white/5 pb-3">
                <div className="w-3 h-3 rounded-full bg-red-500/80 animate-pulse"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-[#00fff7]/80"></div>
                <span className="font-['Orbitron'] text-[9px] text-gray-500 tracking-widest uppercase ml-2">
                  Terminal // Contact_Nodes
                </span>
              </div>

              <h3 className="font-['Orbitron'] text-[18px] md:text-[22px] font-bold text-white tracking-wide mb-3 uppercase">
                Let's Build Something{" "}
                <span className="text-[#00fff7] drop-shadow-[0_0_6px_#00fff7]">
                  Epic
                </span>
              </h3>
              <p className="font-['Orbitron'] text-[11px] md:text-[12px] text-gray-400 leading-[1.7] mb-6 text-justify">
                Open for junior web development roles, freelance system
                deployments, or collaboration pipelines. Reach out directly via
                my encrypted terminal nodes.
              </p>
            </div>

            {/* COMMUNICATIONS CHANNELS LIST */}
            <div className="space-y-3">
              <a
                href="mailto:csjamesharvey@gmail.com"
                className="flex items-center gap-4 bg-[rgba(255,255,255,0.02)] border border-white/5 rounded-[12px] p-3 hover:border-[#00fff7]/40 hover:bg-[rgba(0,255,247,0.03)] transition-all duration-300 group"
              >
                <div className="text-[#00fff7] text-[18px] group-hover:scale-110 transition-transform duration-300 drop-shadow-[0_0_5px_#00fff7]">
                  &#9993;
                </div>
                <div>
                  <div className="font-['Orbitron'] text-[8px] text-gray-500 tracking-widest uppercase">
                    Email Protocol
                  </div>
                  <div className="font-['Orbitron'] text-[11px] md:text-[12px] text-white tracking-wide group-hover:text-[#00fff7] transition-colors duration-300">
                    csjamesharvey@gmail.com
                  </div>
                </div>
              </a>

              <a
                href="https://github.com/JmsHrvyyy"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 bg-[rgba(255,255,255,0.02)] border border-white/5 rounded-[12px] p-3 hover:border-[#009dff]/40 hover:bg-[rgba(0,157,255,0.03)] transition-all duration-300 group"
              >
                <div className="text-[#009dff] text-[18px] group-hover:scale-110 transition-transform duration-300 drop-shadow-[0_0_5px_#009dff]">
                  &#60;&#47;&#62;
                </div>
                <div>
                  <div className="font-['Orbitron'] text-[8px] text-gray-500 tracking-widest uppercase">
                    Source Grid
                  </div>
                  <div className="font-['Orbitron'] text-[11px] md:text-[12px] text-white tracking-wide group-hover:text-[#009dff] transition-colors duration-300">
                    github.com/JmsHrvyyy
                  </div>
                </div>
              </a>

              <a
                href="https://www.linkedin.com/in/james-harvey-austria-a29711329/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 bg-[rgba(255,255,255,0.02)] border border-white/5 rounded-[12px] p-3 hover:border-[#0055ff]/40 hover:bg-[rgba(0,85,255,0.03)] transition-all duration-300 group"
              >
                <div className="text-[#0055ff] text-[18px] group-hover:scale-110 transition-transform duration-300 drop-shadow-[0_0_5px_#0055ff]">
                  &#128188;
                </div>
                <div>
                  <div className="font-['Orbitron'] text-[8px] text-gray-500 tracking-widest uppercase">
                    LinkedIn Grid
                  </div>
                  <div className="font-['Orbitron'] text-[11px] md:text-[12px] text-white tracking-wide group-hover:text-[#0055ff] transition-colors duration-300">
                    linkedin.com/in/James Harvey Austria
                  </div>
                </div>
              </a>

              <a
                href="tel:+639123456789"
                className="flex items-center gap-4 bg-[rgba(255,255,255,0.02)] border border-white/5 rounded-[12px] p-3 hover:border-[#00fff7]/40 hover:bg-[rgba(0,255,247,0.03)] transition-all duration-300 group"
              >
                <div className="text-[#00fff7] text-[18px] group-hover:scale-110 transition-transform duration-300 drop-shadow-[0_0_5px_#00fff7]">
                  &#128222;
                </div>
                <div>
                  <div className="font-['Orbitron'] text-[8px] text-gray-500 tracking-widest uppercase">
                    Voice Protocol
                  </div>
                  <div className="font-['Orbitron'] text-[11px] md:text-[12px] text-white tracking-wide group-hover:text-[#00fff7] transition-colors duration-300">
                    +63 992 868 1987
                  </div>
                </div>
              </a>

              <div className="pt-2">
                <a
                  href="/resume.pdf"
                  download="James_Harvey_Austria_Resume.pdf"
                  className="w-full block text-center font-['Orbitron'] text-[11px] font-bold text-[#101f30] bg-[#00fff7] border border-[#00fff7] py-3 rounded-[10px] tracking-widest transition-all duration-300 shadow-[0_0_10px_rgba(0,255,247,0.2)] hover:bg-transparent hover:text-[#00fff7] hover:shadow-[0_0_15px_#00fff7] uppercase cursor-pointer"
                >
                  &#128190; Download My Resume
                </a>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Interactive Form Input Fields Box */}
          <div className="flex-[1.2] bg-[rgba(1,11,20,0.75)] border border-[#00fff7]/15 rounded-[20px] p-5 md:p-8 backdrop-blur-[8px] shadow-[0_4px_30px_rgba(0,0,0,0.5)] transition-all duration-300 hover:border-[#00fff7]/30">
            {/* Ikbinalot natin sa formRef ang buong tag at nilagyan ng HTML names para basahin ng EmailJS */}
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
              <div className="flex flex-col space-y-1.5">
                <label className="font-['Orbitron'] text-[10px] font-bold text-[#00fff7] tracking-widest uppercase">
                  [01] Identifier Name
                </label>
                <input
                  type="text"
                  name="from_name" // Ito ang gagamiting parameter sa EmailJS Template
                  required
                  placeholder="ENTER YOUR NAME..."
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full bg-[rgba(1,11,20,0.5)] border border-white/10 rounded-[10px] px-4 py-3 font-['Orbitron'] text-[11px] text-white tracking-wide placeholder-gray-600 focus:outline-none focus:border-[#00fff7] focus:shadow-[0_0_12px_rgba(0,255,247,0.15)] transition-all duration-300 uppercase"
                />
              </div>

              <div className="flex flex-col space-y-1.5">
                <label className="font-['Orbitron'] text-[10px] font-bold text-[#00fff7] tracking-widest uppercase">
                  [02] Electronic Mail Node
                </label>
                <input
                  type="email"
                  name="reply_to" // Gagamitin para kapag nag-reply ka sa email, dideretso sa recruiter
                  required
                  placeholder="YOUR.EMAIL@COMMUNICATION.NET..."
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full bg-[rgba(1,11,20,0.5)] border border-white/10 rounded-[10px] px-4 py-3 font-['Orbitron'] text-[11px] text-white tracking-wide placeholder-gray-600 focus:outline-none focus:border-[#00fff7] focus:shadow-[0_0_12px_rgba(0,255,247,0.15)] transition-all duration-300"
                />
              </div>

              <div className="flex flex-col space-y-1.5">
                <label className="font-['Orbitron'] text-[10px] font-bold text-[#00fff7] tracking-widest uppercase">
                  [03] Packet Message Payload
                </label>
                <textarea
                  name="message" // Parameter para sa nilalaman ng mensahe
                  required
                  rows="4"
                  placeholder="WRITE TRANSMISSION LOGS HERE..."
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  className="w-full bg-[rgba(1,11,20,0.5)] border border-white/10 rounded-[10px] px-4 py-3 font-['Orbitron'] text-[11px] text-white tracking-wide placeholder-gray-600 focus:outline-none focus:border-[#00fff7] focus:shadow-[0_0_12px_rgba(0,255,247,0.15)] transition-all duration-300 resize-none [&::-webkit-scrollbar]:hidden [scrollbar-width:none]"
                />
              </div>

              <div className="pt-1">
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
