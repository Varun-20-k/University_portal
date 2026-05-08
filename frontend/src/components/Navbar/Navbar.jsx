import React, { useState, useEffect } from 'react';
import { Menu } from 'lucide-react';
import { useActiveSection } from '../../hooks/useActiveSection';

const Navbar = () => {
  const[isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const activeSection = useActiveSection();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks =[
    { name: 'Home', href: '#home', id: 'home' },
    { name: 'About', href: '#about', id: 'about' },
    { name: 'Programmes', href: '#programmes', id: 'programmes' },
    { name: 'Campus Life', href: '#campus', id: 'campus' },
    { name: 'Admissions', href: '#admissions', id: 'admissions' },
    { name: 'Contact', href: '#contact', id: 'contact' },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 lg:px-16 py-5 backdrop-blur-md border-b border-silver transition-all duration-300 ${scrolled ? 'bg-bg/98 py-4' : 'bg-bg/90'}`}>
      
      {/* Logo */}
      <a href="#home" className="flex items-center gap-3">
        <div className="w-10 h-10 bg-navy rounded flex items-center justify-center">
          <svg viewBox="0 0 24 24" fill="var(--gold)" className="w-6 h-6">
            <polygon points="12 2 2 7 12 12 22 7 12 2" />
            <polygon points="2 12 12 17 22 12 22 10 12 15 2 10 2 12" />
            <polygon points="2 17 12 22 22 17 22 15 12 20 2 15 2 17" />
          </svg>
        </div>
        <div className="flex flex-col">
          <span className="font-serif text-lg font-bold text-navy leading-tight">University of Mysore</span>
          <span className="font-mono text-[0.6rem] uppercase tracking-widest text-muted">Est. 1916</span>
        </div>
      </a>

      {/* Desktop Links */}
      <div className="hidden md:flex items-center gap-1">
        {navLinks.map((link) => (
          <a
            key={link.id}
            href={link.href}
            className={`relative font-mono text-[0.72rem] uppercase tracking-wider px-4 py-2 nav-link ${activeSection === link.id ? 'text-gold active' : 'text-navy'}`}
          >
            {link.name}
          </a>
        ))}
      </div>

      {/* Apply Now Button */}
      <div className="hidden md:block">
        <a href="#admissions" className="btn-fill bg-navy text-white font-mono text-[0.72rem] uppercase tracking-widest px-5 py-2 rounded-sm hover:text-navy inline-block text-center" style={{ '--fill-color': 'var(--gold)' }}>
          Apply Now
        </a>
      </div>

      {/* Mobile Hamburger */}
      <button className="md:hidden text-navy" onClick={() => setIsOpen(!isOpen)}>
        <Menu size={24} />
      </button>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 bg-bg/98 border-b border-silver flex flex-col py-4 px-8 gap-2 md:hidden shadow-xl">
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className={`font-mono text-[0.72rem] uppercase tracking-wider py-2 border-b border-silver/50 last:border-0 ${activeSection === link.id ? 'text-gold' : 'text-navy'}`}
            >
              {link.name}
            </a>
          ))}
          <a href="#admissions" onClick={() => setIsOpen(false)} className="btn-fill mt-4 bg-navy text-white font-mono text-[0.72rem] uppercase tracking-widest px-5 py-3 rounded-sm text-center" style={{ '--fill-color': 'var(--gold)' }}>
            Apply Now
          </a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;