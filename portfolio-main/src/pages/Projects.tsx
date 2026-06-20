import React, { useState, useEffect, useRef } from 'react';
import './Projects.css';

// Image Imports
import NexusBankImg from '../assets/projects/Nexus_Bank.png';
import ABCDEImg from '../assets/projects/ABCDE.png';
import SmartImg from '../assets/projects/Smart.png';
import DrPromptImg from '../assets/projects/DrPrompt.png';
import ChainPilotAiImg from '../assets/projects/chainPilotAi.png';
import CottonImg from '../assets/projects/Cotton Disease Classification.jpeg';
import ClavEImg from '../assets/projects/Classification of Aviation Engine (ClAvE).jpeg';
import MLCareImg from '../assets/projects/MLCare.jpeg';
import KarunyaImg from '../assets/projects/Karunya Interpreter and Computer Kit.jpeg';
import HITImg from '../assets/projects/HIT.png';
import ANTImg from '../assets/projects/ANT.png';
import DADImg from '../assets/projects/Disaster Analysis and Description(D.A.D).jpeg';
import AutoEaseImg from '../assets/projects/AutoEase.png';
import LOAFImg from '../assets/projects/LOAF.png';
import BikeImg from '../assets/projects/Bike Position Corrector.jpeg';
import StarImg from '../assets/projects/Star.png';
import FastImg from '../assets/projects/Fast.jpeg';
import PaceImg from '../assets/projects/pace.png';
import SortImg from '../assets/projects/SORT.jpeg';
import WhisperImg from '../assets/projects/OpenAI Whisper Fine-tuning.jpeg';
import ResumeImg from '../assets/projects/Resume Understanding Language Engine.jpeg';

interface Project {
  id: number;
  title: string;
  desc: string;
  tags: string[];
  categories: string[];
  github: string;
  live: string;
  img?: string;
  featured?: boolean;
}

