import { useState } from 'react';
import useReveal from '../../hooks/useReveal';
import { skills, radarData } from '../../utils/data';
import { useInView } from 'react-intersection-observer';
import {
  RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip
} from 'recharts';
import './Skills.css';

const categories = ['All', 'Frontend', 'Backend', 'Database', 'Language', 'Tools'];

const Skills = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const titleRef = useReveal();
  const barsRef = useReveal();
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  const filtered = activeCategory === 'All'
    ? skills
    : skills.filter(s => s.category === activeCategory);

  return (
    <section className="section skills-section" id="skills">
      <div className="container">
        <div ref={titleRef} className="reveal section-header">
          <p className="section-label">Skills</p>
          <h2 className="section-title">My <span>Arsenal</span></h2>
        </div>

        {/* Category Filter */}
        <div className="skills-filter">
          {categories.map(cat => (
            <button
              key={cat}
              className={`filter-btn ${activeCategory === cat ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="skills-layout">
          {/* Skill Bars */}
          <div ref={ref}>
            <div ref={barsRef} className="reveal skill-bars">
              {filtered.map((skill, i) => (
                <div key={skill.name} className="skill-bar-item" style={{ animationDelay: `${i * 0.06}s` }}>
                  <div className="skill-bar-header">
                    <span className="skill-name">{skill.name}</span>
                    <span className="skill-level">{skill.level}%</span>
                  </div>
                  <div className="skill-track">
                    <div
                      className="skill-fill"
                      style={{
                        width: inView ? `${skill.level}%` : '0%',
                        transitionDelay: `${i * 0.08}s`
                      }}
                    >
                      <div className="skill-glow" />
                    </div>
                  </div>
                  <span className="skill-cat-tag">{skill.category}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Radar Chart */}
          <div className="radar-wrap reveal" ref={useReveal()}>
            <div className="radar-card glass-card">
              <h3 className="radar-title">Skill Radar</h3>
              <ResponsiveContainer width="100%" height={320}>
                <RadarChart data={radarData}>
                  <PolarGrid stroke="rgba(255,255,255,0.06)" />
                  <PolarAngleAxis
                    dataKey="subject"
                    tick={{ fill: 'var(--text-secondary)', fontSize: 12, fontFamily: 'DM Mono' }}
                  />
                  <PolarRadiusAxis domain={[0, 100]} tick={false} axisLine={false} />
                  <Tooltip
                    contentStyle={{
                      background: 'var(--surface-2)',
                      border: '1px solid var(--border-accent)',
                      borderRadius: '8px',
                      color: 'var(--text-primary)',
                      fontFamily: 'DM Mono',
                      fontSize: '12px',
                    }}
                  />
                  <Radar
                    name="Skills"
                    dataKey="A"
                    stroke="var(--jade)"
                    fill="var(--jade)"
                    fillOpacity={0.15}
                    strokeWidth={2}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Tech Logos Row */}
        <div className="tech-marquee reveal" ref={useReveal()}>
          <div className="marquee-track">
            {['React', 'Node.js', 'MongoDB', 'Express', 'TypeScript', 'Docker', 'AWS', 'Git', 'Redis', 'GraphQL',
              'React', 'Node.js', 'MongoDB', 'Express', 'TypeScript', 'Docker', 'AWS', 'Git', 'Redis', 'GraphQL'
            ].map((tech, i) => (
              <span key={i} className="marquee-item">{tech}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;