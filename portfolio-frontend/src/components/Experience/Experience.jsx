import useReveal from '../../hooks/useReveal';
import { experiences } from '../../utils/data';
import './Experience.css';

const Experience = () => {
  const titleRef = useReveal();

  return (
    <section className="section experience-section" id="experience">
      <div className="container">
        <div ref={titleRef} className="reveal section-header">
          <p className="section-label">Experience</p>
          <h2 className="section-title">My <span>Journey</span></h2>
        </div>

        <div className="timeline">
          {experiences.map((exp, i) => {
            const ref = useReveal(0.1);
            return (
              <div
                key={exp.id}
                ref={ref}
                className={`reveal timeline-item ${i % 2 === 0 ? 'left' : 'right'}`}
                style={{ '--delay': `${i * 0.15}s` }}
              >
                {/* Dot */}
                <div className="timeline-dot">
                  {exp.type === 'education' ? (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
                      <path d="M6 12v5c3 3 9 3 12 0v-5"/>
                    </svg>
                  ) : (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <rect x="2" y="7" width="20" height="14" rx="2" ry="2"/>
                      <path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16"/>
                    </svg>
                  )}
                </div>

                {/* Card */}
                <div className="timeline-card glass-card">
                  <div className="timeline-meta">
                    <span className={`timeline-type-badge ${exp.type}`}>
                      {exp.type === 'education' ? 'Education' : 'Work'}
                    </span>
                    <span className="timeline-period">{exp.period}</span>
                  </div>
                  <h3 className="timeline-role">{exp.role}</h3>
                  <div className="timeline-company">
                    <span className="company-name">{exp.company}</span>
                    <span className="company-sep">·</span>
                    <span className="company-location">{exp.location}</span>
                  </div>
                  <p className="timeline-desc">{exp.description}</p>
                  <div className="timeline-skills">
                    {exp.skills.map(s => <span key={s} className="tag">{s}</span>)}
                  </div>
                </div>
              </div>
            );
          })}

          {/* Center line */}
          <div className="timeline-line" />
        </div>
      </div>
    </section>
  );
};

export default Experience;