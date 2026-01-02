
import React from 'react';
import { motion } from 'framer-motion';
import { Dynasty } from '../types';

interface MapViewerProps {
  dynasty: Dynasty;
  onClose: () => void;
}

const MapViewer: React.FC<MapViewerProps> = ({ dynasty, onClose }) => {
  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative w-full max-w-5xl aspect-video bg-[#F4EBD0] paper-bg border-4 border-[#D4AF37] overflow-hidden flex flex-col"
      >
        <button onClick={onClose} className="absolute top-4 right-4 z-10 text-[#8B4513] font-calligraphy text-4xl hover:scale-110 transition-transform">✕</button>
        
        <div className="p-6 border-b border-[#D4AF37]/50 flex justify-between items-center">
          <h2 className="font-calligraphy text-4xl text-[#B22222]">{dynasty.name} 舆地疆域图</h2>
          <div className="font-ancient text-[#8B4513]">{dynasty.timeRange}</div>
        </div>

        <div className="flex-1 relative overflow-hidden flex items-center justify-center p-8">
          <img 
            src={dynasty.mapUrl} 
            alt="Historical Map" 
            className="max-w-full max-h-full object-contain border-2 border-[#8B4513]/30 shadow-2xl sepia opacity-80"
          />
          <div className="absolute inset-0 pointer-events-none border-[40px] border-transparent ink-edge"></div>
          
          <div className="absolute bottom-8 right-8 w-32 h-32 opacity-20 rotate-12">
            <div className="font-calligraphy text-4xl text-[#B22222] border-4 border-[#B22222] p-4 rounded-full flex items-center justify-center">
              御览
            </div>
          </div>
        </div>

        <div className="p-4 bg-[#B22222] text-[#F4EBD0] font-ancient text-sm text-center">
          地图仅供示意，历史真实疆域随时间动态变化。
        </div>
      </motion.div>
    </div>
  );
};

export default MapViewer;
