// src/components/Projects.jsx
import React, { useState, useEffect, useRef } from "react";

function Projects() {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [activeTab, setActiveTab] = useState("All");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(1); // Default layout configuration for mobile viewports

  // Lightbox modal state controller for image viewing
  const [selectedImage, setSelectedImage] = useState(null);

  const projectList = [
    {
      title: "VibeMovies",
      description:
        "This web application is a specialized community stream designed for film enthusiasts, cinephiles, and developers. It enables users to sync live commentary, curate watchlists, and attach cinematic references to discussions using The Movie Database (TMDB) API.",
      tags: ["REACT", "TAILWIND CSS", "FIREBASE"],
      category: "Web Apps",
      image: "/images/vibemovie.png",
      liveLink: "https://vibemovie-33d20.web.app/",
      githubLink: "https://github.com/JmsHrvyyy/VibeMovies.git",
    },
    {
      title: "Store Price Searcher",
      description:
        "The app features real-time product syncing, product management, search and sorting, and a built-in calculator mode for faster customer transactions.",
      tags: ["FLUTTER", "DART", "FIREBASE"],
      category: "Mobile / Desktop Apps",
      image: "/images/storeapp.jpg",
      liveLink: "#",
      githubLink: "#",
    },
    {
      title: "Cashier Hub & Employee Payroll System (in School Management System)",
      description:
        "I developed the comprehensive Cashier and Payroll Management module for a web-based business application, enabling efficient tracking of personnel credentials, work attendance, and real-time compensation processing. The module features an interactive dashboard with automatic net pay calculation, automated deduction and overtime tracking, and a seamless digital report generation and individual payslip system.",
      tags: ["REACT", "TAILWIND CSS", "PHP", "MYSQL"],
      category: "Web Apps",
      image: "/images/cashiersms.png",
      liveLink: "#",
      githubLink:
        "https://github.com/davidcarnaje-reset/school-management-system/tree/4d5634c9bd2caab06f6e8c4caefbaab4457156f1/src/pages/cashier",
    },
    {
      title: "Tagalert Quick Response System",
      description:
        "A mobile application designed to improve communication between barangay officials and residentss. Residents can report incidents such as accidents or urgent issues, allowing officials to respond quickly. The app also provides analytics for officials to track reports and resolutions, while residents can view local announcements and community updates.",
      tags: ["FLUTTERFLOW", "DART", "FIREBASE"],
      category: "Mobile / Desktop Apps",
      image: "/images/tagalert.jpg",
      liveLink:
        "https://drive.google.com/file/d/1ShhcWowi893eExLTnqAxFcar4NymTL6S/view?usp=drive_link",
      githubLink: "#",
    },
    {
      title: "AC Tutorial Services",
      description:
        "A web application designed for AC Tutorial Services that allows students to view tutorial schedules and understand the tutoring process. The platform also works as a group communication page, where teachers can post announcements and updates for students.",
      tags: ["HTML", "CSS", "JAVASCRIPT", "PHP", "MYSQL"],
      category: "Web Apps",
      image: "/images/acts.jpg",
      liveLink: "#",
      githubLink: "#",
    },
    {
      title: "La Casa Antigo Resort",
      description:
        "A commercial website for La Casa Antigo Resort that showcases the resort's facilities such as the private resort, fishing villa, pavilion, and dome. The website also includes an admin-managed scheduling system where visitors can view upcoming events and activities happening in the resort.",
      tags: ["HTML", "CSS", "JAVASCRIPT", "PHP", "MYSQL"],
      category: "Web Apps",
      image: "/images/lacasa.jpg",
      liveLink: "#",
      githubLink: "#",
    },
    {
      title: "Labuyo Fisheries Corp.",
      description:
        "Commercial website developed for Labuyo Fisheries Corp, a milkfish (bangus) supplier. The website presents the company's products, services, and business information for clients who purchase and receive fish deliveries. It serves as an online presence to help the company connect with customers and showcase their operations.",
      tags: ["HTML", "CSS", "JAVASCRIPT"],
      category: "Web Apps",
      image: "/images/labuyo.jpg",
      liveLink: "#",
      githubLink: "#",
    },
  ];

  // Mobile-First Screen Tracker for responsive card allocations
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setItemsPerPage(1); // 1 card layout frame for portrait mobile viewport views
      } else {
        setItemsPerPage(2); // 2 cards layout frame grid once tablet or desktop window triggers
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Intersection Observer for core page scroll view fade-in animations
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

  // Dynamic system project filtering logic matrix
  const filteredProjects =
    activeTab === "All"
      ? projectList
      : projectList.filter((project) => project.category === activeTab);

  // Auto layout index tracker reset handler when navigating layout tabs
  useEffect(() => {
    setCurrentIndex(0);
  }, [activeTab]);

  const maxSlides = Math.max(0, filteredProjects.length - itemsPerPage);
  const nextSlide = () =>
    setCurrentIndex((prev) => (prev >= maxSlides ? 0 : prev + 1));
  const prevSlide = () =>
    setCurrentIndex((prev) => (prev === 0 ? maxSlides : prev - 1));

  return (
    <section
      id="projects"
      ref={sectionRef}
      className={`w-full min-h-screen flex items-center justify-center py-[80px] px-5 select-none transition-all duration-1000 ease-out transform overflow-hidden
      ${isVisible ? "opacity-100 translate-y-0 filter blur-0 scale-100" : "opacity-0 translate-y-20 filter blur-[8px] scale-95"}`}
    >
      <div className="w-full max-w-[1100px] mx-auto text-center">
        {/* Header Titles Layout Section */}
        <h2 className="font-['Orbitron'] text-[26px] md:text-[38px] font-bold text-white mb-3 tracking-widest drop-shadow-[0_0_12px_#00fff7]">
          My Projects
        </h2>
        <p className="font-['Orbitron'] text-[11px] md:text-[13px] text-gray-400 max-w-[600px] mx-auto mb-8 tracking-wider uppercase">
          Browse through{" "}
          <span className="text-[#00fff7]">
            {filteredProjects.length} builds
          </span>{" "}
          utilizing custom structural interfaces.
        </p>

        {/* Tab Selection Filter System Menu */}
        <div className="flex justify-center flex-wrap gap-3 mb-8 max-w-[600px] mx-auto bg-[rgba(1,11,20,0.5)] p-1.5 rounded-[14px] border border-white/5 backdrop-blur-[5px]">
          {["All", "Web Apps", "Mobile / Desktop Apps"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`font-['Orbitron'] text-[10px] md:text-[12px] font-bold tracking-widest px-4 py-2 rounded-[10px] cursor-pointer transition-all duration-300 uppercase
                ${
                  activeTab === tab
                    ? "text-[#101f30] bg-[#00fff7] shadow-[0_0_12px_#00fff7] border border-[#00fff7]"
                    : "text-gray-400 bg-transparent border border-transparent hover:text-white hover:bg-white/5"
                }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Carousel Tracks Main Viewport Overlay Arena */}
        <div className="relative w-full mx-auto px-2 sm:px-12 flex items-center justify-center">
          {/* Left Arrow Tracking Button Selector */}
          {filteredProjects.length > itemsPerPage && (
            <button
              onClick={prevSlide}
              className="absolute left-[-10px] sm:left-0 z-40 p-2.5 rounded-full border border-[#00fff7]/30 bg-[rgba(1,11,20,0.9)] text-[#00fff7] shadow-[0_0_10px_rgba(0,255,247,0.2)] cursor-pointer transition-all duration-300 hover:bg-[#00fff7] hover:text-[#101f30] hover:shadow-[0_0_12px_#00fff7]"
            >
              &#10216;
            </button>
          )}

          {/* Mask Window Main Frame Layout Boundary */}
          <div className="w-full overflow-hidden p-1 rounded-[24px]">
            {/* The Dynamic Translation Matrix Runner Slider Track */}
            <div
              style={{
                transform: `translateX(-${currentIndex * (100 / itemsPerPage)}%)`,
              }}
              className="flex transition-transform duration-500 ease-in-out w-full"
            >
              {filteredProjects.map((project, index) => (
                <div
                  key={`${activeTab}-${index}`}
                  className="w-full md:w-1/2 shrink-0 px-2.5"
                >
                  {/* --- COMPACT OPTIMIZED PRODUCT CARD FRAME --- */}
                  {/* Binabaan natin ang padding mula p-6 patungong p-5 para mas compact */}
                  <div className="flex flex-col h-full max-h-[520px] bg-[rgba(1,11,20,0.75)] border border-[#00fff7]/15 rounded-[20px] overflow-hidden backdrop-blur-[8px] shadow-[0_4px_25px_rgba(0,0,0,0.5)] text-left group transition-all duration-300 hover:border-[#00fff7]/40 hover:shadow-[0_0_20px_rgba(0,255,247,0.1)]">
                    {/* Project Snapshot Landscape Image Area Container */}
                    {/* Nilimita natin ang height gamit ang h-[160px] md:h-[190px] para hindi kumain ng malaking vertical area */}
                    <div
                      onClick={() => setSelectedImage(project.image)}
                      className="relative w-full h-[150px] md:h-[180px] bg-[rgba(0,157,255,0.02)] overflow-hidden border-b border-white/5 cursor-zoom-in"
                    >
                      <div className="absolute inset-0 bg-[linear-gradient(to_right,#00fff7/4_1px,transparent_1px),linear-gradient(to_bottom,#00fff7/4_1px,transparent_1px)] bg-[size:12px_12px]"></div>
                      <img
                        src={project.image}
                        alt={project.title}
                        onError={(e) => {
                          e.target.style.display = "none";
                        }}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-103"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[rgba(1,11,20,0.9)] to-transparent opacity-30"></div>
                    </div>

                    {/* Metadata Specs Information Description Area Node */}
                    <div className="p-5 flex flex-col justify-between flex-1 overflow-hidden">
                      <div>
                        {/* Title Font Text String */}
                        <h3 className="font-['Orbitron'] text-[16px] md:text-[19px] font-bold text-white tracking-wide group-hover:text-[#00fff7] transition-colors duration-300 uppercase">
                          {project.title}
                        </h3>

                        {/* Technical Badges Tag Loops Stack */}
                        <div className="flex flex-wrap gap-1.5 mt-2 mb-3">
                          {project.tags.map((tag, tagIndex) => (
                            <span
                              key={tagIndex}
                              className="font-['Orbitron'] text-[8px] font-bold text-[#00fff7] bg-[rgba(0,255,247,0.05)] border border-[#00fff7]/15 px-2 py-0.5 rounded-[4px] tracking-wider uppercase"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>

                        {/* Description script box area with conditional text clamping line caps */}
                        {/* Ginamitan natin ng line-clamp-3 para pantay-pantay ang taas ng mga cards */}
                        <div className="h-[68px] overflow-hidden mb-4">
                          <p className="font-['Orbitron'] text-[11px] text-gray-400 leading-[1.6] text-justify line-clamp-3 group-hover:line-clamp-none group-hover:overflow-y-auto h-full pr-1 [&::-webkit-scrollbar]:hidden [scrollbar-width:none]">
                            {project.description}
                          </p>
                        </div>
                      </div>

                      {/* Interactive Interface Redirect Anchor Links Pack (Conditional Evaluation Engine) */}
                      <div className="flex items-center gap-3 pt-3.5 border-t border-white/5 mt-auto">
                        {project.liveLink &&
                          project.liveLink !== "#" &&
                          project.liveLink !== "" && (
                            <a
                              href={project.liveLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex-1 text-center font-['Orbitron'] text-[10px] font-bold text-[#101f30] bg-[#00fff7] border border-[#00fff7] py-2 rounded-[8px] tracking-wider transition-all duration-300 shadow-[0_0_8px_rgba(0,255,247,0.2)] hover:bg-transparent hover:text-[#00fff7] hover:shadow-[0_0_12px_#00fff7] uppercase"
                            >
                              Live Demo
                            </a>
                          )}
                        {project.githubLink &&
                          project.githubLink !== "#" &&
                          project.githubLink !== "" && (
                            <a
                              href={project.githubLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex-1 text-center font-['Orbitron'] text-[10px] font-bold text-gray-300 bg-transparent border border-white/20 py-2 rounded-[8px] tracking-wider transition-all duration-300 hover:border-[#009dff] hover:text-[#009dff] hover:bg-[rgba(0,157,255,0.03)] uppercase"
                            >
                              Source Code
                            </a>
                          )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Arrow Tracking Button Selector */}
          {filteredProjects.length > itemsPerPage && (
            <button
              onClick={nextSlide}
              className="absolute right-[-10px] sm:right-0 z-40 p-2.5 rounded-full border border-[#00fff7]/30 bg-[rgba(1,11,20,0.9)] text-[#00fff7] shadow-[0_0_10px_rgba(0,255,247,0.2)] cursor-pointer transition-all duration-300 hover:bg-[#00fff7] hover:text-[#101f30] hover:shadow-[0_0_12px_#00fff7]"
            >
              &#10217;
            </button>
          )}
        </div>

        {/* Bottom Carousel Array Pagination Dots Markers indicators */}
        {filteredProjects.length > itemsPerPage && (
          <div className="flex justify-center gap-2 mt-6 relative z-40">
            {Array.from({ length: maxSlides + 1 }).map((_, dotIndex) => (
              <button
                key={dotIndex}
                onClick={() => setCurrentIndex(dotIndex)}
                className={`h-[6px] rounded-full transition-all duration-300 cursor-pointer focus:outline-none border-none
                  ${currentIndex === dotIndex ? "w-[20px] bg-[#00fff7] shadow-[0_0_6px_#00fff7]" : "w-[6px] bg-gray-600 hover:bg-gray-400"}`}
              />
            ))}
          </div>
        )}
      </div>

      {/* --- LIGHTBOX MODAL PICTURE SYSTEM RE-CALIBRATED VIEW --- */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-[rgba(1,11,20,0.85)] backdrop-blur-[8px] p-4 cursor-zoom-out animate-[fadeInCard_0.2s_ease-out_both]"
          onClick={() => setSelectedImage(null)}
        >
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute top-4 right-4 z-[10000] font-['Orbitron'] text-[24px] text-white hover:text-[#00fff7] transition-colors duration-300 focus:outline-none cursor-pointer"
          >
            &times;
          </button>
          <div
            className="relative flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={selectedImage}
              alt="Project Full View Screenshot Interface Grid"
              className="max-w-[80vw] max-h-[70vh] object-contain rounded-[12px] border border-[#00fff7]/20 shadow-[0_0_30px_rgba(0,0,0,0.8)] select-none"
            />
          </div>
        </div>
      )}
    </section>
  );
}

export default Projects;
