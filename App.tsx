
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Dynasty } from './types';
import { DYNASTIES } from './data/history';
import ScrollHome from './components/ScrollHome';
import DynastyDetail from './components/DynastyDetail';
import ComparisonMode from './components/ComparisonMode';

const App: React.FC = () => {
  const [selectedDynasty, setSelectedDynasty] = useState<Dynasty | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [compareD1, setCompareD1] = useState<Dynasty | null>(null);
  const [compareD2, setCompareD2] = useState<Dynasty | null>(null);
  const [showComparisonSelector, setShowComparisonSelector] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);

  const startComparison = (d1: Dynasty) => {
    setCompareD1(d1);
    setShowComparisonSelector(true);
  };

  if (isLoading) {
    return (
      <div className="h-screen w-full bg-[#1A1A1A] flex flex-col items-center justify-center text-[#F4EBD0]">
        <motion.div animate={{ rotateY: [0, 180, 360] }} transition={{ duration: 2, repeat: Infinity }} className="w-24 h-24 border-4 border-[#B22222] flex items-center justify-center font-calligraphy text-4xl mb-8">史</motion.div>
        <div className="font-calligraphy text-3xl tracking-widest animate-pulse">正在展开华夏画卷...</div>
      </div>
    );
  }

  return (
    <div className="h-screen w-full bg-[#1A1A1A] transition-colors">
      <AnimatePresence mode="wait">
        {!selectedDynasty ? (
          <motion.div key="home" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <ScrollHome onSelectDynasty={setSelectedDynasty} />
          </motion.div>
        ) : (
          <motion.div key="detail" initial={{ opacity: 0, x: 100 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -100 }}>
            <DynastyDetail 
              dynasty={selectedDynasty} 
              onBack={() => setSelectedDynasty(null)} 
              onCompare={() => startComparison(selectedDynasty)}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showComparisonSelector && (
          <div className="fixed inset-0 z-[150] bg-black/80 flex items-center justify-center p-4">
            <div className="bg-[#F4EBD0] paper-bg p-8 max-w-2xl w-full border-4 border-[#8B4513]">
              <h2 className="font-calligraphy text-4xl text-[#B22222] mb-8 text-center">请选择对比朝代</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
                {DYNASTIES.filter(d => d.id !== compareD1?.id).map(d => (
                  <button 
                    key={d.id} 
                    onClick={() => { setCompareD2(d); setShowComparisonSelector(false); }}
                    className="p-4 border-2 border-[#8B4513] font-calligraphy text-2xl hover:bg-[#B22222] hover:text-white transition-colors"
                  >
                    {d.name}
                  </button>
                ))}
              </div>
              <button onClick={() => setShowComparisonSelector(false)} className="w-full py-2 bg-[#8B4513] text-white font-ancient">取消</button>
            </div>
          </div>
        )}

        {compareD1 && compareD2 && (
          <ComparisonMode d1={compareD1} d2={compareD2} onClose={() => { setCompareD1(null); setCompareD2(null); }} />
        )}
      </AnimatePresence>
      
      {/* Global Controls */}
      <div className="fixed bottom-4 left-4 z-[200] flex gap-2">
         <button onClick={toggleDarkMode} className="w-10 h-10 rounded-full border border-[#8B4513]/50 flex items-center justify-center text-[#8B4513] hover:text-[#B22222] hover:border-[#B22222] transition-colors bg-white/10 backdrop-blur-sm">
            <span className="text-xs font-calligraphy">{isDarkMode ? '昼' : '夜'}</span>
         </button>
         <button className="w-10 h-10 rounded-full border border-[#8B4513]/50 flex items-center justify-center text-[#8B4513] hover:text-[#B22222] transition-colors bg-white/10 backdrop-blur-sm">
            <span className="text-xs font-calligraphy">乐</span>
         </button>
      </div>
    </div>
  );
};

export default App;
