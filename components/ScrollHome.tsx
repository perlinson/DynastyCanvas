
import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { DYNASTIES } from '../data/history';
import { Dynasty } from '../types';

interface ScrollHomeProps {
  onSelectDynasty: (dynasty: Dynasty) => void;
}

const ScrollHome: React.FC<ScrollHomeProps> = ({ onSelectDynasty }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.pageX - (containerRef.current?.offsetLeft || 0));
    setScrollLeft(containerRef.current?.scrollLeft || 0);
  };

  const handleMouseUp = () => setIsDragging(false);
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - (containerRef.current?.offsetLeft || 0);
    const walk = (x - startX) * 2;
    if (containerRef.current) {
      containerRef.current.scrollLeft = scrollLeft - walk;
    }
  };

  return (
    <div className="h-screen w-full overflow-hidden bg-[#1A1A1A] flex items-center justify-center">
      {/* Decorative Outer Frame */}
      <div className="relative w-[95%] h-[80%] border-[20px] border-[#3E2723] shadow-inner overflow-hidden rounded-sm flex">
        
        {/* The Scroll Handle (Left) */}
        <div className="w-12 h-full bg-[#5D4037] flex flex-col justify-center items-center gap-1 z-20 shadow-xl border-r border-[#3E2723]">
          <div className="w-4 h-2/3 bg-[#3E2723] rounded-full"></div>
        </div>

        {/* Scroll Content */}
        <div 
          ref={containerRef}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onMouseMove={handleMouseMove}
          className="flex-1 overflow-x-auto scroll-smooth cursor-grab active:cursor-grabbing paper-bg relative flex items-center ink-edge"
        >
          {/* Abstract background elements */}
          <div className="absolute inset-0 opacity-10 pointer-events-none flex items-center justify-around overflow-hidden whitespace-nowrap">
             {Array.from({length: 20}).map((_, i) => (
                <span key={i} className="text-[20rem] font-calligraphy text-[#8B4513] select-none mx-20">史</span>
             ))}
          </div>

          <div className="flex items-center min-w-[4000px] px-[20vw] relative h-full">
            {/* The Connecting Timeline Line */}
            <div className="absolute h-1 bg-[#8B4513]/20 w-full top-1/2 left-0 -translate-y-1/2"></div>
            
            {DYNASTIES.map((dynasty, index) => (
              <div 
                key={dynasty.id} 
                className="relative flex flex-col items-center mx-24 group"
              >
                {/* Year display */}
                <span className="absolute -top-16 font-ancient text-[#8B4513] text-lg opacity-60">
                  {dynasty.timeRange.split('-')[0]}
                </span>

                {/* The Seal */}
                <motion.button
                  whileHover={{ scale: 1.15, rotate: 5 }}
                  whileTap={{ scale: 0.9, rotate: -5 }}
                  onClick={() => onSelectDynasty(dynasty)}
                  className="relative w-28 h-28 bg-[#B22222] text-[#F4EBD0] border-4 border-[#8B4513] shadow-lg flex items-center justify-center rounded-sm transition-shadow hover:shadow-[#B22222]/50"
                >
                  <div className="absolute inset-1 border border-[#F4EBD0]/30"></div>
                  <span className="font-calligraphy text-5xl select-none leading-none">
                    {dynasty.sealText}
                  </span>
                </motion.button>

                {/* Dynasty Name Label */}
                <motion.div 
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  className="absolute -bottom-16 whitespace-nowrap"
                >
                   <span className="font-calligraphy text-3xl text-[#3E2723]">{dynasty.name}</span>
                </motion.div>
                
                {/* Sub-label for time period */}
                <div className="absolute -bottom-24 font-ancient text-sm text-[#8B4513] opacity-0 group-hover:opacity-100 transition-opacity">
                   {dynasty.timeRange}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* The Scroll Handle (Right) */}
        <div className="w-12 h-full bg-[#5D4037] flex flex-col justify-center items-center gap-1 z-20 shadow-xl border-l border-[#3E2723]">
          <div className="w-4 h-2/3 bg-[#3E2723] rounded-full"></div>
        </div>

      </div>

      {/* Floating UI Hints */}
      <div className="fixed bottom-6 text-[#F4EBD0]/50 font-ancient tracking-widest pointer-events-none">
        按住并左右拖拽画卷以探索华夏五千年
      </div>
    </div>
  );
};

export default ScrollHome;
