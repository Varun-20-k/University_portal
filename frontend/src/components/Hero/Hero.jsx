import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const Hero = () => {
  const leftRef = useRef(null);
  const rightRef = useRef(null);
  const tealBarRef = useRef(null);
  const goldBarRef = useRef(null);

  useEffect(() => {
    gsap.from(leftRef.current.children, { opacity: 0, y: 24, stagger: 0.15, ease: "power2.out", delay: 0.2 });
    gsap.from(rightRef.current, { opacity: 0, y: 24, delay: 0.3, ease: "power2.out" });
    gsap.to(tealBarRef.current, { width: "74%", duration: 1.5, delay: 1, ease: "power2.out" });
    gsap.to(goldBarRef.current, { width: "58%", duration: 1.5, delay: 1.2, ease: "power2.out" });
  },[]);

  return (
    <section id="home" data-section="home" className="min-h-screen grid grid-cols-1 lg:grid-cols-2 items-center gap-12 px-8 lg:px-16 pt-32 pb-16 relative overflow-hidden">
      
      {/* Left Column */}
      <div ref={leftRef} className="flex flex-col items-start z-10 relative">
        <div className="inline-flex items-center gap-2 border border-teal text-teal font-mono text-[0.68rem] uppercase tracking-widest px-3 py-1.5 rounded-sm mb-6 bg-teal/5">
          <span className="w-1.5 h-1.5 bg-teal rounded-full animate-pulse"></span>
          Admissions 2025 Open
        </div>
        
        <h1 className="font-serif text-[clamp(2.8rem,5vw,5rem)] font-black leading-[1.05] text-navy mb-6">
          A Century of <em className="text-gold not-italic">Excellence</em>
        </h1>
        
        <p className="text-muted text-[1.05rem] leading-relaxed max-w-md mb-10">
          Join Karnataka’s first university. Fostering research, innovation, and leadership since 1916 on our heritage campus.
        </p>
        
        <div className="flex gap-4 items-center">
          <a href="#programmes" className="btn-fill bg-navy text-white font-mono text-[0.75rem] uppercase tracking-widest px-8 py-3.5 rounded-sm hover:text-navy" style={{ '--fill-color': 'var(--gold)' }}>
            Explore Programmes
          </a>
          <a href="#campus" className="font-mono text-[0.75rem] uppercase tracking-widest text-navy border-b border-navy pb-0.5 hover:text-gold hover:border-gold transition-colors">
            Campus Tour
          </a>
        </div>

        <div className="flex gap-10 mt-12 pt-8 border-t border-silver w-full max-w-md">
          <div>
            <div className="font-serif text-[2rem] font-bold text-navy leading-none">
              108<span className="text-gold">yrs</span>
            </div>
            <div className="font-mono text-[0.62rem] uppercase tracking-widest text-muted mt-1">Legacy</div>
          </div>
          <div>
            <div className="font-serif text-[2rem] font-bold text-navy leading-none">
              12<span className="text-gold">k+</span>
            </div>
            <div className="font-mono text-[0.62rem] uppercase tracking-widest text-muted mt-1">Students</div>
          </div>
          <div>
            <div className="font-serif text-[2rem] font-bold text-navy leading-none">
              87
            </div>
            <div className="font-mono text-[0.62rem] uppercase tracking-widest text-muted mt-1">Departments</div>
          </div>
        </div>
      </div>

      {/* Right Column - Dashboard Card */}
      <div className="relative hidden lg:block z-10 w-full flex justify-end">
        <div ref={rightRef} className="w-[480px] bg-white border border-silver rounded-lg overflow-hidden shadow-2xl shadow-navy/10 transform perspective-[800px] rotateY-[-4deg] rotateX-[2deg] hover:rotate-y-0 hover:rotate-x-0 transition-transform duration-500 hover:shadow-navy/20" style={{ transform: "perspective(800px) rotateY(-4deg) rotateX(2deg)" }}>
          
          <div className="bg-navy px-6 py-3 flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-[#FF6B6B]"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-[#FFD93D]"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-[#6BCB77]"></div>
            <div className="font-mono text-[0.7rem] text-white/40 ml-auto">live_portal_v2.0</div>
          </div>

          <div className="px-6 py-5">
            {/* Rows */}
            <div className="flex items-center gap-2 py-2.5 border-b border-silver font-mono text-[0.72rem]">
              <span className="text-muted w-24">{"//"} PG</span>
              <span className="text-navy font-semibold">M.Sc. Data Science</span>
              <span className="ml-auto text-[0.6rem] uppercase tracking-wider px-2 py-0.5 rounded-sm bg-green-100 text-green-700">Open</span>
            </div>
            <div className="flex items-center gap-2 py-2.5 border-b border-silver font-mono text-[0.72rem]">
              <span className="text-muted w-24">{"//"} UG</span>
              <span className="text-navy font-semibold">B.A. LLB</span>
              <span className="ml-auto text-[0.6rem] uppercase tracking-wider px-2 py-0.5 rounded-sm bg-green-100 text-green-700">Open</span>
            </div>
            <div className="flex items-center gap-2 py-2.5 border-b border-silver font-mono text-[0.72rem]">
              <span className="text-muted w-24">{"//"} PHD</span>
              <span className="text-navy font-semibold">Biotechnology</span>
              <span className="ml-auto text-[0.6rem] uppercase tracking-wider px-2 py-0.5 rounded-sm bg-yellow-100 text-yellow-700">Closing Soon</span>
            </div>
            <div className="flex items-center gap-2 py-2.5 border-b border-silver font-mono text-[0.72rem]">
              <span className="text-muted w-24">{"//"} PG</span>
              <span className="text-navy font-semibold">MBA Core</span>
              <span className="ml-auto text-[0.6rem] uppercase tracking-wider px-2 py-0.5 rounded-sm bg-red-100 text-red-700">Closed</span>
            </div>
            
            {/* Progress Bars */}
            <div className="mt-6 flex flex-col gap-4">
              <div>
                <div className="flex justify-between font-mono text-[0.65rem] text-muted mb-1.5">
                  <span>Application Volume (PG)</span>
                  <span>74% Capacity</span>
                </div>
                <div className="h-1 bg-silver rounded-full overflow-hidden">
                  <div ref={tealBarRef} className="h-full bg-teal rounded-full w-0"></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between font-mono text-[0.65rem] text-muted mb-1.5">
                  <span>Application Volume (UG)</span>
                  <span>58% Capacity</span>
                </div>
                <div className="h-1 bg-silver rounded-full overflow-hidden">
                  <div ref={goldBarRef} className="h-full bg-gold rounded-full w-0"></div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;