import React, { useState } from 'react';
import './Features.css';
import { useTheme } from '../contexts/ThemeContext';
import awsCert from '../assets/certificate/AWS.jpeg';
import dsCert from '../assets/certificate/Data_science_bootcamp.jpeg';
import edaCert from '../assets/certificate/EDA.jpeg';
import javaCert from '../assets/certificate/java.jpeg';
import nvidiaCert from '../assets/certificate/Nvidia_prompt_engineering.png';
import opencvCert from '../assets/certificate/OpenCv.jpeg';
import aiMongoCert from '../assets/certificate/AI_agents_with_MongoDb.jpeg';
import watsonxCert from '../assets/certificate/Ai_agent_watsonx_hackathon.jpeg';
import awsDevCert from '../assets/certificate/AWSDeveloperAssociate_Infosys.jpeg';
import cCiscoCert from '../assets/certificate/C_Cisco.jpeg';
import cloudNptelCert from '../assets/certificate/Cloud_computing_nptel.jpeg';
import cyberCert from '../assets/certificate/CyberThreatIntelligentce_Arcx.jpeg';
import dataMiningCert from '../assets/certificate/DataMining_Nptel.jpeg';
import dockerCert from '../assets/certificate/Docker_KodeKloud.jpeg';
import efsetCert from '../assets/certificate/EfSet_English.jpeg';
import englishNptelCert from '../assets/certificate/EnglishLanguageForCompetitiveExams_Nptel.jpeg';
import fullstackCert from '../assets/certificate/FullStack_PrepInsta.jpeg';
import hackspiritCert from '../assets/certificate/HackSpirit_Hackathon.jpeg';
import javaIntCert from '../assets/certificate/JavaIntemediate.jpeg';
import mindkraftCert from '../assets/certificate/Mindkraft_2024.jpeg';
import pythonCiscoCert from '../assets/certificate/Python_Cisco.jpeg';
import ragMongoCert from '../assets/certificate/Rag_MongoDb.jpeg';
import vectorSearchCert from '../assets/certificate/Vector_search_MongoDb.jpeg';