const projects: Project[] = [
  {
    id: 1,
    title: "NexusBank",
    desc: "NexusBank is a high-maturity, security-first banking application designed for institutional-grade compliance and cloud-native resilience. The platform integrates advanced AI risk analytics, secure ETL pipelines, and a hardened zero-trust architecture.",
    tags: ["Full Stack", "Cyber Security"],
    categories: ["fullstack", "cloud", "top5"],
    github: "https://github.com/abunesh126/nexus-banking",
    live: "https://nexus-bank-app.purpledesert-e9a31017.southindia.azurecontainerapps.io/dashboard",
    img: NexusBankImg,
    featured: false
  },
  {
    id: 2,
    title: "ABCDE - Bird Classification Drone",
    desc: "The project develops a real-time, bio-inspired, multi-modal system that uses vision-audio fusion and temporal tracking verification to accurately detect, classify, and estimate bird populations.",
    tags: ["AI", "IoT", "ML", "Computer Vision"],
    categories: ["aiml", "iot", "computervision", "top5"],
    github: "https://github.com/Franz-kingstein/ABCDE-A-bird-classifying-drone-eagle",
    live: "#",
    img: ABCDEImg,
    featured: true
  },
  {
    id: 3,
    title: "Dr Prompt",
    desc: "This project generates prompts based on the user's input. It uses best prompt practices and frameworks to generate optimized prompts for AI models.",
    tags: ["Gen AI", "MLOps", "AI"],
    categories: ["genai", "cloud", "top5"],
    github: "https://github.com/Franz-kingstein/Dr_Prompt_Engineer",
    live: "https://drprompt-cvb9gdgde7cnaggk.southindia-01.azurewebsites.net",
    img: DrPromptImg,
    featured: true
  },
  {
    id: 4,
    title: "SMART - Social Media Automation",
    desc: "SMART is an enterprise-grade RPA solution that automates the lifecycle of professional social media sharing. It combines n8n orchestration, Google Gemini AI vision, and Playwright browser automation.",
    tags: ["RPA", "Automation", "Agents"],
    categories: ["aiagents", "genai", "top5"],
    github: "https://github.com/Franz-kingstein/SMART--Social-Media-Automator-and-Review-Tracker-linkedin-",
    live: "#",
    img: SmartImg,
    featured: true
  },
  {
    id: 5,
    title: "ChainPilot AI",
    desc: "ChainPilot AI is a multi-agent system designed to act as a digital coworker for Web3 operations. It leverages Google Gemini for task decomposition, NFT strategy generation, and blockchain analytics.",
    tags: ["GCP", "Gen AI", "Full Stack"],
    categories: ["fullstack", "cloud", "top5"],
    github: "https://github.com/Franz-kingstein/ChainPilot-AI",
    live: "https://loyal-karma-419116.web.app/",
    img: ChainPilotAiImg,
    featured: true
  },
  {
    id: 6,
    title: "Bike Position Corrector",
    desc: "Smart system to correct and track bicycle position in real-time using IoT sensors and machine learning.",
    tags: ["IoT", "Python", "Sensors"],
    categories: ["iot"],
    github: "#",
    live: "#",
    img: BikeImg
  },
  {
    id: 7,
    title: "Cotton Disease Classification",
    desc: "AI model for detecting and classifying cotton crop diseases using computer vision and deep learning.",
    tags: ["TensorFlow", "Python", "Deep Learning", "Computer Vision"],
    categories: ["aiml", "computervision"],
    github: "#",
    live: "#",
    img: CottonImg
  },
  {
    id: 8,
    title: "Karunya Interpreter",
    desc: "Chromosome analysis system with digital interpretation for genetic research and analysis.",
    tags: ["AI", "Genomics", "Python", "React"],
    categories: ["aiml"],
    github: "#",
    live: "#",
    img: KarunyaImg
  },
  {
    id: 9,
    title: "Resume Understanding Engine",
    desc: "NLP-powered engine to parse and understand resumes efficiently for recruitment automation.",
    tags: ["NLP", "Python", "FastAPI", "OCR"],
    categories: ["datascience"],
    github: "#",
    live: "#",
    img: ResumeImg
  },
  {
    id: 10,
    title: "ClAvE - Aviation Engine Analysis",
    desc: "AI model for classification and fault detection in aviation engines using signal processing.",
    tags: ["Machine Learning", "Aerospace", "Python", "Signal Processing"],
    categories: ["aiml"],
    github: "#",
    live: "#",
    img: ClavEImg
  },
  {
    id: 11,
    title: "D.A.D - Disaster Analysis Dashboard",
    desc: "Dashboard to visualize all previous disaster incidents that have occurred in India.",
    tags: ["MERN", "Tailwind", "Website Development"],
    categories: ["fullstack"],
    github: "#",
    live: "#",
    img: DADImg
  },
  {
    id: 12,
    title: "MLCare",
    desc: "Digital healthcare project for monitoring and analyzing lung health using machine learning.",
    tags: ["Healthcare", "Python", "AI", "ML"],
    categories: ["aiml"],
    github: "#",
    live: "#",
    img: MLCareImg
  },
  {
    id: 13,
    title: "OpenAI Whisper Fine-tuning",
    desc: "Fine-tuned Whisper model for optimized speech-to-text applications with improved accuracy.",
    tags: ["OpenAI", "Whisper", "Fine-tuning"],
    categories: ["genai"],
    github: "#",
    live: "#",
    img: WhisperImg
  },
  {
    id: 14,
    title: "FAST - Flood Alert System",
    desc: "Real-time flood monitoring and alert system using sensor data, predictive models, and automated notifications.",
    tags: ["AI", "IoT", "Python", "AWS", "Real-time Monitoring"],
    categories: ["iot"],
    github: "#",
    live: "#",
    img: FastImg
  },
  {
    id: 15,
    title: "SORT - Software Optimization",
    desc: "AI-driven system for optimizing software workflows and resource allocation using intelligent agents.",
    tags: ["AI Agents", "Python", "Optimization", "LangChain", "Automation"],
    categories: ["aiagents"],
    github: "#",
    live: "#",
    img: SortImg
  },
  {
    id: 16,
    title: "PACE - Project Automation Engine",
    desc: "Task and project management platform enhanced with AI agents for workflow automation and collaboration.",
    tags: ["AI Agents", "Task Management", "Automation", "Python", "Collaboration"],
    categories: ["aiagents"],
    github: "#",
    live: "#",
    img: PaceImg
  },
  {
    id: 17,
    title: "HIT - Handwriting Tracker",
    desc: "TypeScript-based application to help users systematically track and enhance their handwriting skills.",
    tags: ["AI", "Computer Vision"],
    categories: ["aiml", "computervision"],
    github: "https://github.com/Franz-kingstein/HIT-_-handwriting-Improvement-Tracker",
    live: "https://hit-handwriting-tracker.netlify.app/",
    img: HITImg
  },
  {
    id: 18,
    title: "ANT - Attendance Tracker",
    desc: "AI-powered attendance tracking system using computer vision for automated recognition.",
    tags: ["AI", "Computer Vision", "Database"],
    categories: ["aiml", "computervision"],
    github: "https://github.com/Franz-kingstein/ANT",
    live: "https://ant-3xyh.onrender.com",
    img: ANTImg
  },
  {
    id: 19,
    title: "LOAF - Food Optimizer",
    desc: "TypeScript-driven project to help users log, optimize, and receive personalized food advice.",
    tags: ["Full Stack", "Database"],
    categories: ["fullstack"],
    github: "https://github.com/Franz-kingstein/LOAF",
    live: "#",
    img: LOAFImg
  },
  {
    id: 20,
    title: "STAR - Satellite Analysis",
    desc: "Python-based project focused on analyzing and optimizing satellite transmission data.",
    tags: ["Database", "Big Data"],
    categories: ["datascience"],
    github: "https://github.com/Franz-kingstein/STAR---Satelllite_Transmission_Analysis_Reduction",
    live: "https://star-satelllite-transmission-analysis.onrender.com/",
    img: StarImg
  },
  {
    id: 21,
    title: "AutoEase",
    desc: "Human-led coordination service helping stranded drivers connect with trusted mechanics via WhatsApp.",
    tags: ["Full Stack", "MERN Stack"],
    categories: ["fullstack"],
    github: "https://github.com/Franz-kingstein/AutoEase",
    live: "https://auto-ease.vercel.app/",
    img: AutoEaseImg
  }
];

