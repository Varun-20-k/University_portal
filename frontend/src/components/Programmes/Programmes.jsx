import React, { useState, useRef, useEffect } from 'react';
import { programmes } from '../../data/programmes';
import ProgrammeCard from './ProgrammeCard';
import { useScrollReveal } from '../../hooks/useScrollReveal';

const Programmes = () => {
  const[activeFilter, setActiveFilter] = useState("all");
  const [displayProgrammes, setDisplayProgrammes] = useState(programmes);
  const [isAnimating, setIsAnimating] = useState(false);
  
  const gridRef = useRef(null);
  useScrollReveal(gridRef, { stagger: true });

  const handleFilter = (filter) => {
    if (filter === activeFilter) return;
    setIsAnimating(true);
    setTimeout(() => {
      setActiveFilter(filter);
      setDisplayProgrammes(programmes.filter(p => filter === "all" || p.level === filter));
      setIsAnimating(false);
    }, 300);
  };

  const filters =[
    { id: "all", label: "All Programmes" },
    { id: "ug", label: "Undergraduate" },
    { id: "pg", label: "Postgraduate" },
    { id: "phd", label: "Doctoral (Ph.D)" }
  ];

  return (
    <section id="programmes" data-section="programmes" className="px-8 lg:px-16 py-24 bg-bg">
      <div className="max-w-7xl mx-auto">
        
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
          <div>
            <div className="font-mono text-[0.65rem] uppercase tracking-[0.15em] text-teal mb-3 flex items-center gap-1">
              <span className="text-gold">{"// "}</span> Academics
            </div>
            <h2 className="font-serif text-[clamp(2rem,3.5vw,3.2rem)] font-bold text-navy leading-[1.15]">
              Explore our programmes
            </h2>
          </div>
          
          <div className="flex gap-2 flex-wrap">
            {filters.map((f) => (
              <button
                key={f.id}
                onClick={() => handleFilter(f.id)}
                className={`font-mono text-[0.65rem] uppercase tracking-wider px-4 py-1.5 border rounded-sm transition-all duration-200 ${
                  activeFilter === f.id 
                    ? 'bg-navy text-white border-navy' 
                    : 'bg-transparent text-muted border-silver hover:bg-silver/30 hover:text-navy'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        <div 
          ref={gridRef} 
          className={`grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 transition-opacity duration-300 ${isAnimating ? 'opacity-0' : 'opacity-100'}`}
        >
          {displayProgrammes.map((prog, idx) => (
            <ProgrammeCard key={`${prog.id}-${activeFilter}`} programme={prog} />
          ))}
        </div>

      </div>
    </section>
  );
};

export default Programmes;