
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Dynasty } from './types';
import ScrollHome from './components/ScrollHome';
import DynastyDetail from './components/DynastyDetail';

const App: React.FC = () => {
  const [selectedDynasty, setSelectedDynasty] = useState<Dynasty | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Initial loading animation
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="h-screen w-full bg-[#1A1A1A] flex flex-col items-center justify-center text-[#F4EBD0]">
        <motion.div 
          animate={{ rotateY: [0, 180, 360] }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="w-24 h-24 border-4 border-[#B22222] flex items-center justify-center font-calligraphy text-4xl mb-8"
        >
          史
        </motion.div>
        <div className="font-calligraphy text-3xl tracking-widest animate-pulse">正在展开华夏画卷...</div>
      </div>
    );
  }

  return (
    <div className="h-screen w-full bg-[#1A1A1A]">
      <AnimatePresence mode="wait">
        {!selectedDynasty ? (
          <motion.div
            key="home"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
            transition={{ duration: 0.8 }}
          >
            <ScrollHome onSelectDynasty={setSelectedDynasty} />
          </motion.div>
        ) : (
          <motion.div
            key="detail"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ type: "spring", damping: 25, stiffness: 120 }}
          >
            <DynastyDetail 
              dynasty={selectedDynasty} 
              onBack={() => setSelectedDynasty(null)} 
            />
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Background Ambience Toggle Placeholder */}
      <div className="fixed bottom-4 left-4 z-50">
         <button className="w-10 h-10 rounded-full border border-[#8B4513]/50 flex items-center justify-center text-[#8B4513]/50 hover:text-[#B22222] hover:border-[#B22222] transition-colors">
            <span className="text-xs font-calligraphy">乐</span>
         </button>
      </div>
    </div>
  );
};

export default App;
