import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, ArrowUpRight } from 'lucide-react';
import { useAdmin } from '../contexts/AdminContext';
import './Contact.css';

// HloMail contact API config
const HLOMAIL_URL = 'https://api.hlomail.in/v1/contact-mail';
// Env-driven proxy (preferred to avoid exposing API key)
const CONTACT_PROXY_URL =
  ((import.meta as any)?.env?.VITE_CONTACT_PROXY_URL as string | undefined) ||
  (process.env.REACT_APP_CONTACT_PROXY_URL as string | undefined);
// Support both Vite (VITE_*) and CRA (REACT_APP_*) env keys without TS errors
const HLOMAIL_CONTACT_KEY =
  ((import.meta as any)?.env?.VITE_HLOMAIL_CONTACT_KEY as string | undefined) ||
  (process.env.REACT_APP_HLOMAIL_CONTACT_KEY as string | undefined) ||
  '';
// Temporary direct-send recipient (fallback to portfolio email at runtime)
const CONTACT_RECIPIENT_EMAIL =
  ((import.meta as any)?.env?.VITE_CONTACT_RECIPIENT_EMAIL as string | undefined) ||
  (process.env.REACT_APP_CONTACT_RECIPIENT_EMAIL as string | undefined);

const Contact: React.FC = () => {
  const { portfolioData } = useAdmin();
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

    try {
      // Guard: ensure either proxy URL or API key is present
      if (!CONTACT_PROXY_URL && !HLOMAIL_CONTACT_KEY) {
        alert('Contact service not configured: set VITE_CONTACT_PROXY_URL (preferred) or VITE_HLOMAIL_CONTACT_KEY.');
        return;
      }

      const finalMessage = formData.subject
        ? `Subject: ${formData.subject}\n\n${formData.message}`
        : formData.message;

      // Open a tab up-front to avoid popup blockers if the API returns HTML
      let receiptWin: Window | null = null;
      try { receiptWin = window.open('', '_blank'); } catch { /* ignore */ }

      if (CONTACT_PROXY_URL) {
        const res = await fetch(CONTACT_PROXY_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            message: finalMessage,
            subject: formData.subject,
            template: '5',
          }),
        });
        const ct = res.headers.get('content-type') || '';
        if (!res.ok) {
          const body = await res.text();
          throw new Error(`Proxy error ${res.status}: ${body}`);
        }
        if (ct.includes('text/html')) {
          const html = await res.text();
          if (receiptWin) { receiptWin.document.write(html); receiptWin.document.close(); }
        } else {
          const data = await res.json().catch(async () => ({ message: await res.text() }));
          if (!(data.valid || data.success)) throw new Error(data.message || 'Failed');
          alert(data.message || 'Message sent successfully!');
          if (receiptWin) receiptWin.close();
        }
      } else {
        // Temporary direct-send: call HloMail with JSON per docs (api_key, recipient_email, subject, body)
        const recipient = CONTACT_RECIPIENT_EMAIL || portfolioData.contactEmail || 'franzkingstein@outlook.com';
        const subject = `Portfolio contact: ${formData.subject} — ${formData.name} <${formData.email}>`;
        const body = formData.message;
        const res = await fetch(HLOMAIL_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            api_key: HLOMAIL_CONTACT_KEY,
            recipient_email: recipient,
            subject,
            body,
          }),
        });
        const ct = res.headers.get('content-type') || '';
        if (!res.ok) {
          const text = await res.text();
          throw new Error(`HloMail error ${res.status}: ${text}`);
        }
        if (ct.includes('application/json')) {
          const data = await res.json();
          if (!(data.valid || data.success)) throw new Error(data.message || 'Failed');
          alert(data.message || 'Message sent successfully!');
          if (receiptWin) receiptWin.close();
        } else if (ct.includes('text/html')) {
          const html = await res.text();
          if (receiptWin) { receiptWin.document.write(html); receiptWin.document.close(); }
        } else {
          // Fallback: treat as text
          const text = await res.text();
          alert(text || 'Message sent successfully!');
          if (receiptWin) receiptWin.close();
        }
      }

      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (err: any) {
      console.error('Contact submit error:', err);
      alert(err?.message || 'Failed to send message. Please try again.');
    } finally {
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
            <form className="contact-form" onSubmit={handleSubmit}>
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
