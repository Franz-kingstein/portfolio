import React, { useState } from 'react';
import { Github, ExternalLink } from 'lucide-react';
import './Projects.css';

// Import project images
import cottonImg from '../assets/projects/Cotton Disease Classification.jpeg';
import disasterImg from '../assets/projects/Disaster Analysis and Description(D.A.D).jpeg';
import karunyaImg from '../assets/projects/Karunya Interpreter and Computer Kit.jpeg';
import mlcareImg from '../assets/projects/MLCare.jpeg';
import whisperImg from '../assets/projects/OpenAI Whisper Fine-tuning.jpeg';
import claveImg from '../assets/projects/Classification of Aviation Engine (ClAvE).jpeg';
import ruleImg from '../assets/projects/Resume Understanding Language Engine.jpeg';
import sortImg from '../assets/projects/SORT.jpeg';
import paceImg from '../assets/projects/pace.png';

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
    { title: 'Cotton Disease Classification', description: 'AI model for detecting and classifying cotton crop diseases.', tags: ['TensorFlow', 'Python', 'Deep Learning','Computer Vision'], image: cottonImg, liveLink: '#', codeLink: '#' },
    { title: 'Karunya Interpreter and Computer Kit', description: 'Chromosome analysis system with digital interpretation for genetics.', tags: ['AI', 'Genomics', 'Python','React'], image: karunyaImg, liveLink: '#', codeLink: '#' },
    { title: 'Deaf Over Voice System', description: 'Assistive technology enabling deaf users to communicate via voice-to-text.', tags: ['NLP', 'Speech Recognition', 'Accessibility','3D modelling'], liveLink: '#', codeLink: '#' },
    { title: 'Resume Understanding Language Engine', description: 'NLP-powered engine to parse and understand resumes efficiently.', tags: ['NLP', 'Python', 'FastAPI','OCR'], image: ruleImg, liveLink: '#', codeLink: '#' },
    { title: 'Classification of Aviation Engine (ClAvE)', description: 'AI model for classification and fault detection in aviation engines.', tags: ['Machine Learning', 'Aerospace', 'Python','Signal Processing'], image: claveImg, liveLink: '#', codeLink: '#' },
    { title: 'Disaster Analysis and Description(D.A.D)', description: 'Dashboard to present all previous inident of Disaster happened in India', tags: ['MERN', 'Tailwind', 'Website Development'], image: disasterImg, liveLink: '#', codeLink: '#' },
    { title: 'MLCare', description: 'Digital healthcare project for monitoring and analyzing lung health.', tags: ['Healthcare', 'Python', 'AI','ML'], image: mlcareImg, liveLink: '#', codeLink: '#' },
    { title: 'OpenAI Whisper Fine-tuning', description: 'Fine-tuned Whisper model for optimized speech-to-text applications.', tags: ['OpenAI', 'Whisper', 'Fine-tuning'], image: whisperImg, liveLink: '#', codeLink: '#' },
    {
      title: "FAST – Flood Alert System Tracker",
      description: "Real-time flood monitoring and alert system using sensor data, predictive models, and automated notifications for early disaster response.",
      tags: ["AI", "IoT", "Python", "AWS", "Real-time Monitoring"],
      liveLink: "#",
      codeLink: "#"
    },
    {
      title: "SORT – Software Optimization & Resource Team",
      description: "AI-driven system for optimizing software workflows and resource allocation using intelligent agents and performance analytics.",
      tags: ["AI Agents", "Python", "Optimization", "LangChain", "Automation"],
      image: sortImg,
      liveLink: "#",
      codeLink: "#"
    },
    {
      title: "PACE – Project Automation & Collaboration Engine",
      description: "Task and project management platform enhanced with AI agents for workflow automation, collaboration, and intelligent task orchestration.",
      tags: ["AI Agents", "Task Management", "Automation", "Python", "Collaboration"],
      image: paceImg,
      liveLink: "#",
      codeLink: "#"
    }
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
