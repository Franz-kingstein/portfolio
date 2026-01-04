import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowDown, Github, Linkedin, Mail, ChevronDown } from 'lucide-react';
import { useAdmin } from '../contexts/AdminContext';
import './Home.css';
import Spline from '@splinetool/react-spline';

const Home: React.FC = () => {
  const { portfolioData } = useAdmin();

  const scrollToNext = () => {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="hero">
      <div className="hero-background">
        <div className="hero-particles"></div>
        
        {/* Spline as background on the right side */}
        <div className="hero-spline-bg" aria-hidden="true">
          <Spline scene="https://prod.spline.design/ftrzbXlLq8aDF8h4/scene.splinecode" />
        </div>
      </div>
      
      <div className="container">
        <div className="hero-inner">
          <div className="hero-left">
            <div className="hero-content fade-in-up">
              <h1 className="hero-title">
                {portfolioData.heroTitle.split(' ').slice(0, -1).join(' ')}{' '}
                <span className="gradient-text">
                  {portfolioData.heroTitle.split(' ').slice(-1)[0]}
                </span>
              </h1>
              
              <p className="hero-subtitle">
                {portfolioData.heroSubtitle}
              </p>
              
              <div className="hero-buttons">
                <a href="#projects" className="btn btn-primary" onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
                }}>
                  View My Work
                </a>
                <a href="#contact" className="btn btn-secondary" onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                }}>
                  Get In Touch
                </a>
              </div>
              
              <div className="social-links">
                <a 
                  href={portfolioData.socialLinks.github} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                >
                  <Github size={24} />
                </a>
                <a 
                  href={portfolioData.socialLinks.linkedin} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                >
                  <Linkedin size={24} />
                </a>
                <a 
                  href={portfolioData.socialLinks.email}
                  aria-label="Email"
                >
                  <Mail size={24} />
                </a>
                <a 
                  href={(portfolioData as any).socialLinks.medium} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  aria-label="Medium"
                >
                  {/* Using Mail icon placeholder removed Twitter; you can add a Medium SVG later */}
                  <svg width="24" height="24" viewBox="0 0 1043.63 592.71" aria-hidden="true" focusable="false">
                    <path d="M588.67 296.35c0 163.68-131.92 296.36-294.34 296.36S0 460.03 0 296.35 131.92 0 294.33 0s294.34 132.68 294.34 296.35M911.44 296.35c0 154.23-65.96 279.33-147.36 279.33s-147.36-125.1-147.36-279.33 65.96-279.33 147.36-279.33 147.36 125.1 147.36 279.33m132.19 0c0 141.02-24.64 255.33-55.02 255.33s-55.02-114.31-55.02-255.33 24.64-255.33 55.02-255.33 55.02 114.31 55.02 255.33" fill="currentColor"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Removed the right-side framed container; Spline is now in background */}
        </div>
      </div>
      
      <button className="scroll-indicator" onClick={scrollToNext} aria-label="Scroll to next section">
        <ChevronDown size={24} />
      </button>
    </section>
  );
};

export default Home;
