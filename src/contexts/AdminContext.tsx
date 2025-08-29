import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface AdminContextType {
  isAdminOpen: boolean;
  toggleAdmin: () => void;
  portfolioData: PortfolioData;
  updatePortfolioData: (data: Partial<PortfolioData>) => void;
}

interface PortfolioData {
  heroTitle: string;
  heroSubtitle: string;
  aboutText: string;
  contactEmail: string;
  contactPhone: string;
  contactLocation: string;
  socialLinks: {
    github: string;
    linkedin: string;
    email: string;
    medium: string;
  };
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
};

interface AdminProviderProps {
  children: ReactNode;
}

export const AdminProvider: React.FC<AdminProviderProps> = ({ children }) => {
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [portfolioData, setPortfolioData] = useState<PortfolioData>({
    heroTitle: "Hello, I'm Franz",
    heroSubtitle: "Innovating for a Better World with AI, Data, and Code: Empowering Human Progress.",
    aboutText: "I'm a passionate Data Scientist and AI Specialist with expertise in machine learning, frontend development, and data analysis. I love turning complex data into actionable insights and building intelligent systems that make a difference.",
    contactEmail: "franzkingstein@outlook.com",
    contactPhone: "+91 9092043143",
    contactLocation: "Coimbatore, India",
    socialLinks: {
      github: "https://github.com/Franz-kingstein",
      linkedin: "https://linkedin.com/in/franz-kingstein7/",
      email: "mailto:franzkingstein@outlook.com",
      medium: "https://medium.com/@franzkingstein"
    }
  });

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.ctrlKey && event.shiftKey && event.key === '#') {
        event.preventDefault();
        toggleAdmin();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  const toggleAdmin = () => {
    setIsAdminOpen(!isAdminOpen);
  };

  const updatePortfolioData = (data: Partial<PortfolioData>) => {
    setPortfolioData(prev => ({ ...prev, ...data }));
  };

  return (
    <AdminContext.Provider value={{ 
      isAdminOpen, 
      toggleAdmin, 
      portfolioData, 
      updatePortfolioData 
    }}>
      {children}
    </AdminContext.Provider>
  );
};
