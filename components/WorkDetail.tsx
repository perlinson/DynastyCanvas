
import React from 'react';
import { motion as motionBase, AnimatePresence } from 'framer-motion';
const motion = motionBase as any;
import { WorkItem } from '../types';

interface WorkDetailProps {
  work: WorkItem | null;
  isLoggedIn: boolean;
  onClose: () => void;
  onEdit: (work: WorkItem) => void;
}

const WorkDetail: React.FC<WorkDetailProps> = ({ work, isLoggedIn, onClose, onEdit }) => {
  return (
    <AnimatePresence>
      {work && (
        <div className="fixed inset-0 z-[150] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />
          <motion.div
            initial={{ scale: 0.9, opacity: 0, rotateY: -20 }}
            animate={{ scale: 1, opacity: 1, rotateY: 0 }}
            exit={{ scale: 0.9, opacity: 0, rotateY: 20 }}
            className="relative bg-[#FDFBF7] paper-bg w-full max-w-2xl h-[70vh] rounded shadow-2xl overflow-hidden flex flex-col border-[1px] border-[#8B4513]/30"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-[#8B4513]"></div>
            
            <div className="p-8 flex-1 overflow-y-auto no-scrollbar relative">
               <div className="flex justify-between items-start mb-8">
                  <h3 className="font-calligraphy text-4xl text-[#3E2723]">{work.title}</h3>
                  <div className="flex items-center gap-4">
                     {isLoggedIn && (
                        <button 
                          onClick={() => onEdit(work)}
                          className="w-10 h-10 rounded-full bg-[#B22222] text-[#F4EBD0] flex items-center justify-center font-calligraphy text-lg shadow-lg hover:scale-110 transition-transform"
                          title="修订此事物"
                        >修</button>
                     )}
                     <button onClick={onClose} className="text-[#8B4513] text-xl">✕</button>
                  </div>
               </div>

               {work.imageUrl && (
                 <div className="mb-8 border-4 border-[#8B4513]/10 p-2 shadow-inner">
                    <img src={work.imageUrl} alt={work.title} className="w-full h-64 object-contain grayscale-[0.1]" />
                 </div>
               )}

               <div className="font-ancient text-lg text-[#3E2723] leading-loose space-y-6">
                  {work.fullDetail || work.content}
               </div>
            </div>

            <div className="p-4 bg-[#F4EBD0] text-center font-ancient text-[10px] text-[#8B4513]/60 tracking-widest border-t border-[#8B4513]/10">
              大内秘藏 · 万世传抄
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default WorkDetail;
