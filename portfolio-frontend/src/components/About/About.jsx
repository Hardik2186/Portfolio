import { useState, useEffect } from "react";
import useReveal from "../../hooks/useReveal";
import { personalInfo, stats } from "../../utils/data";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import "./About.css";

const terminalLines = [
  { prompt: "~", cmd: "whoami", out: personalInfo.name },
  { prompt: "~", cmd: "cat role.txt", out: personalInfo.title },
  { prompt: "~", cmd: "cat location.txt", out: personalInfo.location },
  {
    prompt: "~",
    cmd: "ls skills/",
    out: "HTML  CSS  Javascript  React  Node.js  MongoDB  Agenic-AI  MySQL  Express  Docker",
  },
  {
    prompt: "~",
    cmd: "cat passion.txt",
    out: "Building things that matter. One commit at a time.",
  },
  { prompt: "~", cmd: "_", out: null },
];

const About = () => {
  const titleRef = useReveal();
  const bioRef = useReveal();
  const termRef = useReveal();
  const statsRef = useReveal();

  const [visibleLines, setVisibleLines] = useState(0);
  const { ref: termInView, inView } = useInView({ triggerOnce: true });
  const { ref: statsInView, inView: statsVisible } = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  useEffect(() => {
    if (!inView) return;
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setVisibleLines(i);
      if (i >= terminalLines.length) clearInterval(interval);
    }, 400);
    return () => clearInterval(interval);
  }, [inView]);

  return (
    <section className="section about-section" id="about">
      <div className="container">
        <div ref={titleRef} className="reveal section-header">
          <p className="section-label">About Me</p>
          <h2 className="section-title">
            The human behind the <span>code</span>
          </h2>
        </div>

        <div className="about-grid">
          {/* Left: Bio */}
          <div ref={bioRef} className="reveal about-bio">
            <p>{personalInfo.bio}</p>
            <p style={{ marginTop: "1.5rem" }}>
              When I'm not coding, I'm exploring emerging technologies,
              experimenting with AI/LLMs, contributing to open source, or
              sipping chai while reading tech blogs. I believe in clean code,
              bold design, and building fast with purpose.
            </p>
            <div className="about-actions">
              <a href="/Hardik's_Resume.pdf" download className="btn-primary">
                <span>Download Resume</span>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                >
                  <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" />
                </svg>
              </a>
            </div>

            {/* Info chips */}
            <div className="info-chips">
              {[
                { icon: "📍", label: personalInfo.location },
                { icon: "📧", label: personalInfo.email },
                { icon: "💼", label: "Open to work" },
              ].map((chip) => (
                <div key={chip.label} className="info-chip">
                  <span>{chip.icon}</span>
                  <span>{chip.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Terminal */}
          <div ref={termInView} className="">
            <div ref={termRef} className="reveal terminal-card">
              <div className="terminal-header">
                <div className="terminal-dots">
                  <span className="dot-red" />
                  <span className="dot-yellow" />
                  <span className="dot-green" />
                </div>
                <span className="terminal-title">portfolio — bash</span>
              </div>
              <div className="terminal-body">
                {terminalLines.slice(0, visibleLines).map((line, i) => (
                  <div key={i} className="terminal-line">
                    <span className="term-prompt">
                      <span className="term-user">guest</span>
                      <span className="term-at">@</span>
                      <span className="term-host">portfolio</span>
                      <span className="term-sep"> {line.prompt} </span>
                      <span className="term-dollar">$ </span>
                    </span>
                    <span className="term-cmd">{line.cmd}</span>
                    {line.out && <div className="term-output">{line.out}</div>}
                    {!line.out && i === visibleLines - 1 && (
                      <span className="term-blink">█</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div ref={statsInView} className="">
          <div ref={statsRef} className="reveal stats-grid">
            {stats.map((stat) => (
              <div key={stat.label} className="stat-card glass-card">
                <div className="stat-value">
                  {statsVisible ? (
                    <span>
                      {stat.value}
                      {stat.suffix}
                    </span>
                  ) : (
                    <span>0{stat.suffix}</span>
                  )}
                </div>
                <div className="stat-label">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
