import React, { useRef } from 'react';
import { admissionSteps } from '../../data/admissionSteps';
import { useScrollReveal } from '../../hooks/useScrollReveal';

const Admissions = () => {
  const stepsRef = useRef(null);
  const infoRef = useRef(null); // Added new ref
  
  useScrollReveal(stepsRef, { stagger: true });
  useScrollReveal(infoRef); // Called hook at the top level

  return (
    <section id="admissions" data-section="admissions" className="bg-white border-t border-silver px-8 lg:px-16 py-24">
      <div className="max-w-7xl mx-auto">
        
        <div className="font-mono text-[0.65rem] uppercase tracking-[0.15em] text-teal mb-3 flex items-center gap-1">
          <span className="text-gold">{"// "}</span> Join Us
        </div>
        <h2 className="font-serif text-[clamp(2rem,3.5vw,3.2rem)] font-bold text-navy leading-[1.15]">
          Admissions 2025–26
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mt-12 items-start">
          
          {/* LEFT: Steps */}
          <div ref={stepsRef} className="flex flex-col">
            {admissionSteps.map((step, idx) => (
              <div key={idx} className="flex gap-6 py-6 border-b border-silver slide-left">
                <div className="font-mono text-[0.65rem] text-gold flex-none w-8 pt-0.5">{step.step}</div>
                <div>
                  <h3 className="font-serif text-base font-bold text-navy mb-1.5">{step.title}</h3>
                  <p className="text-sm text-muted leading-relaxed">{step.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* RIGHT: Info Boxes */}
          <div ref={infoRef} className="flex flex-col gap-6 reveal">
            
            <div className="bg-bg border border-silver rounded-md p-6 shadow-sm">
              <div className="font-mono text-[0.65rem] uppercase tracking-[0.1em] text-teal mb-4">Key Dates</div>
              
              <div className="flex justify-between items-center py-2.5 border-b border-silver">
                <span className="text-sm text-navy">Application Portal Opens</span>
                <span className="font-mono text-[0.6rem] uppercase tracking-wider px-2 py-0.5 rounded-sm bg-green-100 text-green-700">Apr 1, 2025</span>
              </div>
              <div className="flex justify-between items-center py-2.5 border-b border-silver">
                <span className="text-sm text-navy">UG Applications Close</span>
                <span className="font-mono text-[0.6rem] uppercase tracking-wider px-2 py-0.5 rounded-sm bg-yellow-100 text-yellow-700">Jun 15, 2025</span>
              </div>
              <div className="flex justify-between items-center py-2.5 border-b border-silver">
                <span className="text-sm text-navy">PG Applications Close</span>
                <span className="font-mono text-[0.6rem] uppercase tracking-wider px-2 py-0.5 rounded-sm bg-yellow-100 text-yellow-700">May 30, 2025</span>
              </div>
              <div className="flex justify-between items-center py-2.5 border-b border-silver">
                <span className="text-sm text-navy">Entrance Exams</span>
                <span className="font-mono text-[0.7rem] text-muted">Jul 2025</span>
              </div>
              <div className="flex justify-between items-center py-2.5 border-b border-silver">
                <span className="text-sm text-navy">Merit List (Round 1)</span>
                <span className="font-mono text-[0.7rem] text-muted">Aug 1, 2025</span>
              </div>
              <div className="flex justify-between items-center py-2.5">
                <span className="text-sm text-navy">Classes Commence</span>
                <span className="font-mono text-[0.7rem] text-muted">Sep 1, 2025</span>
              </div>
            </div>

            <div className="bg-bg border border-silver rounded-md p-6 shadow-sm">
              <div className="font-mono text-[0.65rem] uppercase tracking-[0.1em] text-teal mb-4">Eligibility Snapshot</div>
              
              <div className="flex justify-between items-center py-2.5 border-b border-silver">
                <span className="text-sm text-navy">UG Programmes</span>
                <span className="font-mono text-[0.7rem] text-muted">10+2 Pass, 45%+</span>
              </div>
              <div className="flex justify-between items-center py-2.5 border-b border-silver">
                <span className="text-sm text-navy">PG Programmes</span>
                <span className="font-mono text-[0.7rem] text-muted">Bachelor's, 50%+</span>
              </div>
              <div className="flex justify-between items-center py-2.5 border-b border-silver">
                <span className="text-sm text-navy">Ph.D.</span>
                <span className="font-mono text-[0.7rem] text-muted">Master's + UGC NET/JRF</span>
              </div>
              <div className="flex justify-between items-center py-2.5">
                <span className="text-sm text-navy">Reservation</span>
                <span className="font-mono text-[0.7rem] text-muted">As per Karnataka Govt.</span>
              </div>
            </div>

            <button className="btn-fill w-full py-3.5 bg-navy text-white text-center font-mono text-[0.72rem] uppercase tracking-widest rounded-sm hover:text-navy border border-navy transition-colors mt-2" style={{ '--fill-color': 'var(--gold)' }}>
              Start Application
            </button>

          </div>
        </div>
      </div>
    </section>
  );
};

export default Admissions;