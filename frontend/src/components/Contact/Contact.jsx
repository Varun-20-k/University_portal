import React, { useState, useRef } from 'react';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import { useScrollReveal } from '../../hooks/useScrollReveal';

const Contact = () => {
  const infoRef = useRef(null);
  const formRef = useRef(null); // Added new ref
  
  useScrollReveal(infoRef, { stagger: true });
  useScrollReveal(formRef); // Called hook at the top level

  const [formData, setFormData] = useState({ name: '', email: '', type: 'General', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="contact" data-section="contact" className="bg-bg border-t border-silver px-8 lg:px-16 py-24">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-16 items-start">
        
        {/* Left Side: Info */}
        <div ref={infoRef} className="flex flex-col gap-6">
          <div className="font-mono text-[0.65rem] uppercase tracking-[0.15em] text-teal mb-3 flex items-center gap-1 reveal">
            <span className="text-gold">{"// "}</span> Get in touch
          </div>
          <h2 className="font-serif text-[clamp(2rem,3vw,2.8rem)] font-bold text-navy leading-[1.15] mb-4 reveal">
            We're here to help.
          </h2>

          <div className="flex gap-4 items-start reveal">
            <div className="w-9 h-9 bg-white border border-silver rounded flex items-center justify-center flex-none shadow-sm">
              <MapPin size={16} className="text-teal" />
            </div>
            <div>
              <div className="font-mono text-[0.62rem] uppercase tracking-wider text-teal mb-0.5">Address</div>
              <div className="text-sm text-navy leading-relaxed">
                Crawford Hall, University of Mysore,<br />
                Mysuru – 570 005, Karnataka
              </div>
            </div>
          </div>

          <div className="flex gap-4 items-start reveal">
            <div className="w-9 h-9 bg-white border border-silver rounded flex items-center justify-center flex-none shadow-sm">
              <Phone size={16} className="text-teal" />
            </div>
            <div>
              <div className="font-mono text-[0.62rem] uppercase tracking-wider text-teal mb-0.5">Phone</div>
              <div className="text-sm text-navy leading-relaxed">
                +91-821-2419601 / 2419422
              </div>
            </div>
          </div>

          <div className="flex gap-4 items-start reveal">
            <div className="w-9 h-9 bg-white border border-silver rounded flex items-center justify-center flex-none shadow-sm">
              <Mail size={16} className="text-teal" />
            </div>
            <div>
              <div className="font-mono text-[0.62rem] uppercase tracking-wider text-teal mb-0.5">Email</div>
              <div className="text-sm text-navy leading-relaxed">
                registrar@uni-mysore.ac.in<br />
                admissions@uni-mysore.ac.in
              </div>
            </div>
          </div>

          <div className="flex gap-4 items-start reveal">
            <div className="w-9 h-9 bg-white border border-silver rounded flex items-center justify-center flex-none shadow-sm">
              <Clock size={16} className="text-teal" />
            </div>
            <div>
              <div className="font-mono text-[0.62rem] uppercase tracking-wider text-teal mb-0.5">Hours</div>
              <div className="text-sm text-navy leading-relaxed">
                Mon–Sat: 9:30 AM – 5:00 PM IST<br />
                <span className="text-muted">Closed on University holidays</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Form */}
        <div ref={formRef} className="bg-white border border-silver rounded-lg p-8 shadow-xl shadow-navy/5 reveal">
          <h3 className="font-serif text-xl font-bold text-navy mb-6">Enquiry Form</h3>
          
          {submitted ? (
            <div className="border border-teal bg-teal/5 rounded p-4 text-sm text-teal font-mono text-center">
              Thank you! We'll be in touch within 2 working days.
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div>
                <label className="block font-mono text-[0.62rem] uppercase tracking-wider text-muted mb-1.5">Full Name</label>
                <input 
                  type="text" required
                  value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full px-4 py-2.5 border border-silver rounded bg-bg font-sans text-sm text-navy outline-none focus:border-teal transition-colors duration-200"
                />
              </div>
              <div>
                <label className="block font-mono text-[0.62rem] uppercase tracking-wider text-muted mb-1.5">Email Address</label>
                <input 
                  type="email" required
                  value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full px-4 py-2.5 border border-silver rounded bg-bg font-sans text-sm text-navy outline-none focus:border-teal transition-colors duration-200"
                />
              </div>
              <div>
                <label className="block font-mono text-[0.62rem] uppercase tracking-wider text-muted mb-1.5">Enquiry Type</label>
                <select 
                  value={formData.type} onChange={(e) => setFormData({...formData, type: e.target.value})}
                  className="w-full px-4 py-2.5 border border-silver rounded bg-bg font-sans text-sm text-navy outline-none focus:border-teal transition-colors duration-200"
                >
                  <option>Admissions</option>
                  <option>Academics</option>
                  <option>Alumni</option>
                  <option>General Enquiry</option>
                </select>
              </div>
              <div>
                <label className="block font-mono text-[0.62rem] uppercase tracking-wider text-muted mb-1.5">Message</label>
                <textarea 
                  required rows={4}
                  value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})}
                  className="w-full px-4 py-2.5 border border-silver rounded bg-bg font-sans text-sm text-navy outline-none focus:border-teal transition-colors duration-200 resize-none"
                ></textarea>
              </div>
              <button type="submit" className="btn-fill w-full py-3.5 mt-2 bg-navy text-white font-mono text-[0.72rem] uppercase tracking-widest rounded-sm transition-colors hover:text-white" style={{ '--fill-color': 'var(--teal)' }}>
                Send Message
              </button>
            </form>
          )}
        </div>

      </div>
    </section>
  );
};

export default Contact;