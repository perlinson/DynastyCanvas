
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { KeyFigure } from '../types';

interface FigureDetailProps {
  figure: KeyFigure | null;
  onClose: () => void;
}

const FigureDetail: React.FC<FigureDetailProps> = ({ figure, onClose }) => {
  return (
    <AnimatePresence>
      {figure && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 50 }}
            className="relative bg-[#F4EBD0] w-full max-w-2xl max-h-[80vh] overflow-hidden border-4 border-[#8B4513] shadow-2xl flex flex-col paper-bg"
          >
            {/* Scroll-like decorative elements */}
            <div className="absolute top-0 left-0 w-8 h-full bg-[#5D4037]/10 border-r border-[#8B4513]/20"></div>
            <div className="absolute top-0 right-0 w-8 h-full bg-[#5D4037]/10 border-l border-[#8B4513]/20"></div>
            
            {/* Close Button */}
            <button 
              onClick={onClose}
              className="absolute top-4 right-12 z-10 w-10 h-10 border-2 border-[#8B4513] text-[#8B4513] flex items-center justify-center font-calligraphy text-2xl hover:bg-[#8B4513] hover:text-[#F4EBD0] transition-colors"
            >
              ✕
            </button>

            <div className="flex-1 overflow-y-auto p-12 md:px-20 relative">
              <div className="flex flex-col md:flex-row gap-8">
                {/* Side Title (Vertical Calligraphy) */}
                <div className="flex-shrink-0 flex items-start">
                  <div className="border-2 border-[#B22222] p-2 bg-[#B22222]/5">
                    <h2 className="font-calligraphy text-5xl md:text-7xl text-[#B22222] [writing-mode:vertical-rl] tracking-widest leading-none py-4">
                      {figure.name}
                    </h2>
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1">
                  <div className="mb-6">
                    <span className="font-ancient text-[#8B4513] text-xl block border-b-2 border-[#8B4513]/30 pb-2 mb-2">
                      {figure.title}
                    </span>
                    <p className="font-ancient text-lg text-[#1A1A1A]/80 italic">
                      「{figure.description}」
                    </p>
                  </div>
                  
                  <div className="relative">
                    {/* Ancient Text Layout Style */}
                    <div className="font-ancient text-xl leading-relaxed text-[#1A1A1A] space-y-4 text-justify">
                      {figure.biography.split('\n').map((para, idx) => (
                        <p key={idx} className="indent-8">{para}</p>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom decoration */}
            <div className="h-6 bg-[#8B4513]/10 border-t border-[#8B4513]/20 flex items-center justify-center">
              <div className="w-1/3 h-px bg-[#8B4513]/30"></div>
              <div className="mx-4 text-[10px] text-[#8B4513]/50 tracking-[1em] font-ancient">千古风流</div>
              <div className="w-1/3 h-px bg-[#8B4513]/30"></div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default FigureDetail;
