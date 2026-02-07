import React, { useState, useRef } from 'react';
import { Mail, Phone, MapPin, Send, ArrowUpRight } from 'lucide-react';
import emailjs from '@emailjs/browser';
import { useAdmin } from '../contexts/AdminContext';
import './Contact.css';

// EmailJS config — set these in your Render environment variables
const EMAILJS_SERVICE_ID = process.env.REACT_APP_EMAILJS_SERVICE_ID || '';
const EMAILJS_TEMPLATE_ID = process.env.REACT_APP_EMAILJS_TEMPLATE_ID || '';
const EMAILJS_PUBLIC_KEY = process.env.REACT_APP_EMAILJS_PUBLIC_KEY || '';

const Contact: React.FC = () => {
  const { portfolioData } = useAdmin();
  const formRef = useRef<HTMLFormElement>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // If EmailJS is configured, use it
    if (EMAILJS_SERVICE_ID && EMAILJS_TEMPLATE_ID && EMAILJS_PUBLIC_KEY) {
      try {
        await emailjs.sendForm(
          EMAILJS_SERVICE_ID,
          EMAILJS_TEMPLATE_ID,
          formRef.current!,
          EMAILJS_PUBLIC_KEY
        );
        alert('Message sent successfully! 🎉');
        setFormData({ name: '', email: '', subject: '', message: '' });
      } catch (err: any) {
        console.error('EmailJS error:', err);
        alert('Failed to send message. Please try again.');
      } finally {
        setIsSubmitting(false);
      }
    } else {
      // Fallback to mailto
      const recipient = portfolioData.contactEmail || 'franzkingstein@outlook.com';
      const subject = encodeURIComponent(`Portfolio Contact: ${formData.subject}`);
      const body = encodeURIComponent(
        `Name: ${formData.name}\nEmail: ${formData.email}\n\n${formData.message}`
      );
      window.location.href = `mailto:${recipient}?subject=${subject}&body=${body}`;
      setFormData({ name: '', email: '', subject: '', message: '' });
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="contact">
      <div className="container">
        {/* Large heading in cursive style - inspired by hareesh.web.app */}
        <div className="contact-header">
          <h2 className="contact-title cursive-heading">Get In Touch</h2>
          <p className="contact-subtitle">
            Let's collaborate on something amazing together
          </p>
        </div>

        <div className="contact-layout">
          {/* Left side - Contact info with clean cards */}
          <div className="contact-info">
            <div className="info-card">
              <div className="info-header">
                <Mail className="info-icon" />
                <span className="info-label">Email</span>
              </div>
              <a href={`mailto:${portfolioData.contactEmail}`} className="info-value">
                {portfolioData.contactEmail}
                <ArrowUpRight size={16} className="external-link" />
              </a>
            </div>

            <div className="info-card">
              <div className="info-header">
                <Phone className="info-icon" />
                <span className="info-label">Phone</span>
              </div>
              <a href={`tel:${portfolioData.contactPhone}`} className="info-value">
                {portfolioData.contactPhone}
                <ArrowUpRight size={16} className="external-link" />
              </a>
            </div>

            <div className="info-card">
              <div className="info-header">
                <MapPin className="info-icon" />
                <span className="info-label">Location</span>
              </div>
              <span className="info-value">
                {portfolioData.contactLocation}
              </span>
            </div>

            {/* Social links - clean minimal style */}
            <div className="social-section">
              <h3>Find me elsewhere</h3>
              <div className="social-grid">
                <a 
                  href={portfolioData.socialLinks.github} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="social-link"
                >
                  GitHub <ArrowUpRight size={14} />
                </a>
                <a 
                  href={portfolioData.socialLinks.linkedin} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="social-link"
                >
                  LinkedIn <ArrowUpRight size={14} />
                </a>
                <a 
                  href="https://medium.com/@franzkingstein" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="social-link"
                >
                  Medium <ArrowUpRight size={14} />
                </a>
              </div>
            </div>
          </div>

          {/* Right side - Clean contact form */}
          <div className="contact-form-container">
            <form className="contact-form" ref={formRef} onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-field">
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    required
                  />
                </div>
                <div className="form-field">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your@email.com"
                    required
                  />
                </div>
              </div>

              <div className="form-field">
                <label htmlFor="subject">Subject</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="What's this about?"
                  required
                />
              </div>

              <div className="form-field">
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell me about your project..."
                  rows={6}
                  required
                />
              </div>

              <button 
                type="submit" 
                className={`submit-btn ${isSubmitting ? 'submitting' : ''}`}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  'Sending...'
                ) : (
                  <>
                    Send message
                    <Send size={18} />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
