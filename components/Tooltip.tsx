
import React from 'react';
// Fix framer-motion type errors by casting the motion component to any
import { motion as motionBase, AnimatePresence } from 'framer-motion';
const motion = motionBase as any;

export type TooltipType = 'event' | 'figure' | 'achievement' | 'location' | 'founder' | 'scientific' | 'medical' | 'astronomical' | 'geographical';

interface TooltipProps {
  isVisible: boolean;
  title: string;
  content: string;
  type?: TooltipType;
  imageUrl?: string;
  x: number;
  y: number;
}

const IconMap: Record<string, React.ReactNode> = {
  event: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-12 h-12 opacity-30 text-[#8B4513]">
      <path d="M19,15L13,21L11.5,19.5L16,15H2V13H16L11.5,8.5L13,7L19,13V15M22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2A10,10 0 0,1 22,12M20,12A8,8 0 0,0 12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20A8,8 0 0,0 20,12Z" />
    </svg>
  ),
  figure: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-12 h-12 opacity-30 text-[#8B4513]">
      <path d="M12,4A4,4 0 0,1 16,8A4,4 0 0,1 12,12A4,4 0 0,1 8,8A4,4 0 0,1 12,4M12,14C16.42,14 20,15.79 20,18V20H4V18C4,15.79 7.58,14 12,14M12,5.5A2.5,2.5 0 0,0 9.5,8A2.5,2.5 0 0,0 12,10.5A2.5,2.5 0 0,0 14.5,8A2.5,2.5 0 0,0 12,5.5Z" />
    </svg>
  ),
  achievement: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-12 h-12 opacity-30 text-[#8B4513]">
      <path d="M14,10H19.5L14,4.5V10M5,3H15L21,9V19A2,2 0 0,1 19,21H5C3.89,21 3,20.1 3,19V5C3,3.89 3.89,3 5,3M5,5V19H19V12H12V5H5M7,14H17V15.5H7V14M7,17H14V18.5H7V17Z" />
    </svg>
  ),
  scientific: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-12 h-12 opacity-30 text-[#4682B4]">
      <path d="M12,15A3,3 0 0,1 9,12A3,3 0 0,1 12,9A3,3 0 0,1 15,12A3,3 0 0,1 12,15M12,2L4.5,20.29L5.21,21L12,18L18.79,21L19.5,20.29L12,2Z" />
    </svg>
  ),
  medical: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-12 h-12 opacity-30 text-[#20B2AA]">
      <path d="M12.19,2L14,3.81L7.81,10L6,8.19L12.19,2M19.5,12.5C19.5,15.81 16.81,18.5 13.5,18.5C10.19,18.5 7.5,15.81 7.5,12.5C7.5,9.19 10.19,6.5 13.5,6.5C16.81,6.5 19.5,9.19 19.5,12.5M13.5,8.5C11.29,8.5 9.5,10.29 9.5,12.5C9.5,14.71 11.29,16.5 13.5,16.5C15.71,16.5 17.5,14.71 17.5,12.5C17.5,10.29 15.71,8.5 13.5,8.5Z" />
    </svg>
  ),
  astronomical: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-12 h-12 opacity-30 text-[#483D8B]">
      <path d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4M12,6A6,6 0 0,0 6,12A6,6 0 0,0 12,18A6,6 0 0,0 18,12A6,6 0 0,0 12,6M12,8A4,4 0 0,1 16,12A4,4 0 0,1 12,16A4,4 0 0,1 8,12A4,4 0 0,1 12,8Z" />
    </svg>
  ),
  geographical: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-12 h-12 opacity-30 text-[#556B2F]">
      <path d="M15,13L11,17L7,13L8.41,11.59L10,13.17V9H12V13.17L13.59,11.59L15,13M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20Z" />
    </svg>
  )
};

const Tooltip: React.FC<TooltipProps> = ({ isVisible, title, content, type, imageUrl, x, y }) => {
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
          <div className="relative bg-[#F4EBD0] dark:bg-[#2a2a2a] border-2 border-[#8B4513] p-5 shadow-[0_10px_30px_rgba(0,0,0,0.3)] w-80 ink-edge overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-black/5 rounded-full blur-2xl -z-10"></div>
            <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-[#8B4513]/40"></div>
            <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-[#8B4513]/40"></div>
            <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-[#8B4513]/40"></div>
            <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-[#8B4513]/40"></div>
            
            <div className="flex justify-between items-start mb-3 border-b border-[#8B4513]/20 pb-2">
              <h3 className="font-calligraphy text-2xl text-[#B22222] dark:text-[#ff4d4d] tracking-wide">
                {title}
              </h3>
              {type && IconMap[type] && (
                <div className="absolute right-2 top-2 opacity-40">
                  {IconMap[type]}
                </div>
              )}
            </div>

            {imageUrl && (
              <div className="mb-4 relative border border-[#8B4513]/30 p-1 shadow-inner bg-[#fff]/50 dark:bg-black/20">
                <img 
                  src={imageUrl} 
                  alt={title} 
                  className="w-full h-40 object-cover opacity-90 grayscale-[0.3] sepia-[0.2]"
                />
                <div className="absolute inset-0 pointer-events-none border-[10px] border-transparent ink-edge"></div>
              </div>
            )}
            
            <p className="text-[#1A1A1A] dark:text-[#F4EBD0] text-sm leading-relaxed font-ancient relative z-10">
              {content}
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Tooltip;
