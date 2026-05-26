// src/components/Contact.jsx
import React from "react";

function Contact() {
  const contactItems = [
    {
      type: "text",
      label: "📧 Email",
      value: "csjamesharvey@gmail.com",
      link: "https://mail.google.com/mail/?view=cm&fs=1&to=csjamesharvey@gmail.com&su=Portfolio Inquiry&body=Hello, I saw your portfolio.",
      actionText: "Send Email",
      isBtn: true,
    },
    {
      type: "text",
      label: "📱 Phone",
      value: "+63 992 868 1987",
      isBtn: false,
    },
    {
      type: "link",
      label: "💻 GitHub",
      value: "github.com/JmsHrvyyy",
      link: "https://github.com/JmsHrvyyy",
    },
    {
      type: "link",
      label: "💼 LinkedIn",
      value: "linkedin.com/in/James Harvey Austria",
      link: "https://www.linkedin.com/in/james-harvey-austria-a29711329/",
    },
  ];

  return (
    <section
      id="contact"
      className="py-[60px] md:py-[120px] px-5 flex justify-center"
    >
      <div className="w-[95%] md:w-[80%] max-w-[900px] text-center select-none">
        <h2 className="text-[28px] md:text-[40px] mb-5 drop-shadow-[0_0_10px_#00fff7]">
          Contact Me
        </h2>

        <p className="text-[12px] md:text-[14px] text-gray-400 mb-10 max-w-[600px] mx-auto leading-relaxed">
          Feel free to reach out if you have any questions, opportunities, or
          collaborations. I'm always open to discussing projects and ideas.
        </p>

        {/* Contact Grid Box */}
        <div className="bg-[#00fff7]/5 border border-[#00fff7]/20 rounded-[20px] p-6 md:p-10 backdrop-blur-md grid grid-cols-1 md:grid-cols-2 gap-[30px] justify-items-center hover:shadow-[0_0_25px_rgba(0,255,247,0.2)] transition-all duration-300">
          {contactItems.map((item, index) => (
            <div key={index} className="text-[12px] leading-[1.8] text-center">
              <span>{item.label}</span>
              <br />
              {item.type === "link" ? (
                <a
                  href={item.link}
                  target="_blank"
                  rel="noreferrer"
                  className="text-[#00fff7] no-underline hover:text-shadow-[0_0_8px_#00fff7] transition-all"
                >
                  {item.value}
                </a>
              ) : (
                <span className="text-gray-400">{item.value}</span>
              )}

              {/* Kung may karagdagang action button (tulad ng Email link) */}
              {item.isBtn && (
                <>
                  <br />
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-block mt-2 px-[15px] py-2 border border-[#00fff7] rounded-[10px] text-[#00fff7] no-underline transition-all duration-300 hover:bg-[#00fff7] hover:text-[#010b14]"
                  >
                    {item.actionText}
                  </a>
                </>
              )}
            </div>
          ))}

          {/* Dedicated Resume Row - Full Width sa Grid */}
          <div className="text-[12px] leading-[1.8] text-center md:col-span-2 mt-4">
            <span>My Resume</span>
            <br />
            <a
              href="assets/James Harvey Resume.pdf"
              download="James-Harvey-Resume.pdf"
              target="_blank"
              rel="noreferrer"
              className="inline-block mt-2 px-[15px] py-2 border border-[#00fff7] rounded-[10px] text-[#00fff7] no-underline transition-all duration-300 hover:bg-[#00fff7] hover:text-[#010b14]"
            >
              Download My Resume
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;
