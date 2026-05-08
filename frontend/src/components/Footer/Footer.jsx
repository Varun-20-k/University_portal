import React, { useState, useEffect } from 'react';

const Footer = () => {
  const[count, setCount] = useState(12458);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount(prev => prev + Math.floor(Math.random() * 3) + 1);
    }, 4000);
    return () => clearInterval(interval);
  },[]);

  return (
    <footer className="bg-navy relative overflow-hidden">
      
      {/* Background Texture */}
      <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)', backgroundSize: '50px 50px' }}></div>

      {/* TOP CTA Block */}
      <div className="text-center py-16 px-8 relative z-10">
        <div className="font-mono text-[0.65rem] uppercase tracking-[0.15em] text-white/40 mb-4">
          Ready to join?
        </div>
        <h2 className="font-serif text-[clamp(2rem,4vw,3.5rem)] font-bold text-white leading-tight mb-8">
          Begin your journey towards <em className="italic text-gold">excellence.</em>
        </h2>
        <a href="#admissions" className="btn-fill inline-block px-12 py-4 border border-gold text-gold font-mono text-[0.8rem] uppercase tracking-[0.12em] rounded-sm hover:text-navy transition-colors" style={{ '--fill-color': 'var(--gold)' }}>
          Apply Online
        </a>
      </div>

      {/* MIDDLE 4-Col Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr] gap-12 py-12 px-8 border-t border-white/10 relative z-10">
        
        <div>
          <div className="font-serif text-xl font-bold text-white mb-1">University of Mysore</div>
          <div className="font-mono text-[0.62rem] uppercase tracking-wider text-white/35 mb-4">Est. 1916</div>
          <p className="text-sm text-white/45 leading-relaxed max-w-xs">
            Nurturing intellectual growth, research, and innovation in the cultural capital of Karnataka.
          </p>
        </div>

        <div>
          <div className="font-mono text-[0.62rem] uppercase tracking-wider text-gold mb-4">Quick Links</div>
          <ul className="list-none flex flex-col gap-2 p-0 m-0">
            <li><a href="#home" className="text-sm text-white/50 hover:text-white transition-colors no-underline">Home</a></li>
            <li><a href="#about" className="text-sm text-white/50 hover:text-white transition-colors no-underline">About</a></li>
            <li><a href="#programmes" className="text-sm text-white/50 hover:text-white transition-colors no-underline">Programmes</a></li>
            <li><a href="#campus" className="text-sm text-white/50 hover:text-white transition-colors no-underline">Campus Life</a></li>
            <li><a href="#admissions" className="text-sm text-white/50 hover:text-white transition-colors no-underline">Admissions</a></li>
          </ul>
        </div>

        <div>
          <div className="font-mono text-[0.62rem] uppercase tracking-wider text-gold mb-4">Academics</div>
          <ul className="list-none flex flex-col gap-2 p-0 m-0">
            <li><a href="#" className="text-sm text-white/50 hover:text-white transition-colors no-underline">Faculties</a></li>
            <li><a href="#" className="text-sm text-white/50 hover:text-white transition-colors no-underline">Affiliated Colleges</a></li>
            <li><a href="#" className="text-sm text-white/50 hover:text-white transition-colors no-underline">Research Centres</a></li>
            <li><a href="#" className="text-sm text-white/50 hover:text-white transition-colors no-underline">Examinations</a></li>
            <li><a href="#" className="text-sm text-white/50 hover:text-white transition-colors no-underline">Scholarships</a></li>
          </ul>
        </div>

        <div>
          <div className="font-mono text-[0.62rem] uppercase tracking-wider text-gold mb-4">Connect</div>
          <ul className="list-none flex flex-col gap-2 p-0 m-0">
            <li><a href="#" className="text-sm text-white/50 hover:text-white transition-colors no-underline">NIRF Rankings</a></li>
            <li><a href="#" className="text-sm text-white/50 hover:text-white transition-colors no-underline">NAAC Report</a></li>
            <li><a href="#" className="text-sm text-white/50 hover:text-white transition-colors no-underline">Alumni Network</a></li>
            <li><a href="#" className="text-sm text-white/50 hover:text-white transition-colors no-underline">Press & Media</a></li>
            <li><a href="#contact" className="text-sm text-white/50 hover:text-white transition-colors no-underline">Contact Us</a></li>
          </ul>
        </div>

      </div>

      {/* BOTTOM Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 px-8 py-5 border-t border-white/[0.08] relative z-10 max-w-7xl mx-auto">
        <div className="font-mono text-[0.62rem] text-white/25 tracking-wider text-center sm:text-left">
          © 2025 University of Mysore. All Rights Reserved. | Privacy | RTI
        </div>
        <div className="flex items-center gap-2 bg-white/[0.03] px-3 py-1.5 rounded-sm border border-white/[0.05]">
          <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></div>
          <div className="font-mono text-[0.62rem] text-white/35 tracking-wider">
            {count.toLocaleString('en-IN')} students enrolled
          </div>
        </div>
      </div>

    </footer>
  );
};

export default Footer;