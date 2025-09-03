import React from 'react';

const LoadingSpinner: React.FC = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-prestige-light-gray">
            <div className="w-16 h-16 border-4 border-prestige-teal border-dashed rounded-full animate-spin"></div>
             <div className="flex items-center space-x-2 mt-6">
              <div className="w-10 h-10 bg-prestige-teal flex items-center justify-center font-bold text-prestige-charcoal text-2xl relative">
                <span className="z-10">P</span>
                <div className="absolute left-0 top-0 h-full w-1/3 bg-white opacity-40"></div>
              </div>
              <div>
                <h1 className="text-prestige-charcoal text-xl font-bold tracking-tighter leading-tight">PRESTIGE</h1>
                <p className="text-prestige-teal text-xs tracking-widest leading-tight">JOINERY & BUILDING</p>
              </div>
            </div>
            <p className="text-prestige-text font-semibold mt-4">Loading Dashboard...</p>
        </div>
    );
};

export default LoadingSpinner;
