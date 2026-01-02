
import React from 'react';
import { motion } from 'framer-motion';
import { Dynasty } from '../types';

interface ShareCardProps {
  dynasty: Dynasty;
  onClose: () => void;
}

const ShareCard: React.FC<ShareCardProps> = ({ dynasty, onClose }) => {
  return (
    <div className="fixed inset-0 z-[130] flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
      <motion.div 
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="relative w-80 bg-[#F4EBD0] border-4 border-[#8B4513] shadow-[20px_20px_0px_#B22222] p-8 paper-bg flex flex-col items-center"
      >
        <button onClick={onClose} className="absolute -top-4 -right-4 w-8 h-8 bg-white border-2 border-[#8B4513] rounded-full">✕</button>
        
        <div className="w-16 h-16 bg-[#B22222] text-[#F4EBD0] border-2 border-[#8B4513] mb-4 flex items-center justify-center">
          <span className="font-calligraphy text-2xl">{dynasty.sealText}</span>
        </div>

        <h3 className="font-calligraphy text-5xl text-[#B22222] mb-2">{dynasty.name}</h3>
        <p className="font-ancient text-[#8B4513] mb-8 text-center">{dynasty.timeRange}</p>

        <div className="w-full space-y-4 border-y border-[#8B4513]/30 py-6 mb-8">
           <div className="flex flex-col items-center gap-2">
             <span className="font-calligraphy text-lg text-[#3E2723]">一言以蔽之</span>
             <p className="font-ancient text-center italic">「{dynasty.characteristics[0]}」</p>
           </div>
           <div className="flex flex-col items-center gap-2">
             <span className="font-calligraphy text-lg text-[#3E2723]">开国之君</span>
             <p className="font-ancient">{dynasty.founder}</p>
           </div>
        </div>

        <div className="flex flex-col items-center">
          <div className="text-[10px] text-[#8B4513]/50 font-ancient tracking-[0.5em] mb-4">中华历代画卷 • 存念</div>
          <button className="px-4 py-2 bg-[#B22222] text-[#F4EBD0] font-calligraphy text-xl hover:bg-[#8B4513] transition-colors">
            长按保存
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default ShareCard;
