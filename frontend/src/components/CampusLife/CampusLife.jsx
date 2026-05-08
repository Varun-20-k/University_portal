import React, { useRef } from 'react';
import { campusCards } from '../../data/campusCards';
import { useScrollReveal } from '../../hooks/useScrollReveal';

const CampusLife = () => {
  const gridRef = useRef(null);
  const quoteRef = useRef(null); // Added new ref
  
  useScrollReveal(gridRef, { stagger: true });
  useScrollReveal(quoteRef); // Called hook at the top level

  return (
    <section id="campus" data-section="campus" className="bg-navy px-8 lg:px-16 py-24 overflow-hidden relative">
      <div className="max-w-7xl mx-auto">
        
        <div className="font-mono text-[0.65rem] uppercase tracking-[0.15em] text-gold mb-3 flex items-center gap-1">
          <span className="text-white/40">{"// "}</span> Life at Manasagangotri
        </div>
        <h2 className="font-serif text-[clamp(2rem,3.5vw,3.2rem)] font-bold text-white leading-[1.15] mb-6">
          Beyond the classroom.
        </h2>
        <div className="w-14 h-0.5 bg-gold mb-6"></div>
        <p className="text-white/60 text-sm max-w-lg leading-relaxed">
          Spread across a sprawling green sanctuary, our campus is a vibrant ecosystem of knowledge, culture, and athletic excellence.
        </p>

        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr] auto-rows-auto gap-4 mt-12">
          {campusCards.map((card, index) => (
            <div 
              key={card.id} 
              data-card
              className={`reveal bg-white/5 border border-white/10 rounded-md p-8 relative transition-all duration-300 hover:bg-white/10 hover:-translate-y-1 ${card.large ? 'lg:row-span-2' : ''}`}
            >
              <div className="absolute top-4 right-4 font-mono text-[0.58rem] uppercase tracking-wider text-gold border border-gold/30 px-2 py-0.5 rounded-sm">
                {card.tag}
              </div>
              <span className="text-3xl mb-4 block drop-shadow-md">{card.emoji}</span>
              <h3 className="font-serif text-lg font-bold text-white mb-2">{card.title}</h3>
              <p className="text-sm text-white/55 leading-relaxed">{card.description}</p>
            </div>
          ))}
        </div>

        <div ref={quoteRef} className="mt-12 pt-8 border-t border-white/10 flex gap-8 items-start reveal">
          <div className="font-serif text-[5rem] text-gold leading-[0.8] flex-none mt-2">"</div>
          <div>
            <blockquote className="font-serif text-[1.3rem] italic text-white/90 leading-relaxed mb-3">
              The university library and the sprawling campus were my sanctuary. The intellectual freedom I experienced at UOM laid the foundation for my entire career in public service.
            </blockquote>
            <div className="font-mono text-[0.65rem] uppercase tracking-wider text-gold">
              – Distinguished Alumni, Batch of 1982
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default CampusLife;