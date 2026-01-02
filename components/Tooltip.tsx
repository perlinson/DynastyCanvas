
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export type TooltipType = 'event' | 'figure' | 'achievement' | 'location' | 'founder';

interface TooltipProps {
  isVisible: boolean;
  title: string;
  content: string;
  type?: TooltipType;
  x: number;
  y: number;
}

const IconMap: Record<TooltipType, React.ReactNode> = {
  event: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 opacity-40">
      <path d="M19.5,4.5L15.5,8.5L16.5,9.5L20.5,5.5L19.5,4.5M4.5,19.5L8.5,15.5L9.5,16.5L5.5,20.5L4.5,19.5M16.5,5.5L13.5,8.5L14.5,9.5L17.5,6.5L16.5,5.5M7.5,14.5L4.5,17.5L5.5,18.5L8.5,15.5L7.5,14.5M12,2L22,12L12,22L2,12L12,2M12,4.83L4.83,12L12,19.17L19.17,12L12,4.83Z" />
    </svg>
  ),
  figure: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 opacity-40">
      <path d="M12,4A4,4 0 0,1 16,8A4,4 0 0,1 12,12A4,4 0 0,1 8,8A4,4 0 0,1 12,4M12,14C16.42,14 20,15.79 20,18V20H4V18C4,15.79 7.58,14 12,14Z" />
    </svg>
  ),
  achievement: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 opacity-40">
      <path d="M14,10H19.5L14,4.5V10M5,3H15L21,9V19A2,2 0 0,1 19,21H5C3.89,21 3,20.1 3,19V5C3,3.89 3.89,3 5,3M5,5V19H19V12H12V5H5M7,14H17V15.5H7V14M7,17H14V18.5H7V17Z" />
    </svg>
  ),
  location: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 opacity-40">
      <path d="M12,3L2,12H5V20H19V12H22L12,3M12,7.7C14.1,7.7 15.8,9.4 15.8,11.5C15.8,14.5 12,19 12,19C12,19 8.2,14.5 8.2,11.5C8.2,9.4 9.9,7.7 12,7.7M12,10A1.5,1.5 0 0,0 10.5,11.5A1.5,1.5 0 0,0 12,13A1.5,1.5 0 0,0 13.5,11.5A1.5,1.5 0 0,0 12,10Z" />
    </svg>
  ),
  founder: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 opacity-40">
      <path d="M5,16L3,5L8.5,10L12,4L15.5,10L21,5L19,16H5M19,19A1,1 0 0,1 18,20H6A1,1 0 0,1 5,19V18H19V19Z" />
    </svg>
  )
};

const Tooltip: React.FC<TooltipProps> = ({ isVisible, title, content, type, x, y }) => {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 10 }}
          className="fixed z-50 pointer-events-none"
          style={{ left: x, top: y }}
        >
          <div className="relative bg-[#F4EBD0] border-2 border-[#8B4513] p-4 shadow-2xl w-64 ink-edge">
            {/* Decorative border patterns */}
            <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-[#8B4513]"></div>
            <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-[#8B4513]"></div>
            <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-[#8B4513]"></div>
            <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-[#8B4513]"></div>
            
            <div className="flex justify-between items-start mb-2 border-b border-[#8B4513]/30 pb-1">
              <h3 className="font-calligraphy text-2xl text-[#B22222]">
                {title}
              </h3>
              {type && (
                <div className="text-[#8B4513] -mt-1 -mr-1">
                  {IconMap[type]}
                </div>
              )}
            </div>
            <p className="text-[#1A1A1A] text-sm leading-relaxed font-ancient">
              {content}
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Tooltip;
