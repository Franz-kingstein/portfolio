import React, { useState } from 'react';
import './Features.css';
import { useTheme } from '../contexts/ThemeContext';
import awsCert from '../assets/certificate/AWS.jpeg';
import dsCert from '../assets/certificate/Data_science_bootcamp.jpeg';
import edaCert from '../assets/certificate/EDA.jpeg';
import javaCert from '../assets/certificate/java.jpeg';
import nvidiaCert from '../assets/certificate/Nvidia_prompt_engineering.png';
import opencvCert from '../assets/certificate/OpenCv.jpeg';

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
      title: 'Java Intermediate',
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
    <section className="features dashboard">
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
              src={`https://github-readme-stats.vercel.app/api?username=Franz-kingstein&show_icons=true&theme=${isDark ? 'tokyonight' : 'default'}&hide_border=true&border_radius=20`}
              alt="GitHub Stats"
              className="tile-media"
              loading="lazy"
              decoding="async"
              onLoad={() => handleImageLoad('github-stats')}
              onError={() => handleImageError('github-stats')}
              style={{
                display: imageLoadStates['github-stats'] === 'error' ? 'none' : 'block'
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
              src={`https://github-readme-stats.vercel.app/api/top-langs/?username=Franz-kingstein&layout=donut&theme=${isDark ? 'tokyonight' : 'default'}&hide_border=true&border_radius=20`}
              alt="Top Languages"
              className="tile-media"
              loading="lazy"
              decoding="async"
              onLoad={() => handleImageLoad('github-languages')}
              onError={() => handleImageError('github-languages')}
              style={{
                display: imageLoadStates['github-languages'] === 'error' ? 'none' : 'block'
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