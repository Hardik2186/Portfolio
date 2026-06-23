import { useState, useRef } from 'react';
import emailjs from 'emailjs-com';
import toast from 'react-hot-toast';
import useReveal from '../../hooks/useReveal';
import { personalInfo } from '../../utils/data';
import './Contact.css';

const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

const Contact = () => {
  const formRef = useRef(null);
  const titleRef = useReveal();
  const formRevRef = useReveal();

  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [focused, setFocused] = useState('');

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = 'Name is required';
    if (!form.email.trim()) errs.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(form.email)) errs.email = 'Invalid email format';
    if (!form.subject.trim()) errs.subject = 'Subject is required';
    if (!form.message.trim()) errs.message = 'Message is required';
    else if (form.message.length < 20) errs.message = 'At least 20 characters';
    return errs;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }

    setLoading(true);
    try {
      await emailjs.sendForm(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        formRef.current,
        EMAILJS_PUBLIC_KEY
      );
      toast.success('Message sent! I\'ll reply soon 🚀', {
        style: {
          background: 'var(--surface-2)',
          color: 'var(--text-primary)',
          border: '1px solid var(--border-accent)',
          fontFamily: 'DM Mono',
        },
      });
      setForm({ name: '', email: '', subject: '', message: '' });
    } catch {
      toast.error('Something went wrong. Try again!', {
        style: { background: '#1A1A25', color: '#F0F0FF', border: '1px solid rgba(255,80,80,0.3)' },
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="section contact-section" id="contact">
      <div className="container">
        <div ref={titleRef} className="reveal section-header">
          <p className="section-label">Contact</p>
          <h2 className="section-title">Let's <span>Connect</span></h2>
          <p className="contact-sub">Have a project in mind or just want to say hi? My inbox is always open.</p>
        </div>

        <div className="contact-grid">
          {/* Left: Info */}
          <div className="contact-info reveal" ref={useReveal()}>
            <div className="contact-info-card glass-card">
              <h3>Get in touch</h3>
              <p>I'm currently available for freelance work and full-time opportunities. If you have a project that needs some magic, let's talk!</p>

              <div className="contact-details">
                {[
                  {
                    icon: (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                        <polyline points="22,6 12,13 2,6"/>
                      </svg>
                    ),
                    label: 'Email',
                    value: personalInfo.email,
                    href: `mailto:${personalInfo.email}`,
                  },
                  {
                    icon: (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/>
                        <circle cx="12" cy="10" r="3"/>
                      </svg>
                    ),
                    label: 'Location',
                    value: personalInfo.location,
                    href: null,
                  },
                  {
                    icon: (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
                      </svg>
                    ),
                    label: 'GitHub',
                    value: '@Hardik2186',
                    href: personalInfo.github,
                  },
                ].map(item => (
                  <div key={item.label} className="contact-detail-item">
                    <div className="detail-icon">{item.icon}</div>
                    <div>
                      <p className="detail-label">{item.label}</p>
                      {item.href ? (
                        <a href={item.href} target="_blank" rel="noreferrer" className="detail-value link">{item.value}</a>
                      ) : (
                        <p className="detail-value">{item.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="availability-badge">
                <span className="avail-dot" />
                <span>Available for opportunities</span>
              </div>
            </div>
          </div>

          {/* Right: Form */}
          <div ref={formRevRef} className="reveal">
            <form ref={formRef} className="contact-form glass-card" onSubmit={handleSubmit} noValidate>
              <div className="form-row">
                <div className={`form-group ${focused === 'name' ? 'focused' : ''} ${errors.name ? 'error' : ''} ${form.name ? 'filled' : ''}`}>
                  <label htmlFor="name">Full Name</label>
                  <input
                    id="name" name="name" type="text"
                    value={form.name}
                    onChange={handleChange}
                    onFocus={() => setFocused('name')}
                    onBlur={() => setFocused('')}
                    placeholder="John Doe"
                  />
                  {errors.name && <span className="form-error">{errors.name}</span>}
                </div>

                <div className={`form-group ${focused === 'email' ? 'focused' : ''} ${errors.email ? 'error' : ''} ${form.email ? 'filled' : ''}`}>
                  <label htmlFor="email">Email Address</label>
                  <input
                    id="email" name="email" type="email"
                    value={form.email}
                    onChange={handleChange}
                    onFocus={() => setFocused('email')}
                    onBlur={() => setFocused('')}
                    placeholder="john@example.com"
                  />
                  {errors.email && <span className="form-error">{errors.email}</span>}
                </div>
              </div>

              <div className={`form-group ${focused === 'subject' ? 'focused' : ''} ${errors.subject ? 'error' : ''} ${form.subject ? 'filled' : ''}`}>
                <label htmlFor="subject">Subject</label>
                <input
                  id="subject" name="subject" type="text"
                  value={form.subject}
                  onChange={handleChange}
                  onFocus={() => setFocused('subject')}
                  onBlur={() => setFocused('')}
                  placeholder="Project Inquiry"
                />
                {errors.subject && <span className="form-error">{errors.subject}</span>}
              </div>

              <div className={`form-group ${focused === 'message' ? 'focused' : ''} ${errors.message ? 'error' : ''} ${form.message ? 'filled' : ''}`}>
                <label htmlFor="message">Message</label>
                <textarea
                  id="message" name="message" rows="5"
                  value={form.message}
                  onChange={handleChange}
                  onFocus={() => setFocused('message')}
                  onBlur={() => setFocused('')}
                  placeholder="Tell me about your project..."
                />
                <div className="char-count">{form.message.length} chars</div>
                {errors.message && <span className="form-error">{errors.message}</span>}
              </div>

              <button type="submit" className="btn-primary submit-btn" disabled={loading}>
                <span>{loading ? 'Sending...' : 'Send Message'}</span>
                {loading ? (
                  <div className="spinner" />
                ) : (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <line x1="22" y1="2" x2="11" y2="13"/>
                    <polygon points="22 2 15 22 11 13 2 9 22 2"/>
                  </svg>
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