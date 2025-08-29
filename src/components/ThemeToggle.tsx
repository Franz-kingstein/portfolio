import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import './ThemeToggle.css';

interface ThemeToggleProps {
  variant?: 'floating' | 'inline';
  className?: string;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ variant = 'floating', className }) => {
  const { isDark, toggleTheme } = useTheme();

  const classes = [
    'theme-toggle',
    variant === 'floating' ? 'theme-toggle--floating' : 'theme-toggle--inline',
    className || ''
  ].join(' ').trim();

  return (
    <button
      className={classes}
      onClick={toggleTheme}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} theme`}
      title={`Switch to ${isDark ? 'light' : 'dark'} theme`}
    >
      {isDark ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  );
};

export default ThemeToggle;
