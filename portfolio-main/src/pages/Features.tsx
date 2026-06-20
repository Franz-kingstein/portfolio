import React, { useState, useEffect, useRef, useMemo } from 'react';
import './Features.css';
import { useTheme } from '../contexts/ThemeContext';

// Helper for animated counter
const useAnimatedCounter = (target: number, duration = 1500) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);

  const easeOutQuad = (t: number) => t * (2 - t);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          let startTime: number;
          const animate = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const progress = timestamp - startTime;
            const t = Math.min(progress / duration, 1);
            const easedT = easeOutQuad(t);
            setCount(Math.floor(easedT * target));
            if (t < 1) {
              requestAnimationFrame(animate);
            }
          };
          requestAnimationFrame(animate);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [target, duration]);

  return { count, ref };
};

const StatCard: React.FC<{ number: number; suffix: string; label: string; icon: string }> = ({ number, suffix, label, icon }) => {
  const { count, ref } = useAnimatedCounter(number, 1500);

  return (
    <div className="stat-counter-card">
      <span className="stat-card-icon">{icon}</span>
      <div className="stat-card-number">
        <span ref={ref}>{count}</span>
        <span className="stat-card-suffix">{suffix}</span>
      </div>
      <p className="stat-card-label">{label}</p>
    </div>
  );
};

const LanguageBar: React.FC<{ name: string; percent: number; repos: number }> = ({ name, percent, repos }) => {
  const [width, setWidth] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setWidth(percent);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [percent]);

  return (
    <div ref={ref} style={{ marginBottom: '14px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontSize: '13px', color: '#E8E8F0', fontWeight: 500 }}>{name}</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', margin: '6px 0 4px 0', width: '100%' }}>
        <div style={{ flex: 1, height: '8px', borderRadius: '4px', background: '#1a1a24', overflow: 'hidden' }}>
          <div style={{ 
            height: '8px', 
            borderRadius: '4px', 
            width: `${width}%`, 
            background: 'linear-gradient(90deg, #7F77DD, #1D9E75)',
            transition: 'width 1.5s ease-out'
          }}></div>
        </div>
        <span style={{ fontSize: '12px', color: '#9999B0', marginLeft: '8px', minWidth: '36px' }}>{percent}%</span>
      </div>
      <div style={{ fontSize: '11px', color: '#9999B0' }}>{repos} repositories</div>
    </div>
  );
};

const SkillBar: React.FC<{ name: string; level: number; index: number }> = ({ name, level, index }) => {
  const [width, setWidth] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          const timer = setTimeout(() => {
            setWidth(level);
          }, index * 100);
          observer.disconnect();
          return () => clearTimeout(timer);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [level, index]);

  return (
    <div className="skill-bar-item" ref={ref} style={{ marginBottom: '16px' }}>
      <div className="skill-bar-top" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
        <span className="skill-bar-name" style={{ fontSize: '13px', color: '#E8E8F0' }}>{name}</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
        <div style={{ flex: 1, height: '8px', borderRadius: '4px', background: '#1a1a24', overflow: 'hidden' }}>
          <div style={{ 
            height: '8px', 
            borderRadius: '4px', 
            width: `${width}%`, 
            background: 'linear-gradient(90deg, #7F77DD, #1D9E75)',
            transition: 'width 1.5s ease-out'
          }}></div>
        </div>
        <span style={{ fontSize: '12px', color: '#9999B0', marginLeft: '8px', minWidth: '36px' }}>{level}%</span>
      </div>
    </div>
  );
};

const generateHeatmapData = () => {
  const data = [];
  const today = new Date();
  for (let i = 364; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    const dayOfWeek = date.getDay();
    // More activity on weekdays, less on weekends
    const baseChance = (dayOfWeek >= 1 && dayOfWeek <= 5) ? 0.75 : 0.35;
    const rand = Math.random();
    let level = 0;
    if (rand < baseChance * 0.3) level = 1;
    else if (rand < baseChance * 0.55) level = 2;
    else if (rand < baseChance * 0.75) level = 3;
    else if (rand < baseChance * 0.85) level = 4;
    data.push({ date: date.toISOString().split('T')[0], level });
  }
  return data;
};

const getCellColor = (level: number) => {
  switch (level) {
    case 1: return '#2d2b5e';
    case 2: return '#4f4aaa';
    case 3: return '#7F77DD';
    case 4: return '#1D9E75';
    default: return '#1a1a24';
  }
};

