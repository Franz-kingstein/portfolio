import React, { useState } from 'react';
import { Github, ExternalLink } from 'lucide-react';
import './Projects.css';

interface ProjectItem {
  title: string;
  description: string;
  tags: string[];
  image?: string;
  liveLink?: string;
  codeLink?: string;
}

const Projects: React.FC = () => {
  const projects: ProjectItem[] = [
    { title: 'Bike Position Corrector', description: 'Smart system to correct and track bicycle position in real-time.', tags: ['IoT', 'Python', 'Sensors'], liveLink: '#', codeLink: '#' },
    { title: 'Cotton Disease Classification', description: 'AI model for detecting and classifying cotton crop diseases.', tags: ['TensorFlow', 'Python', 'Deep Learning','Computer Vision'], liveLink: '#', codeLink: '#' },
    { title: 'Karunya Interpreter and Computer Kit', description: 'Chromosome analysis system with digital interpretation for genetics.', tags: ['AI', 'Genomics', 'Python','React'], liveLink: '#', codeLink: '#' },
    { title: 'Deaf Over Voice System', description: 'Assistive technology enabling deaf users to communicate via voice-to-text.', tags: ['NLP', 'Speech Recognition', 'Accessibility','3D modelling'], liveLink: '#', codeLink: '#' },
    { title: 'Resume Understanding Language Engine', description: 'NLP-powered engine to parse and understand resumes efficiently.', tags: ['NLP', 'Python', 'FastAPI','OCR'], image: '/rule.jpeg', liveLink: '#', codeLink: '#' },
    { title: 'Classification of Aviation Engine (ClAvE)', description: 'AI model for classification and fault detection in aviation engines.', tags: ['Machine Learning', 'Aerospace', 'Python','Signal Processing'], liveLink: '#', codeLink: '#' },
    { title: 'Disaster Analysis and Description(D.A.D)', description: 'Dashboard to present all previous inident of Disaster happened in India', tags: ['MERN', 'Tailwind', 'Website Development'], liveLink: '#', codeLink: '#' },
    { title: 'MLCare', description: 'Digital healthcare project for monitoring and analyzing lung health.', tags: ['Healthcare', 'Python', 'AI','ML'], liveLink: '#', codeLink: '#' },
    { title: 'OpenAI Whisper Fine-tuning', description: 'Fine-tuned Whisper model for optimized speech-to-text applications.', tags: ['OpenAI', 'Whisper', 'Fine-tuning'], liveLink: '#', codeLink: '#' },
  ];

  // Track flips for touch/keyboard users
  const [flipped, setFlipped] = useState<Set<number>>(new Set());
  const toggleFlip = (i: number) => {
    setFlipped(prev => {
      const s = new Set(prev);
      s.has(i) ? s.delete(i) : s.add(i);
      return s;
    });
  };

  return (
    <section id="projects" className="projects">
      <div className="container">
        <h2 className="section-title">My Projects</h2>
        <div className="projects-grid">
          {projects.map((p, i) => (
            <div
              key={i}
              className="flip-card"
              onClick={() => toggleFlip(i)}
              onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && toggleFlip(i)}
              role="button"
              tabIndex={0}
              aria-label={`Show details for ${p.title}`}
            >
              <div className={`flip-card-inner ${flipped.has(i) ? 'is-flipped' : ''}`}>
                
                {/* Back: only title */}
                <div className="flip-card-face flip-card-back">
                  <div className="flip-back-content">
                    <h3 className="flip-title-only">{p.title}</h3>
                  </div>
                </div>
                
                {/* Front: image + title + description + tags + links */}
                <div className="flip-card-face flip-card-front">
                  <div className="flip-image">
                    {p.image ? (
                      <img src={p.image} alt={p.title} />
                    ) : (
                      <div className="img-placeholder" aria-hidden="true">Image</div>
                    )}
                  </div>
                  <div className="flip-content">
                    <h3>{p.title}</h3>
                    <p>{p.description}</p>
                    <div className="flip-tags">
                      {p.tags.map((t, tIdx) => (
                        <span key={tIdx} className="flip-tag">{t}</span>
                      ))}
                    </div>
                    <div className="flip-front-links">
                      {p.liveLink && (
                        <a href={p.liveLink} target="_blank" rel="noopener noreferrer" aria-label={`Visit ${p.title} website`}>
                          <ExternalLink size={20} />
                        </a>
                      )}
                      {p.codeLink && (
                        <a href={p.codeLink} target="_blank" rel="noopener noreferrer" aria-label={`${p.title} source code`}>
                          <Github size={20} />
                        </a>
                      )}
                    </div>
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
