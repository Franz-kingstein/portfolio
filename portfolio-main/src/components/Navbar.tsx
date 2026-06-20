import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import './Navbar.css';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeLink, setActiveLink] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Scrollspy to detect active section
  useEffect(() => {
    const sections = ['home', 'about', 'projects', 'features', 'skills', 'contact'];
    let observer: IntersectionObserver;

    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveLink(entry.target.id);
        }
      });
    };

    // Use a small delay to guarantee all DOM elements are mounted in React
    const timer = setTimeout(() => {
      observer = new IntersectionObserver(handleIntersection, {
        root: null,
        threshold: 0,
        rootMargin: '-30% 0px -30% 0px',
      });

      sections.forEach((id) => {
        const el = document.getElementById(id);
        if (el) observer.observe(el);
      });
    }, 200);

    return () => {
      clearTimeout(timer);
      if (observer) observer.disconnect();
    };
  }, []);

  const navItems = [
    { path: 'home', label: 'Home' },
    { path: 'about', label: 'About' },
    { path: 'projects', label: 'Projects' },
    { path: 'features', label: 'Stats' },
    { path: 'skills', label: 'Skills' },
    { path: 'contact', label: 'Contact' }
  ];

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsOpen(false);
  };

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="navbar-pill">
        {/* Left Side: Monogram */}
        <a 
          href="#home" 
          className="nav-monogram" 
          onClick={(e) => { 
            e.preventDefault(); 
            scrollToSection('home'); 
            setActiveLink('home');
          }}
        >
          FK
        </a>

        {/* Center: Desktop Links */}
        <div className="nav-links-desktop">
          {navItems.map((item) => (
            <a
              key={item.path}
              href={`#${item.path}`}
              className={`nav-link ${activeLink === item.path ? 'active' : ''}`}
              onClick={(e) => {
                e.preventDefault();
                scrollToSection(item.path);
                setActiveLink(item.path);
              }}
            >
              {item.label}
            </a>
          ))}
        </div>



        {/* Mobile Toggle (Hamburger) */}
        <button
          className="nav-toggle-mobile"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle navigation"
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="nav-dropdown-mobile">
          {navItems.map((item) => (
            <a
              key={item.path}
              href={`#${item.path}`}
              className={`nav-dropdown-link ${activeLink === item.path ? 'active' : ''}`}
              onClick={(e) => {
                e.preventDefault();
                scrollToSection(item.path);
                setActiveLink(item.path);
              }}
            >
              {item.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
