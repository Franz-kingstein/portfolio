import React from 'react';
import './About.css';

const About: React.FC = () => {
  return (
    <section id="about" className="about">
      <div className="container">
        <div className="about-content">
          <div className="about-image">
            <div className="about-image-wrapper">
              <img src="/me.jpg" alt="Profile" className="img-wrapped" />
              <div className="photo-bracket-tl"></div>
              <div className="photo-bracket-br"></div>
            </div>
          </div>
          
          <div className="about-text">

            <h2 className="about-heading">About Me</h2>
            <div className="heading-accent-line"></div>
            <p className="about-description">
              I'm a passionate Data Scientist and AI Specialist with expertise in machine learning, frontend
              development, and data analysis. I love turning complex data into actionable
              insights and building intelligent systems that make a difference.
            </p>
            <p className="about-description">
              I specialize in <span className="highlight">Machine Learning</span>, <span className="highlight">AI</span>, <span className="highlight">Frontend Engineering</span>, and <span className="highlight">Data Analysis</span> —
              building <span className="highlight">intelligent</span>, performant, and human-centered products.
            </p>
            
            <div className="about-stats-container">
                <div className="stat-card">
                  <span className="stat-number">3+</span>
                  <p className="stat-label">Years of Experience</p>
                </div>
                <div className="stat-card">
                  <span className="stat-number">15+</span>
                  <p className="stat-label">Projects Completed</p>
                </div>
                <div className="stat-card">
                  <span className="stat-number">100%</span>
                  <p className="stat-label">Client Satisfaction</p>
                </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
