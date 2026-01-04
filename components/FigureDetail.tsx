
import React, { useState } from 'react';
import { motion as motionBase, AnimatePresence } from 'framer-motion';
const motion = motionBase as any;
import { KeyFigure, WorkItem } from '../types';
import WorkDetail from './WorkDetail';

interface FigureDetailProps {
  figure: KeyFigure | null;
  isLoggedIn: boolean;
  onClose: () => void;
  onEdit: (figure: KeyFigure) => void;
  onEditWork: (work: WorkItem, figure: KeyFigure) => void;
}

const FigureDetail: React.FC<FigureDetailProps> = ({ figure, isLoggedIn, onClose, onEdit, onEditWork }) => {
  const [activeWork, setActiveWork] = useState<WorkItem | null>(null);

  return (
    <AnimatePresence>
      {figure && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-[#1F2A3C]/70 backdrop-blur-md"
          />
          <WorkDetail 
            work={activeWork} 
            isLoggedIn={isLoggedIn}
            onClose={() => setActiveWork(null)} 
            onEdit={(work) => onEditWork(work, figure)}
          />
          
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            className="relative bg-[#F4EBD0] paper-bg w-full max-w-4xl max-h-[90vh] overflow-hidden rounded-sm shadow-2xl flex flex-col border-[12px] border-[#3E2723]"
          >
            {/* Header */}
            <div className="h-16 px-8 border-b border-[#8B4513]/20 flex items-center justify-between shrink-0 bg-black/5">
              <h2 className="font-calligraphy text-2xl text-[#3E2723]">风云志 • 人物详记</h2>
              <div className="flex items-center gap-4">
                {isLoggedIn && (
                  <button 
                    onClick={() => onEdit(figure)}
                    className="px-4 py-1 bg-[#B22222] text-[#F4EBD0] font-calligraphy text-lg rounded hover:bg-[#8B4513] transition-colors shadow-sm"
                  >修订生平</button>
                )}
                <button onClick={onClose} className="text-[#3E2723] text-2xl hover:scale-110 transition-transform">✕</button>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-10 no-scrollbar">
              <div className="flex flex-col md:flex-row gap-12">
                {/* Portrait Section */}
                <div className="w-full md:w-64 flex-shrink-0">
                  <div className="relative border-4 border-[#8B4513] p-1 bg-white shadow-xl">
                    {figure.portraitUrl ? (
                      <img src={figure.portraitUrl} alt={figure.name} className="w-full aspect-[2/3] object-cover grayscale-[0.2] sepia-[0.1]" />
                    ) : (
                      <div className="w-full aspect-[2/3] bg-[#EFE4C5] flex items-center justify-center text-[#8B4513]/30 font-calligraphy text-4xl">无像</div>
                    )}
                    <div className="absolute top-4 right-4 [writing-mode:vertical-rl] font-calligraphy text-3xl text-[#B22222] bg-white/80 p-2 border border-[#B22222]/20">
                      {figure.name}
                    </div>
                  </div>
                  <div className="mt-4 p-4 border border-[#8B4513]/20 bg-black/5 rounded italic text-sm text-[#8B4513] font-ancient text-center">
                    「{figure.description}」
                  </div>
                </div>

                {/* Biography Section */}
                <div className="flex-1 space-y-10">
                  <div>
                    <h3 className="font-calligraphy text-3xl text-[#B22222] mb-4 border-b-2 border-[#B22222]/20 pb-2">传略</h3>
                    <div className="font-ancient text-lg leading-relaxed text-[#1A1A1A] space-y-6 text-justify indent-8">
                      {figure.biography.split('\n').filter(p => p.trim()).map((p, i) => (
                        <p key={i}>{p}</p>
                      ))}
                    </div>
                  </div>

                  {figure.works && figure.works.length > 0 && (
                    <div className="bg-black/5 p-6 rounded-lg border border-[#8B4513]/10">
                      <h3 className="font-calligraphy text-2xl text-[#3E2723] mb-6 flex items-center gap-2">
                        <span className="w-6 h-[2px] bg-[#3E2723]"></span>
                        关联著述/奇珍 (点击详阅)
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {figure.works.map((work, idx) => (
                          <div 
                            key={idx} 
                            onClick={() => setActiveWork(work)}
                            className="p-4 border border-[#8B4513]/20 bg-[#FDFBF7] hover:border-[#B22222] hover:shadow-md cursor-pointer transition-all group"
                          >
                            <h4 className="font-bold text-[#1A1A1A] mb-1 group-hover:text-[#B22222]">{work.title}</h4>
                            <p className="text-xs text-[#6B778C] line-clamp-2">{work.content}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="h-10 bg-[#3E2723] text-[#F4EBD0] flex items-center justify-center font-ancient text-[10px] tracking-[0.5em] shrink-0">
               往圣继绝学 • 万世开太平
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default FigureDetail;