export default function Features() {
  const { isDark } = useTheme();

  const heatmapData = useMemo(() => generateHeatmapData(), []);

  const counterStats = [
    { number: 23, suffix: "", label: "Projects Built", icon: "🚀" },
    { number: 118, suffix: "", label: "GitHub Repos", icon: "📁" },
    { number: 22, suffix: "", label: "Certifications", icon: "🏆" },
    { number: 3, suffix: "+", label: "Years Experience", icon: "⚡" }
  ];

  const skills = [
    { name: "Python", level: 88 },
    { name: "Machine Learning", level: 82 },
    { name: "React / TypeScript", level: 75 },
    { name: "Computer Vision", level: 78 },
    { name: "NLP / LLMs", level: 72 },
    { name: "Cloud (AWS/Azure/GCP)", level: 68 },
    { name: "FastAPI / Node.js", level: 70 },
    { name: "Docker / LangChain", level: 60 }
  ];

  const gitHubStatItems = [
    { label: 'Repositories', value: 118 },
    { label: 'Stars', value: 3 },
    { label: 'Followers', value: 13 },
    { label: 'Following', value: 7 },
  ];

  const leetcodeData = {
    username: "Franz_2005",
    totalSolved: 118,
    ranking: "1,349,620",
    easy:   { solved: 74,  total: 950  },
    medium: { solved: 37,  total: 2069 },
    hard:   { solved: 7,   total: 943  }
  };

  const languages = [
    { name: 'Python', percent: 33.0, repos: 32 },
    { name: 'HTML', percent: 51.5, repos: 50 },
    { name: 'TypeScript', percent: 6.2, repos: 6 },
    { name: 'JavaScript', percent: 4.1, repos: 4 },
    { name: 'Jupyter Notebook', percent: 2.1, repos: 2 },
    { name: 'Shell', percent: 1.0, repos: 1 },
    { name: 'CSS', percent: 1.0, repos: 1 },
    { name: 'Java', percent: 1.0, repos: 1 }
  ];

  return (
    <section id="features" className={`features-section ${isDark ? 'dark' : ''}`}>
      <div className="container">
        {/* Section Header */}
        <div className="features-header">

          <h2 className="section-title">Stats & Achievements</h2>
          <div className="section-underline"></div>
          <p className="section-subtitle">
            A snapshot of my coding journey and technical growth.
          </p>
        </div>

        {/* Row 1: Animated Counter Cards */}
        <div className="stats-row-1">
          {counterStats.map(stat => (
            <StatCard key={stat.label} {...stat} />
          ))}
        </div>

        {/* Main Dashboard Grid */}
        <div className="stats-grid">
          {/* Contribution Graph */}
          <div className="github-graph-card">
            <p className="card-header-tag">{"// github activity"}</p>
            <div style={{ display: 'flex', flexDirection: 'column', width: '100%', height: 'auto' }}>
              <div style={{ 
                display: 'grid', 
                gridTemplateRows: 'repeat(7, 12px)', 
                gridAutoFlow: 'column', 
                gap: '3px',
                overflowX: 'auto',
                width: '100%',
                paddingBottom: '8px'
              }}>
                {heatmapData.map((item, idx) => (
                  <div 
                    key={idx}
                    style={{
                      width: '12px',
                      height: '12px',
                      borderRadius: '3px',
                      backgroundColor: getCellColor(item.level)
                    }}
                    title={`${item.date}`}
                  />
                ))}
              </div>
              <div style={{ marginTop: '12px', fontSize: '13px', color: '#9999B0' }}>
                ✦ 247 contributions in the last year
              </div>
            </div>
          </div>

          {/* GitHub Stats */}
          <div className="github-stats-card">
            <p className="card-header-tag">{"// github stats"}</p>
            <div className="github-stats-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              {gitHubStatItems.map(item => (
                <div className="github-stat-item" key={item.label} style={{
                  background: 'rgba(127, 119, 221, 0.05)',
                  border: '1px solid rgba(127, 119, 221, 0.1)',
                  borderRadius: '12px',
                  padding: '14px',
                  textAlign: 'center'
                }}>
                  <div style={{ fontSize: '22px', fontWeight: 600, color: '#7F77DD' }}>{item.value}</div>
                  <div style={{ fontSize: '13px', color: '#9999B0', marginTop: '4px' }}>{item.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* LeetCode */}
          <div className="leetcode-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <p className="card-header-tag" style={{ margin: 0 }}>{"// leetcode stats"}</p>
              <a 
                href="https://leetcode.com/Franz_2005" 
                target="_blank" 
                rel="noopener noreferrer" 
                style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  color: '#7F77DD', 
                  textDecoration: 'none',
                  fontSize: '14px',
                  fontWeight: 500
                }}
              >
                <span style={{ marginRight: '6px' }}>Franz_2005</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                  <polyline points="15 3 21 3 21 9" />
                  <line x1="10" y1="14" x2="21" y2="3" />
                </svg>
              </a>
            </div>
            
            <div className="leetcode-stats-content">
              {/* Ranking label top row */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                <span style={{ fontSize: '13px', color: '#9999B0' }}>Ranking: {leetcodeData.ranking}</span>
              </div>

              {/* Circular Progress Ring for total solved */}
              {(() => {
                const radius = 54;
                const strokeWidth = 10;
                const circumference = 2 * Math.PI * radius; // ~339.3
                const target = 150; // Solved target for 100% circle completion
                const strokeDashoffset = circumference - (leetcodeData.totalSolved / target) * circumference;

                return (
                  <div style={{ position: 'relative', width: '130px', height: '130px', margin: '20px auto', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <svg width="130" height="130" style={{ transform: 'rotate(-90deg)' }}>
                      <circle
                        cx="65"
                        cy="65"
                        r={radius}
                        stroke="#1a1a24"
                        strokeWidth={strokeWidth}
                        fill="transparent"
                      />
                      <circle
                        cx="65"
                        cy="65"
                        r={radius}
                        stroke="#7F77DD"
                        strokeWidth={strokeWidth}
                        fill="transparent"
                        strokeDasharray={circumference}
                        strokeDashoffset={strokeDashoffset}
                        strokeLinecap="round"
                      />
                      <g style={{ transform: 'rotate(90deg)', transformOrigin: '65px 65px' }}>
                        <text
                          x="65"
                          y="65"
                          fontSize="26px"
                          fontWeight="700"
                          fill="#7F77DD"
                          textAnchor="middle"
                          dominantBaseline="middle"
                        >
                          {leetcodeData.totalSolved}
                        </text>
                        <text
                          x="65"
                          y="65"
                          dy="18"
                          fontSize="11px"
                          fill="#9999B0"
                          textAnchor="middle"
                        >
                          Solved
                        </text>
                      </g>
                    </svg>
                  </div>
                );
              })()}

              {/* Difficulty Rows */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', width: '100%', marginTop: '10px' }}>
                {/* Easy */}
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '4px' }}>
                    <span style={{ color: '#1D9E75', fontWeight: 500 }}>Easy</span>
                    <span style={{ color: '#9999B0' }}>{leetcodeData.easy.solved} / {leetcodeData.easy.total}</span>
                  </div>
                  <div style={{ height: '6px', borderRadius: '3px', background: '#1a1a24', width: '100%', overflow: 'hidden' }}>
                    <div style={{ height: '6px', borderRadius: '3px', backgroundColor: '#1D9E75', width: `${(leetcodeData.easy.solved / leetcodeData.easy.total) * 100}%` }}></div>
                  </div>
                </div>

                {/* Medium */}
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '4px' }}>
                    <span style={{ color: '#7F77DD', fontWeight: 500 }}>Medium</span>
                    <span style={{ color: '#9999B0' }}>{leetcodeData.medium.solved} / {leetcodeData.medium.total}</span>
                  </div>
                  <div style={{ height: '6px', borderRadius: '3px', background: '#1a1a24', width: '100%', overflow: 'hidden' }}>
                    <div style={{ height: '6px', borderRadius: '3px', backgroundColor: '#7F77DD', width: `${(leetcodeData.medium.solved / leetcodeData.medium.total) * 100}%` }}></div>
                  </div>
                </div>

                {/* Hard */}
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '4px' }}>
                    <span style={{ color: '#f85149', fontWeight: 500 }}>Hard</span>
                    <span style={{ color: '#9999B0' }}>{leetcodeData.hard.solved} / {leetcodeData.hard.total}</span>
                  </div>
                  <div style={{ height: '6px', borderRadius: '3px', background: '#1a1a24', width: '100%', overflow: 'hidden' }}>
                    <div style={{ height: '6px', borderRadius: '3px', backgroundColor: '#f85149', width: `${(leetcodeData.hard.solved / leetcodeData.hard.total) * 100}%` }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Languages */}
          <div className="languages-card">
            <p className="card-header-tag">{"// languages used"}</p>
            <div className="languages-list">
              {languages.map((lang) => (
                <LanguageBar key={lang.name} name={lang.name} percent={lang.percent} repos={lang.repos} />
              ))}
            </div>
          </div>

          {/* Skills */}
          <div className="skills-card">
            <p className="card-header-tag">{"// core skills"}</p>
            <div className="skills-list">
              {skills.map((skill, index) => (
                <SkillBar key={skill.name} name={skill.name} level={skill.level} index={index} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}