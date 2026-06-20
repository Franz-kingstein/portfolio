import React from 'react';
import { Brain, Code, Database, Palette, Cpu, Eye, Cloud, Server } from 'lucide-react';
import './Skills.css';

const Skills: React.FC = () => {
  const skillCategories = [
    {
      title: "Data Scientist",
      description: "Transforming raw data into actionable insights using advanced analytics and machine learning.",
      icon: <Database size={32} />,
      skills: ["Python", "Pandas", "Scikit-learn", "SQL", "NumPy", "Matplotlib"]
    },
    {
      title: "AI Specialist",
      description: "Building intelligent systems and neural networks that learn and adapt to solve complex problems.",
      icon: <Brain size={32} />,
      skills: ["TensorFlow", "PyTorch", "NLP", "Computer Vision", "Deep Learning", "Neural Networks"]
    },
    {
      title: "Full-Stack Development",
      description: "Developing responsive end-to-end web and mobile applications using modern frameworks and scalable APIs.",
      icon: <Code size={32} />,
      skills: ["HTML5", "CSS3", "JavaScript", "TypeScript", "MongoDB", "Express.js", "Angular", "Node.js", "React Native", "Flutter", "Tailwind CSS"]
    },
    {
      title: "Data Analyst",
      description: "Analyzing complex datasets to uncover patterns, trends, and insights that drive business decisions.",
      icon: <Palette size={32} />,
      skills: ["Tableau", "Power BI", "Excel", "Statistics", "Data Visualization","Seaborn"]
    },
    {
      title: "IoT & Edge AI",
      description: "Designing smart connected systems by integrating embedded hardware, sensors, and edge computing.",
      icon: <Cpu size={32} />,
      skills: ["Arduino IDE", "Arduino Uno", "Arduino Mini", "ESP32", "ESP8266", "Raspberry Pi", "NVIDIA Jetson Nano", "Edge AI"]
    },
    {
      title: "Computer Vision & Edge AI",
      description: "Developing intelligent vision systems to analyze visual data using deep learning models.",
      icon: <Eye size={32} />,
      skills: ["OpenCV", "TensorFlow Lite", "YOLO", "Edge AI", "MQTT", "Roboflow", "Google Teachable Machine", "Google Vision API", "Vision Language Models (VLMs)", "Vision Transformers (ViTs)"]
    },
    {
      title: "Cloud & Deployment",
      description: "Deploying scalable applications across modern cloud platforms for reliable global hosting.",
      icon: <Cloud size={32} />,
      skills: ["Microsoft Azure", "Google Cloud Platform (GCP)", "Amazon Web Services (AWS)", "Render", "Netlify", "Vercel"]
    },
    {
      title: "DevOps & MLOps",
      description: "Automating application delivery and machine learning lifecycles with modern MLOps pipelines.",
      icon: <Server size={32} />,
      skills: ["Docker", "Kubernetes", "Firebase", "Cloud Functions / Serverless", "GitHub Actions", "CI/CD", "Prometheus", "Grafana", "MLflow", "DeepEval"]
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
