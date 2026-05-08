import React from 'react';

const ProgrammeCard = ({ programme }) => {
  return (
    <div data-card className="group bg-white border border-silver rounded-md p-7 relative overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-navy/10 reveal opacity-0">
      
      <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-silver group-hover:bg-gold transition-colors duration-300"></div>

      <div className="w-10 h-10 rounded flex items-center justify-center text-xl mb-4 bg-bg border border-silver/60 shadow-sm">
        {programme.emoji}
      </div>

      <div className="font-mono text-[0.62rem] uppercase tracking-[0.12em] text-teal mb-1">
        {programme.category}
      </div>
      
      <h3 className="font-serif text-[1.1rem] font-bold text-navy mb-2 leading-snug">
        {programme.name}
      </h3>
      
      <p className="text-sm text-muted leading-relaxed line-clamp-3 mb-2">
        {programme.description}
      </p>

      <div className="flex gap-6 items-center mt-4 pt-4 border-t border-silver font-mono text-[0.65rem] text-muted">
        <div>{programme.duration}</div>
        <div>{programme.seats}</div>
        <div className="ml-auto">
          <span className={`px-2 py-0.5 rounded-sm uppercase tracking-wider text-[0.6rem] ${
            programme.status === 'open' ? 'bg-green-100 text-green-700' :
            programme.status === 'soon' ? 'bg-yellow-100 text-yellow-700' :
            'bg-red-100 text-red-700'
          }`}>
            {programme.status === 'soon' ? 'Closing Soon' : programme.status}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProgrammeCard;