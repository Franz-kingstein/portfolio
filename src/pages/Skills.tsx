import React from 'react';
import { Brain, Code, Database, Palette } from 'lucide-react';
import './Skills.css';

const Skills: React.FC = () => {
  const skillCategories = [
    {
      title: "Data Scientist",
      description: "Transforming raw data into actionable insights using advanced analytics and machine learning.",
      icon: <Database size={40} />,
      skills: ["Python", "Pandas", "Scikit-learn", "SQL", "NumPy", "Matplotlib"]
    },
    {
      title: "AI Specialist",
      description: "Building intelligent systems and neural networks that learn and adapt to solve complex problems.",
      icon: <Brain size={40} />,
      skills: ["TensorFlow", "PyTorch", "NLP", "Computer Vision", "Deep Learning", "Neural Networks"]
    },
    {
      title: "Frontend Developer",
      description: "Creating beautiful, responsive, and interactive user interfaces with modern web technologies.",
      icon: <Code size={40} />,
      skills: ["React", "TypeScript", "JavaScript", "CSS3", "HTML5", "Tailwind"]
    },
    {
      title: "Data Analyst",
      description: "Analyzing complex datasets to uncover patterns, trends, and insights that drive business decisions.",
      icon: <Palette size={40} />,
      skills: ["Tableau", "Power BI", "Excel", "Statistics", "Data Visualization","Seaborn"]
    }
  ];

  return (
    <section id="skills" className="skills">
      <div className="container">
        <h2 className="section-title">My Skills</h2>
        <div className="skills-grid">
          {skillCategories.map((category, index) => (
            <div key={index} className="skill-category fade-in-up">
              <div className="skill-icon">
                {category.icon}
              </div>
              <h3>{category.title}</h3>
              <p>{category.description}</p>
              <div className="skill-tags">
                {category.skills.map((skill, skillIndex) => (
                  <span key={skillIndex} className="skill-tag">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
