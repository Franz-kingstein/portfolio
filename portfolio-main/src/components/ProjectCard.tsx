import React from 'react';
import './ProjectCard.css';

interface Project {
  id: number;
  title: string;
  short: string;
  desc: string;
  tags: string[];
  cat: string[];
  github: string;
  live: string;
  img: string | null;
  featured: boolean;
}

interface ProjectCardProps {
  project: Project;
  isFlipped: boolean;
  onFlip: () => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, isFlipped, onFlip }) => {
  const getInitials = (title: string) => {
    if (!title) return '';
    return title.split(' ').map(word => word[0]).join('').toUpperCase();
  };

  return (
    <div className="project-card-outer" onClick={onFlip}>
      <div className={`project-card-inner ${isFlipped ? 'is-flipped' : ''}`}>
        {/* Card Front */}
        <div className="project-card-front">
          <div className="card-img-container">
            {project.img ? (
              <img src={project.img} alt={project.title} className="card-img" />
            ) : (
              <div className="card-img-placeholder">
                <span className="card-img-placeholder-text">
                  {getInitials(project.short)}
                </span>
              </div>
            )}
            <div className="card-img-overlay"></div>
          </div>
          <div className="card-front-content">
            {project.featured && <div className="card-featured-badge">⭐ Featured</div>}
            <h3 className="card-front-title">{project.title}</h3>
            <div className="card-front-tags">
              {project.tags.slice(0, 2).map((tag: string) => (
                <span key={tag} className="card-front-tag">{tag}</span>
              ))}
            </div>
            <p className="card-front-hint">Click to explore →</p>
          </div>
        </div>

        {/* Card Back */}
        <div className="project-card-back">
          <div className="card-back-top">
            <p className="card-back-code-label">// {project.short.toLowerCase()}</p>
            <div className="card-back-divider"></div>
            <h3 className="card-back-title">{project.title}</h3>
            <p className="card-back-description">{project.desc}</p>
          </div>
          <div className="card-back-middle">
            <div className="card-back-tags">
              {project.tags.map((tag: string) => (
                <span key={tag} className="card-back-tag">{tag}</span>
              ))}
            </div>
          </div>
          <div className="card-back-bottom">
            <div className="card-back-buttons">
              <a
                href={project.github === '#' ? undefined : project.github}
                target="_blank"
                rel="noopener noreferrer"
                className={`card-back-button github-button ${project.github === '#' ? 'disabled' : ''}`}
                onClick={(e) => {
                  if (project.github === '#') {
                    e.preventDefault();
                  }
                  e.stopPropagation(); 
                }}
              >
                {project.github === '#' ? 'Coming Soon' : 'GitHub ↗'}
              </a>
              {project.live !== '#' && (
                <a 
                  href={project.live} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="card-back-button live-button"
                  onClick={(e) => e.stopPropagation()}
                >
                  Live Demo ↗
                </a>
              )}
            </div>
            <p className="card-back-hint">Click to flip back</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
