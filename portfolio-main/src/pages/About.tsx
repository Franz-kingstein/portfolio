import React from 'react';
import { useAdmin } from '../contexts/AdminContext';
import './About.css';
import Profile from '../assets/ProfessionalProfile.png';

const About: React.FC = () => {
  const { portfolioData } = useAdmin();

  return (
    <section id="about" className="about">
      <div className="container">
        <div className="about-card">
          <div className="about-content">
            <div className="about-image fade-in-left">
              <figure className="image-placeholder" aria-label="Professional profile photo">
                <img src={Profile} alt="Franz professional profile" className="about-photo" loading="lazy" />
              </figure>
            </div>
            
            <div className="about-text fade-in-right">
              <h2 className="cursive-heading">About Me</h2>
              <p className="about-description">
                {portfolioData.aboutText}
              </p>
              <p className="about-description">
                I specialize in <span className="highlight">Machine Learning</span>, <span className="highlight">AI</span>, 
                <span className="highlight">Frontend Engineering</span>, and <span className="highlight">Data Analysis</span> —
                building <span className="highlight">intelligent</span>, performant, and human‑centered products.
              </p>
              
              <div className="about-stats">
                <div className="stat">
                  <h3>3+</h3>
                  <p>Years Experience</p>
                </div>
                <div className="stat">
                  <h3>10+</h3>
                  <p>Projects Completed</p>
                </div>
                <div className="stat">
                  <h3>100%</h3>
                  <p>Client Satisfaction</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