const tabs = [
  { key: 'top5', label: '⭐ Top 5' },
  { key: 'aiml', label: '🤖 AI / ML' },
  { key: 'aiagents', label: '🤝 AI Agents' },
  { key: 'fullstack', label: '🌐 Full Stack' },
  { key: 'cloud', label: '☁️ Cloud' },
  { key: 'genai', label: '✨ Gen AI' },
  { key: 'iot', label: '🛰️ IoT' },
  { key: 'datascience', label: '📊 Data Science' },
  { key: 'computervision', label: '👁️ Computer Vision' }
];

const ProjectFlipCard: React.FC<{ project: Project; isFlipped: boolean; onFlip: () => void }> = ({
  project,
  isFlipped,
  onFlip
}) => {
  return (
    <div className="flip-card-wrapper" onClick={onFlip}>
      <div className={`flip-card ${isFlipped ? 'flipped' : ''}`}>
        {/* Front Face */}
        <div className="flip-card-front">
          {project.img ? (
            <img src={project.img} alt={project.title} className="flip-card-image" />
          ) : (
            <div className="flip-card-image-placeholder">
              <span>{project.title}</span>
            </div>
          )}
          <div className="flip-card-gradient-overlay"></div>
          <div className="flip-card-front-content">
            <h3 className="flip-card-title">{project.title}</h3>
            <div className="flip-card-tags">
              {project.tags.slice(0, 2).map((tag, idx) => (
                <span key={idx} className="flip-card-tag">
                  {tag}
                </span>
              ))}
            </div>
            <p className="flip-card-explore">Click to explore →</p>
          </div>
        </div>

        {/* Back Face */}
        <div className="flip-card-back">
          <div className="flip-card-back-content">
            <h3 className="flip-card-back-title">{project.title}</h3>
            <p className="flip-card-description">{project.desc}</p>
            <div className="flip-card-back-tags">
              {project.tags.map((tag, idx) => (
                <span key={idx} className="flip-card-back-tag">
                  {tag}
                </span>
              ))}
            </div>
            <div className="flip-card-buttons">
              <a href={project.github} target="_blank" rel="noreferrer" className="flip-card-button github" onClick={(e) => e.stopPropagation()}>
                GitHub
              </a>
              {project.live !== '#' && (
                <a href={project.live} target="_blank" rel="noreferrer" className="flip-card-button live" onClick={(e) => e.stopPropagation()}>
                  Live Demo
                </a>
              )}
            </div>
            <p className="flip-card-flip-back">Click to flip back</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function Projects() {
  const [activeTab, setActiveTab] = useState('top5');
  const [flippedId, setFlippedId] = useState<number | null>(null);
  const [showAll, setShowAll] = useState(false);
  const [visibleCount, setVisibleCount] = useState(6);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const headerRef = useRef<HTMLDivElement>(null);
  const tabsRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener('resize', updateMobile);
    return () => window.removeEventListener('resize', updateMobile);
  }, []);

  useEffect(() => {
    setFlippedId(null);
    setShowAll(false);
    setVisibleCount(6);
  }, [activeTab]);

  const toggleFlip = (id: number) => {
    setFlippedId(prev => (prev === id ? null : id));
  };

  // Close flipped card if user clicks outside of the card grid/wrapper
  useEffect(() => {
    const handleDocumentClick = (e: MouseEvent) => {
      if (flippedId === null) return;
      const target = e.target as HTMLElement;
      if (!target.closest('.flip-card-wrapper')) {
        setFlippedId(null);
      }
    };
    document.addEventListener('click', handleDocumentClick);
    return () => document.removeEventListener('click', handleDocumentClick);
  }, [flippedId]);

  // Close flipped card if user scrolls away from the projects section
  useEffect(() => {
    if (!sectionRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          setFlippedId(null);
        }
      }
    );
    observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const handleShowMore = () => {
    if (showAll) {
      setShowAll(false);
      setVisibleCount(6);
    } else {
      setShowAll(true);
      setVisibleCount(filteredProjects.length);
    }
  };

  const filteredProjects = projects.filter(p =>
    p.categories.includes(activeTab)
  );

  const featuredProject = activeTab === 'top5' ? null : projects.find(p => p.featured && p.categories.includes(activeTab));
  const gridProjects = projects.filter(p => {
    if (activeTab === 'top5') {
      return p.categories.includes('top5');
    }
    return p.categories.includes(activeTab) && p.id !== featuredProject?.id;
  });
  const visibleProjects = gridProjects.slice(0, visibleCount);

  return (
    <section className="projects-section" id="projects" ref={sectionRef}>
      <div className="projects-wrapper">
        {/* Header */}
        <div className="projects-header" ref={headerRef}>

          <h2 className="projects-title">My Projects</h2>
          <div className="projects-underline"></div>
          <p className="projects-subtitle">
            Click a card to explore details.
            <br />
            Filter by domain to find relevant work.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="filter-tabs-wrapper" ref={tabsRef}>
          <div className="filter-tabs">
            {tabs.map(tab => (
              <button
                key={tab.key}
                className={`filter-tab ${activeTab === tab.key ? 'active' : ''}`}
                onClick={() => setActiveTab(tab.key)}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Featured Card */}
        {featuredProject && (
          !isMobile ? (
            <div className="featured-card featured-card-compact">
              <div className="featured-card-left featured-card-left-compact">
                {featuredProject.img ? (
                  <img src={featuredProject.img} alt={featuredProject.title} />
                ) : (
                  <div className="featured-card-placeholder">
                    {featuredProject.title}
                  </div>
                )}
              </div>
              <div className="featured-card-right featured-card-right-compact">
                <div className="featured-badge featured-badge-compact">⭐ Featured</div>
                <h3 className="featured-title featured-title-compact">{featuredProject.title}</h3>
                <p className="featured-description featured-description-compact">{featuredProject.desc}</p>
                <div className="featured-tags featured-tags-compact">
                  {featuredProject.tags.slice(0, 2).map((tag, idx) => (
                    <span key={idx} className="featured-tag featured-tag-compact">
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="featured-buttons featured-buttons-compact">
                  <a
                    href={featuredProject.github}
                    target="_blank"
                    rel="noreferrer"
                    className="featured-button github featured-button-compact"
                  >
                    GitHub ↗
                  </a>
                  {featuredProject.live !== '#' && (
                    <a
                      href={featuredProject.live}
                      target="_blank"
                      rel="noreferrer"
                      className="featured-button live featured-button-compact"
                    >
                      Live Demo ↗
                    </a>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="featured-card-mobile-wrapper" style={{ marginBottom: '2.5rem' }}>
              <div className="featured-badge" style={{ marginBottom: '1rem', width: 'fit-content' }}>⭐ Featured</div>
              <ProjectFlipCard
                project={featuredProject}
                isFlipped={flippedId === featuredProject.id}
                onFlip={() => toggleFlip(featuredProject.id)}
              />
            </div>
          )
        )}

        {/* Project Grid */}
        <div className="projects-grid">
          {visibleProjects.map((project, idx) => (
            <ProjectFlipCard
              key={project.id}
              project={project}
              isFlipped={flippedId === project.id}
              onFlip={() => toggleFlip(project.id)}
            />
          ))}
        </div>

        {/* Show More Button */}
        {gridProjects.length > 6 && (
          <button className="show-more-button" onClick={handleShowMore}>
            {showAll ? 'Show Less ↑' : 'Show More Projects ↓'}
          </button>
        )}
      </div>
    </section>
  );
}
