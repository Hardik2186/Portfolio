import { useState } from 'react';
import useReveal from '../../hooks/useReveal';
import { projects, allTechFilters } from '../../utils/data';
import './Projects.css';

const ProjectCard = ({ project }) => (
  <div className="project-card glass-card">
    {/* Preview area */}
    <div className="project-preview">
      <div className="preview-placeholder">
        <div className="preview-code">
          <span className="code-line"><span className="kw">const</span> <span className="fn">project</span> = {'{'}</span>
          <span className="code-line pad"><span className="str">"{project.title}"</span></span>
          <span className="code-line">{'}'}</span>
        </div>
      </div>
      {project.featured && <span className="featured-badge">Featured</span>}
      <div className="project-links-overlay">
        <a href={project.github} target="_blank" rel="noreferrer" className="overlay-btn">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
          </svg>
          Code
        </a>
        <a href={project.live} target="_blank" rel="noreferrer" className="overlay-btn overlay-btn-accent">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/>
            <polyline points="15 3 21 3 21 9"/>
            <line x1="10" y1="14" x2="21" y2="3"/>
          </svg>
          Live
        </a>
      </div>
    </div>

    {/* Content */}
    <div className="project-content">
      <h3 className="project-title">{project.title}</h3>
      <p className="project-desc">{project.description}</p>
      <div className="project-tags">
        {project.tags.map(tag => <span key={tag} className="tag">{tag}</span>)}
      </div>
    </div>
  </div>
);

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const titleRef = useReveal();
  const gridRef = useReveal();

  const filtered = activeFilter === 'All'
    ? projects
    : projects.filter(p => p.tags.includes(activeFilter));

  return (
    <section className="section projects-section" id="projects">
      <div className="container">
        <div ref={titleRef} className="reveal section-header">
          <p className="section-label">Projects</p>
          <h2 className="section-title">Things I've <span>built</span></h2>
        </div>

        {/* Filters */}
        <div className="project-filters">
          {allTechFilters.map(f => (
            <button
              key={f}
              className={`filter-btn ${activeFilter === f ? 'active' : ''}`}
              onClick={() => setActiveFilter(f)}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div ref={gridRef} className="reveal projects-grid">
          {filtered.map((project, i) => (
            <div key={project.id} style={{ animationDelay: `${i * 0.1}s` }}>
              <ProjectCard project={project} />
            </div>
          ))}
        </div>

        {/* GitHub CTA */}
        <div className="github-cta reveal" ref={useReveal()}>
          <div className="github-cta-inner glass-card">
            <div className="github-cta-icon">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
              </svg>
            </div>
            <div>
              <h3>More on GitHub</h3>
              <p>Check out all my open source projects, experiments, and contributions.</p>
            </div>
            <a href="https://github.com/hardik2186" target="_blank" rel="noreferrer" className="btn-outline">
              View GitHub →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;