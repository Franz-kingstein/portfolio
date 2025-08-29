import React, { useState } from 'react';
import { X, Save, Edit, Settings } from 'lucide-react';
import { useAdmin } from '../contexts/AdminContext';
import './AdminPanel.css';

const AdminPanel: React.FC = () => {
  const { isAdminOpen, toggleAdmin, portfolioData, updatePortfolioData } = useAdmin();
  const [formData, setFormData] = useState(portfolioData);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    if (name.startsWith('social.')) {
      const socialKey = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        socialLinks: {
          ...prev.socialLinks,
          [socialKey]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSave = () => {
    updatePortfolioData(formData);
    alert('Portfolio data updated successfully!');
  };

  const handleReset = () => {
    setFormData(portfolioData);
  };

  if (!isAdminOpen) return null;

  return (
    <div className="admin-overlay">
      <div className="admin-panel">
        <div className="admin-header">
          <div className="admin-title">
            <Settings size={24} />
            <h2>Content Editor</h2>
          </div>
          <button className="close-admin" onClick={toggleAdmin}>
            <X size={24} />
          </button>
        </div>
        
        <div className="admin-body">
          <div className="admin-section">
            <h3>
              <Edit size={20} />
              Hero Section
            </h3>
            <div className="form-group">
              <label>Hero Title</label>
              <input
                type="text"
                name="heroTitle"
                value={formData.heroTitle}
                onChange={handleChange}
                placeholder="Hero Title"
              />
            </div>
            <div className="form-group">
              <label>Hero Subtitle</label>
              <input
                type="text"
                name="heroSubtitle"
                value={formData.heroSubtitle}
                onChange={handleChange}
                placeholder="Hero Subtitle"
              />
            </div>
          </div>

          <div className="admin-section">
            <h3>
              <Edit size={20} />
              About Section
            </h3>
            <div className="form-group">
              <label>About Text</label>
              <textarea
                name="aboutText"
                value={formData.aboutText}
                onChange={handleChange}
                placeholder="About Text"
                rows={4}
              />
            </div>
          </div>

          <div className="admin-section">
            <h3>
              <Edit size={20} />
              Contact Information
            </h3>
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                name="contactEmail"
                value={formData.contactEmail}
                onChange={handleChange}
                placeholder="Email"
              />
            </div>
            <div className="form-group">
              <label>Phone</label>
              <input
                type="text"
                name="contactPhone"
                value={formData.contactPhone}
                onChange={handleChange}
                placeholder="Phone"
              />
            </div>
            <div className="form-group">
              <label>Location</label>
              <input
                type="text"
                name="contactLocation"
                value={formData.contactLocation}
                onChange={handleChange}
                placeholder="Location"
              />
            </div>
          </div>

          <div className="admin-section">
            <h3>
              <Edit size={20} />
              Social Links
            </h3>
            <div className="form-group">
              <label>GitHub</label>
              <input
                type="url"
                name="social.github"
                value={formData.socialLinks.github}
                onChange={handleChange}
                placeholder="GitHub URL"
              />
            </div>
            <div className="form-group">
              <label>LinkedIn</label>
              <input
                type="url"
                name="social.linkedin"
                value={formData.socialLinks.linkedin}
                onChange={handleChange}
                placeholder="LinkedIn URL"
              />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                name="social.email"
                value={formData.socialLinks.email}
                onChange={handleChange}
                placeholder="Email"
              />
            </div>
            <div className="form-group">
              <label>Medium</label>
              <input
                type="url"
                name="social.medium"
                value={(formData as any).socialLinks.medium}
                onChange={handleChange}
                placeholder="Medium URL"
              />
            </div>
          </div>
        </div>

        <div className="admin-footer">
          <button className="btn btn-secondary" onClick={handleReset}>
            Reset
          </button>
          <button className="btn btn-primary" onClick={handleSave}>
            <Save size={20} />
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
