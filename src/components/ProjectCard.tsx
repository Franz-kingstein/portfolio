import React from 'react';

export interface ProjectItem {
  title: string;
  description: string;
  tags: string[];
  logoSrc?: string;
  links?: { icon: React.ReactNode; url: string }[]; // Add this for buttons
}

const ProjectCard: React.FC<ProjectItem> = ({ title, description, tags, logoSrc, links }) => {
  return (
    <div className="group relative w-80 h-[22rem] perspective">
      {/* Inner wrapper for flip animation */}
      <div className="relative w-full h-full transition-transform duration-500 transform-style-preserve-3d group-hover:rotate-y-180">
        
        {/* Front Side (with buttons) */}
        <div
          className="absolute w-full h-full backface-hidden rounded-2xl shadow-lg p-6"
          style={{ background: 'var(--bg-secondary)', color: 'var(--text-primary)' }}
        >
          <div
            className="mb-4 rounded-xl h-40 flex items-center justify-center"
            style={{ background: 'var(--bg-primary)' }}
          >
            {logoSrc ? (
              <img src={logoSrc} alt={`${title} logo`} className="h-full w-full object-contain p-4" />
            ) : (
              <div className="text-sm opacity-60">Logo</div>
            )}
          </div>
          <h3 className="text-xl font-semibold mb-2">{title}</h3>
          <p className="text-sm opacity-80 mb-4">{description}</p>
          <div className="flex flex-wrap gap-2 mb-4">
            {tags.map((tag, i) => (
              <span
                key={i}
                className="text-xs px-3 py-1 rounded-full border text-blue-400 bg-blue-500/10 border-blue-500/20"
              >
                {tag}
              </span>
            ))}
          </div>
          {/* Buttons go here */}
          {links && (
            <div className="flex gap-4 mt-2">
              {links.map((link, i) => (
                <a
                  key={i}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full bg-blue-500 text-white hover:bg-blue-600 transition"
                >
                  {link.icon}
                </a>
              ))}
            </div>
          )}
        </div>

        {/* Back Side (only title) */}
        <div
          className="absolute w-full h-full rounded-2xl flex items-center justify-center backface-hidden rotate-y-180"
          style={{ background: 'var(--bg-primary)', color: 'var(--text-primary)' }}
        >
          <h3 className="text-2xl font-bold">{title}</h3>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
