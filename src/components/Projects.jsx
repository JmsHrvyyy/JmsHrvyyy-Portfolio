// src/components/Projects.jsx
import React, { useState, useEffect, useRef } from "react";

function Projects() {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [activeTab, setActiveTab] = useState("All");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(1); // Default to 1 for mobile-first layout

  // Lightbox modal state controller
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
      title: "Cashier System (in School Management System)",
      description:
        "I developed the comprehensive Cashier and Payroll Management module for a web-based business application, enabling efficient tracking of personnel credentials, work attendance, and real-time compensation processing. The module features an interactive dashboard with automatic net pay calculation, automated deduction and overtime tracking, and a seamless digital report generation and individual payslip system.",
      tags: ["REACT", "TAILWIND CSS", "PHP", "MYSQL"],
      category: "Web Apps",
      image: "/images/cashiersms.png",
      liveLink: "#",
      githubLink: "https://github.com/davidcarnaje-reset/school-management-system/tree/4d5634c9bd2caab06f6e8c4caefbaab4457156f1/src/pages/cashier",
    },
    {
      title: "Tagalert Quick Response System",
      description:
        "A mobile application designed to improve communication between barangay officials and residentss. Residents can report incidents such as accidents or urgent issues, allowing officials to respond quickly. The app also provides analytics for officials to track reports and resolutions, while residents can view local announcements and community updates.",
      tags: ["FLUTTERFLOW", "DART", "FIREBASE"],
      category: "Mobile / Desktop Apps",
      image: "/images/tagalert.jpg",
      liveLink: "https://drive.google.com/file/d/1ShhcWowi893eExLTnqAxFcar4NymTL6S/view?usp=drive_link",
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

  // Mobile-First Screen Tracker
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setItemsPerPage(1); // 1 Card lang kapag phone view
      } else {
        setItemsPerPage(2); // 2 Cards naman kapag lumaki ang view screen sa desktop
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Intersection Observer for scroll reveal effect
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

  // Filter matrix logic handling
  const filteredProjects =
    activeTab === "All"
      ? projectList
      : projectList.filter((project) => project.category === activeTab);

  // Reset index to 0 when active tab changes
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
      className={`min-h-screen flex items-center justify-center py-[100px] px-5 select-none transition-all duration-1000 ease-out transform overflow-hidden
        ${isVisible ? "opacity-100 translate-y-0 filter blur-0 scale-100" : "opacity-0 translate-y-20 filter blur-[8px] scale-95"}`}
    >
      <div className="w-full max-w-[1240px] text-center">
        {/* Title Header */}
        <h2 className="font-['Orbitron'] text-[28px] md:text-[42px] font-bold text-white mb-4 tracking-widest drop-shadow-[0_0_12px_#00fff7]">
          My Projects
        </h2>
        <p className="font-['Orbitron'] text-[11px] md:text-[14px] text-gray-400 max-w-[600px] mx-auto mb-10 tracking-wider uppercase">
          Browse through{" "}
          <span className="text-[#00fff7]">
            {filteredProjects.length} builds
          </span>{" "}
          utilizing custom structural interfaces.
        </p>

        {/* Tab Category Buttons */}
        <div className="flex justify-center flex-wrap gap-4 mb-12 max-w-[650px] mx-auto bg-[rgba(1,11,20,0.5)] p-2 rounded-[16px] border border-white/5 backdrop-blur-[5px]">
          {["All", "Web Apps", "Mobile / Desktop Apps"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`font-['Orbitron'] text-[11px] md:text-[13px] font-bold tracking-widest px-5 py-2.5 rounded-[12px] cursor-pointer transition-all duration-300 uppercase
                ${
                  activeTab === tab
                    ? "text-[#101f30] bg-[#00fff7] shadow-[0_0_15px_#00fff7] border border-[#00fff7]"
                    : "text-gray-400 bg-transparent border border-transparent hover:text-white hover:bg-white/5"
                }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Carousel Viewport Arena */}
        <div className="relative w-full mx-auto px-2 sm:px-14 flex items-center justify-center">
          {/* Left Arrow Controls */}
          {filteredProjects.length > itemsPerPage && (
            <button
              onClick={prevSlide}
              className="absolute left-[-5px] sm:left-0 z-40 p-3 rounded-full border border-[#00fff7]/30 bg-[rgba(1,11,20,0.9)] text-[#00fff7] shadow-[0_0_10px_rgba(0,255,247,0.2)] cursor-pointer transition-all duration-300 hover:bg-[#00fff7] hover:text-[#101f30] hover:shadow-[0_0_15px_#00fff7]"
            >
              &#10216;
            </button>
          )}

          {/* Mask Window Container */}
          <div className="w-full overflow-hidden p-2 rounded-[28px]">
            {/* The Track Slider */}
            <div
              style={{
                transform: `translateX(-${currentIndex * (100 / itemsPerPage)}%)`,
              }}
              className="flex transition-transform duration-500 ease-in-out w-full"
            >
              {filteredProjects.map((project, index) => (
                <div
                  key={`${activeTab}-${index}`}
                  className="w-full md:w-1/2 shrink-0 px-3"
                >
                  {/* Card Main Container */}
                  <div className="flex flex-col h-full bg-[rgba(1,11,20,0.75)] border border-[#00fff7]/15 rounded-[24px] overflow-hidden backdrop-blur-[8px] shadow-[0_4px_30px_rgba(0,0,0,0.5)] text-left group transition-all duration-300 hover:border-[#00fff7]/50 hover:shadow-[0_0_25px_rgba(0,255,247,0.15)]">
                    {/* Project Image Banner Component */}
                    <div
                      onClick={() => setSelectedImage(project.image)}
                      className="relative w-full aspect-video bg-[rgba(0,157,255,0.03)] overflow-hidden border-b border-white/5 cursor-zoom-in"
                    >
                      <div className="absolute inset-0 bg-[linear-gradient(to_right,#00fff7/4_1px,transparent_1px),linear-gradient(to_bottom,#00fff7/4_1px,transparent_1px)] bg-[size:14px_14px]"></div>
                      <img
                        src={project.image}
                        alt={project.title}
                        onError={(e) => {
                          e.target.style.display = "none";
                        }}
                        // Tinanggal na ang floating textual text lines text blocks overlay; dynamic direct scaling na lang kapag hinover
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[rgba(1,11,20,0.95)] to-transparent opacity-40"></div>
                    </div>

                    {/* Metadata Text Content Details */}
                    <div className="p-6 flex flex-col justify-between flex-1">
                      <div>
                        <h3 className="font-['Orbitron'] text-[18px] md:text-[21px] font-bold text-white tracking-wide group-hover:text-[#00fff7] transition-colors duration-300 uppercase">
                          {project.title}
                        </h3>

                        {/* Tags system map loops */}
                        <div className="flex flex-wrap gap-2 mt-2.5 mb-4">
                          {project.tags.map((tag, tagIndex) => (
                            <span
                              key={tagIndex}
                              className="font-['Orbitron'] text-[9px] font-bold text-[#00fff7] bg-[rgba(0,255,247,0.06)] border border-[#00fff7]/20 px-2 py-0.5 rounded-[6px] tracking-wider uppercase"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>

                        <p className="font-['Orbitron'] text-[12px] text-gray-400 leading-[1.6] mb-6 text-justify">
                          {project.description}
                        </p>
                      </div>

                      <div className="flex items-center gap-4 pt-4 border-t border-white/5 mt-auto">
                        {project.liveLink &&
                          project.liveLink !== "#" &&
                          project.liveLink !== "" && (
                            <a
                              href={project.liveLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex-1 text-center font-['Orbitron'] text-[11px] font-bold text-[#101f30] bg-[#00fff7] border border-[#00fff7] py-2.5 rounded-[10px] tracking-wider transition-all duration-300 shadow-[0_0_10px_rgba(0,255,247,0.2)] hover:bg-transparent hover:text-[#00fff7] hover:shadow-[0_0_15px_#00fff7] uppercase"
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
                              className="flex-1 text-center font-['Orbitron'] text-[11px] font-bold text-gray-300 bg-transparent border border-white/20 py-2.5 rounded-[10px] tracking-wider transition-all duration-300 hover:border-[#009dff] hover:text-[#009dff] hover:bg-[rgba(0,157,255,0.05)] uppercase"
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

          {/* Right Arrow Controls */}
          {filteredProjects.length > itemsPerPage && (
            <button
              onClick={nextSlide}
              className="absolute right-[-5px] sm:right-0 z-40 p-3 rounded-full border border-[#00fff7]/30 bg-[rgba(1,11,20,0.9)] text-[#00fff7] shadow-[0_0_10px_rgba(0,255,247,0.2)] cursor-pointer transition-all duration-300 hover:bg-[#00fff7] hover:text-[#101f30] hover:shadow-[0_0_15px_#00fff7]"
            >
              &#10217;
            </button>
          )}
        </div>

        {/* Bottom Carousel Navigation Dots Indicators */}
        {filteredProjects.length > itemsPerPage && (
          <div className="flex justify-center gap-2.5 mt-8 relative z-40">
            {Array.from({ length: maxSlides + 1 }).map((_, dotIndex) => (
              <button
                key={dotIndex}
                onClick={() => setCurrentIndex(dotIndex)}
                className={`h-[7px] rounded-full transition-all duration-300 cursor-pointer focus:outline-none border-none
                  ${currentIndex === dotIndex ? "w-[24px] bg-[#00fff7] shadow-[0_0_8px_#00fff7]" : "w-[7px] bg-gray-600 hover:bg-gray-400"}`}
              />
            ))}
          </div>
        )}
      </div>

      {/* --- RE-CALIBRATED IMAGE LIGHTBOX MODAL --- */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-[rgba(1,11,20,0.88)] backdrop-blur-[10px] p-4 cursor-zoom-out animate-[fadeInCard_0.2s_ease-out_both]"
          onClick={() => setSelectedImage(null)}
        >
          {/* Close Trigger Button */}
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute top-5 right-5 z-[10000] font-['Orbitron'] text-[28px] text-white hover:text-[#00fff7] transition-colors duration-300 focus:outline-none cursor-pointer drop-shadow-[0_0_8px_rgba(0,255,247,0.5)]"
          >
            &times;
          </button>

          {/* Image Constraint Frame (Resized to look much better with clean margins) */}
          <div
            className="relative flex items-center justify-center transition-all duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={selectedImage}
              alt="Project Full View Showcase Interface Grid"
              // Binago natin ang maximum width at maximum height para maging compact at magkaroon ng magandang spacing
              className="max-w-[80vw] max-h-[75vh] object-contain rounded-[16px] border border-[#00fff7]/20 shadow-[0_0_40px_rgba(0,0,0,0.8)] select-none"
            />
          </div>
        </div>
      )}
    </section>
  );
}

export default Projects;
