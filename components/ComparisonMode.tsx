
import React from 'react';
import { motion } from 'framer-motion';
import { Dynasty } from '../types';

interface ComparisonModeProps {
  d1: Dynasty;
  d2: Dynasty;
  onClose: () => void;
}

const ComparisonMode: React.FC<ComparisonModeProps> = ({ d1, d2, onClose }) => {
  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative bg-[#F4EBD0] paper-bg w-full max-w-6xl h-[90vh] border-8 border-[#3E2723] flex flex-col overflow-hidden"
      >
        <button onClick={onClose} className="absolute top-4 right-4 z-20 w-12 h-12 border-2 border-[#8B4513] text-[#8B4513] font-calligraphy text-2xl hover:bg-[#8B4513] hover:text-white">✕</button>
        
        <div className="flex-1 flex divide-x-2 divide-[#8B4513]/30 overflow-hidden">
          {[d1, d2].map((d, idx) => (
            <div key={d.id} className="flex-1 overflow-y-auto p-8 flex flex-col items-center">
              <div className="w-24 h-24 bg-[#B22222] text-[#F4EBD0] border-4 border-[#8B4513] shadow-lg flex items-center justify-center mb-6">
                <span className="font-calligraphy text-4xl">{d.sealText}</span>
              </div>
              <h2 className="font-calligraphy text-6xl text-[#B22222] mb-2">{d.name}</h2>
              <div className="font-ancient text-xl text-[#8B4513] mb-8">{d.timeRange}</div>
              
              <div className="w-full space-y-6">
                <div className="border-b border-[#8B4513]/20 pb-4">
                  <div className="font-calligraphy text-2xl text-[#3E2723] mb-2">国祚时长</div>
                  <div className="flex items-center gap-4">
                    <div className="flex-1 h-4 bg-black/10 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${(d.duration / 500) * 100}%` }}
                        className="h-full bg-[#B22222]"
                      />
                    </div>
                    <span className="font-ancient w-16 text-right">{d.duration}年</span>
                  </div>
                </div>

                <div>
                  <div className="font-calligraphy text-2xl text-[#3E2723] mb-2">开国 & 都城</div>
                  <div className="font-ancient text-lg text-[#1A1A1A]">
                    <p>始于：{d.founder}</p>
                    <p>都城：{d.capital}</p>
                  </div>
                </div>

                <div>
                  <div className="font-calligraphy text-2xl text-[#3E2723] mb-2">核心成就</div>
                  <ul className="space-y-1">
                    {d.achievements.map(a => (
                      <li key={a.title} className="font-ancient text-lg">• {a.title}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-[#3E2723] p-4 text-[#F4EBD0] text-center font-calligraphy text-2xl tracking-[1em]">
          鉴古知今 • 历史长河
        </div>
      </motion.div>
    </div>
  );
};

export default ComparisonMode;