export default function Dashboard() {
  const { isDark } = useTheme();
  const [imageLoadStates, setImageLoadStates] = useState<Record<string, 'loaded' | 'error'>>({});

  // FIXED: Add image load error handling
  const handleImageLoad = (imageId: string) => {
    setImageLoadStates(prev => ({ ...prev, [imageId]: 'loaded' }));
  };

  const handleImageError = (imageId: string) => {
    setImageLoadStates(prev => ({ ...prev, [imageId]: 'error' }));
  };

  // FIXED: Certificate data structure for better management
  const certificates = [
    {
      id: 'aws',
      image: awsCert,
      title: 'AWS Academy Graduate',
      description: 'AWS Cloud Foundational • 2024'
    },
    {
      id: 'aws-dev',
      image: awsDevCert,
      title: 'AWS Developer Associate',
      description: 'Infosys Springboard • 2024'
    },
    {
      id: 'ai-mongodb',
      image: aiMongoCert,
      title: 'AI Agents with MongoDB',
      description: 'MongoDB University • 2024'
    },
    {
      id: 'watsonx',
      image: watsonxCert,
      title: 'Watsonx AI Hackathon',
      description: 'IBM Watsonx • 2024'
    },
    {
      id: 'rag-mongodb',
      image: ragMongoCert,
      title: 'RAG with MongoDB',
      description: 'MongoDB University • 2024'
    },
    {
      id: 'vector-search',
      image: vectorSearchCert,
      title: 'Vector Search MongoDB',
      description: 'MongoDB University • 2024'
    },
    {
      id: 'docker',
      image: dockerCert,
      title: 'Docker Training',
      description: 'KodeKloud • 2024'
    },
    {
      id: 'fullstack',
      image: fullstackCert,
      title: 'Full Stack Development',
      description: 'PrepInsta • 2024'
    },
    {
      id: 'python-cisco',
      image: pythonCiscoCert,
      title: 'Python Essentials',
      description: 'Cisco Networking Academy • 2024'
    },
    {
      id: 'c-cisco',
      image: cCiscoCert,
      title: 'C Programming',
      description: 'Cisco Networking Academy • 2024'
    },
    {
      id: 'cloud-nptel',
      image: cloudNptelCert,
      title: 'Cloud Computing',
      description: 'NPTEL • 2024'
    },
    {
      id: 'data-mining',
      image: dataMiningCert,
      title: 'Data Mining',
      description: 'NPTEL • 2024'
    },
    {
      id: 'cyber-threat',
      image: cyberCert,
      title: 'Cyber Threat Intelligence',
      description: 'ArcX • 2024'
    },
    {
      id: 'efset',
      image: efsetCert,
      title: 'English Proficiency (C2)',
      description: 'EF SET • 2024'
    },
    {
      id: 'english-nptel',
      image: englishNptelCert,
      title: 'English for Competitive Exams',
      description: 'NPTEL • 2024'
    },
    {
      id: 'hackspirit',
      image: hackspiritCert,
      title: 'HackSpirit Hackathon',
      description: 'Participant • 2024'
    },
    {
      id: 'mindkraft',
      image: mindkraftCert,
      title: 'Mindkraft 2024',
      description: 'Event Participant • 2024'
    },
    {
      id: 'java-int',
      image: javaIntCert,
      title: 'Java Intermediate',
      description: 'HackerRank • 2024'
    },
    {
      id: 'datascience',
      image: dsCert,
      title: 'Data Science Bootcamp',
      description: 'COTPot • 2024'
    },
    {
      id: 'eda',
      image: edaCert,
      title: 'Exploratory Data Analysis',
      description: 'Infosys Springboard • 2024'
    },
    {
      id: 'java',
      image: javaCert,
      title: 'Java Programming',
      description: 'SoloLearn • 2024'
    },
    {
      id: 'nvidia',
      image: nvidiaCert,
      title: 'Prompt Engineering',
      description: 'NVIDIA • 2024'
    },
    {
      id: 'opencv',
      image: opencvCert,
      title: 'OpenCV Bootcamp',
      description: 'OpenCV University • 2024'
    }
  ];

  return (
    <section id="features" className="features dashboard">
      <div className="dashboard-container">
        <div className="dash-grid">
          
          {/* GitHub Activity Graph - Large Left Panel */}
          <div className="tile graph-tile">
            <h3 className="tile-header">GitHub Activity</h3>
            <img
              src={`https://github-readme-activity-graph.vercel.app/graph?username=Franz-kingstein&theme=${isDark ? 'react-dark' : 'minimal'}&hide_border=true&radius=16`}
              alt="GitHub Activity Graph"
              className="graph-media"
              loading="lazy"
              decoding="async"
              onLoad={() => handleImageLoad('github-activity')}
              onError={() => handleImageError('github-activity')}
              style={{
                display: imageLoadStates['github-activity'] === 'error' ? 'none' : 'block'
              }}
            />
            {/* FIXED: Error fallback */}
            {imageLoadStates['github-activity'] === 'error' && (
              <div style={{
                flex: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--text-secondary)',
                fontSize: '0.9rem'
              }}>
                GitHub Activity Graph Unavailable
              </div>
            )}
          </div>

          {/* GitHub Stats - Top Right */}
          <div className="tile gh-stats-tile">
            <h3 className="tile-header">GitHub Stats</h3>
            <img
              src={`https://github-readme-stats.vercel.app/api?username=Franz-kingstein&show_icons=true&theme=${isDark ? 'tokyonight' : 'default'}&hide_border=true&border_radius=20&count_private=true`}
              alt="GitHub Stats"
              className="tile-media"
              loading="lazy"
              decoding="async"
              onLoad={() => handleImageLoad('github-stats')}
              onError={() => handleImageError('github-stats')}
              style={{
                display: imageLoadStates['github-stats'] === 'error' ? 'none' : 'block',
                width: '100%',
                height: 'auto'
              }}
            />
            {/* FIXED: Error fallback */}
            {imageLoadStates['github-stats'] === 'error' && (
              <div style={{
                flex: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--text-secondary)',
                fontSize: '0.9rem'
              }}>
                GitHub Stats Unavailable
              </div>
            )}
          </div>

          {/* GitHub Languages - Right Column */}
          <div className="tile gh-langs-tile">
            <h3 className="tile-header">Languages Used</h3>
            <img
              src={`https://github-readme-stats.vercel.app/api/top-langs/?username=Franz-kingstein&layout=donut&theme=${isDark ? 'tokyonight' : 'default'}&hide_border=true&border_radius=20&langs_count=8`}
              alt="Top Languages"
              className="tile-media"
              loading="lazy"
              decoding="async"
              onLoad={() => handleImageLoad('github-languages')}
              onError={() => handleImageError('github-languages')}
              style={{
                display: imageLoadStates['github-languages'] === 'error' ? 'none' : 'block',
                width: '100%',
                height: 'auto'
              }}
            />
            {/* FIXED: Error fallback */}
            {imageLoadStates['github-languages'] === 'error' && (
              <div style={{
                flex: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--text-secondary)',
                fontSize: '0.9rem'
              }}>
                Language Stats Unavailable
              </div>
            )}
          </div>

          {/* LeetCode Stats - Middle Right */}
          <div className="tile leet-tile">
            <h3 className="tile-header">LeetCode Stats</h3>
            <img
              src={`https://leetcard.jacoblin.cool/Franz_2005?theme=${isDark ? 'dark' : 'light'}&font=Montserrat&border=0&radius=20`}
              alt="LeetCode Stats"
              className="tile-media"
              loading="lazy"
              decoding="async"
              onLoad={() => handleImageLoad('leetcode')}
              onError={() => handleImageError('leetcode')}
              style={{
                display: imageLoadStates['leetcode'] === 'error' ? 'none' : 'block'
              }}
            />
            {/* FIXED: Error fallback */}
            {imageLoadStates['leetcode'] === 'error' && (
              <div style={{
                flex: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--text-secondary)',
                fontSize: '0.9rem'
              }}>
                LeetCode Stats Unavailable
              </div>
            )}
          </div>

          {/* Certificates - Bottom Full Width */}
          <div className="tile certs-tile">
            <h3 className="tile-header">Certificates & Achievements</h3>
            <div className="cert-content">
              <div className="cert-showcase">
                {certificates.map((cert) => (
                  <div key={cert.id} className="cert-item">
                    <img 
                      src={cert.image} 
                      alt={cert.title} 
                      className="cert-image"
                      loading="lazy"
                      onLoad={() => handleImageLoad(`cert-${cert.id}`)}
                      onError={() => handleImageError(`cert-${cert.id}`)}
                    />
                    <h4>{cert.title}</h4>
                    <p>{cert.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}