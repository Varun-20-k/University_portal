import React, { useRef } from 'react';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import { timeline } from '../../data/timeline';

const About = () => {
  const timelineRef = useRef(null);
  const statsRef = useRef(null); // Added new ref
  
  useScrollReveal(timelineRef, { stagger: true });
  useScrollReveal(statsRef); // Called hook at the top level

  return (
    <section id="about" data-section="about" className="bg-white border-y border-silver px-8 lg:px-16 py-24">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        
        {/* Left Side */}
        <div>
          <div className="font-mono text-[0.65rem] uppercase tracking-[0.15em] text-teal mb-3 flex items-center gap-1">
            <span className="text-gold">{"// "}</span> Heritage & Vision
          </div>
          <h2 className="font-serif text-[clamp(2rem,3.5vw,3.2rem)] font-bold text-navy leading-[1.15] mb-4">
            Shaping intellects for over a century.
          </h2>
          <div className="w-14 h-0.5 bg-gold mb-8"></div>
          
          <blockquote className="font-serif text-[1.5rem] text-navy leading-relaxed mb-8 border-l-2 border-silver pl-6 italic">
            "A university is born from <strong className="text-gold font-bold">inquiry</strong>, sustained by dedication, and remembered for its <strong className="text-gold font-bold">legacies</strong>."
          </blockquote>

          <div ref={timelineRef} className="flex flex-col">
            {timeline.map((item, index) => (
              <div key={index} className="flex gap-5 py-4 border-b border-silver slide-left">
                <div className="font-mono text-[0.72rem] text-teal flex-none w-14 pt-0.5">{item.year}</div>
                <div className="text-sm text-navy leading-relaxed" dangerouslySetInnerHTML={{ __html: item.text }}></div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side - Visual Stats Block */}
        <div ref={statsRef} className="bg-bg border border-silver rounded-md overflow-hidden relative aspect-[4/3] flex flex-col shadow-lg shadow-navy/5 reveal">
          <div className="font-mono text-[0.65rem] uppercase tracking-wider text-muted p-4 border-b border-silver/50 bg-white/40">
            Crawford Hall / Central Administration
          </div>
          
          <div className="flex-1 flex items-center justify-center p-8 bg-gradient-to-b from-transparent to-silver/20 relative">
            <svg viewBox="0 0 300 180" className="w-full max-w-[280px] h-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="20" y="150" width="260" height="10" fill="var(--navy)" />
              <rect x="30" y="140" width="240" height="10" fill="var(--navy)" />
              
              <rect x="50" y="80" width="15" height="60" fill="var(--navy)" />
              <rect x="90" y="80" width="15" height="60" fill="var(--navy)" />
              <rect x="195" y="80" width="15" height="60" fill="var(--navy)" />
              <rect x="235" y="80" width="15" height="60" fill="var(--navy)" />
              
              <rect x="115" y="70" width="70" height="70" fill="var(--navy)" />
              
              <rect x="135" y="90" width="30" height="40" rx="15" fill="var(--gold)" />
              <rect x="60" y="90" width="5" height="30" fill="var(--gold)" />
              <rect x="235" y="90" width="5" height="30" fill="var(--gold)" />
              
              <rect x="110" y="60" width="80" height="10" fill="var(--navy)" />
              
              <path d="M120 60 C 120 20, 180 20, 180 60 Z" fill="var(--navy)" />
              <path d="M145 20 L 155 20 L 150 10 Z" fill="var(--gold)" />
            </svg>
          </div>

          <div className="grid grid-cols-3 gap-px bg-silver mt-auto border-t border-silver">
            <div className="bg-bg p-4 text-center">
              <div className="font-serif text-2xl font-bold text-navy">87</div>
              <div className="font-mono text-[0.55rem] uppercase tracking-wider text-muted mt-1">Departments</div>
            </div>
            <div className="bg-bg p-4 text-center">
              <div className="font-serif text-2xl font-bold text-gold">762</div>
              <div className="font-mono text-[0.55rem] uppercase tracking-wider text-muted mt-1">Faculty</div>
            </div>
            <div className="bg-bg p-4 text-center">
              <div className="font-serif text-2xl font-bold text-teal">211</div>
              <div className="font-mono text-[0.55rem] uppercase tracking-wider text-muted mt-1">Colleges</div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default About;